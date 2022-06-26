import "./ViewEvent.scss";
import { TbPlant2 } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import CommentCard from './CommentCard'
import { FaDonate } from "react-icons/fa";
import {
  BiCalendarAlt,
  BiTime,
  BiMapPin,
  BiRupee,
  BiMessage,
} from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { eventTypes } from "../../constants";
import BigButton from "../../components/BigButton/BigButton";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../contexts/AuthContext";

const server_url = process.env.REACT_APP_server_url;
const ViewEvent = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { id } = useParams();
  const eventType = eventTypes["tree_planting"];
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [event, setEvent] = useState([]);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    try {
      const res = await axios.get(`${server_url}/api/events/view/${id}`);
      setEvent(res.data)
    } catch (e) {
      console.log(e);
    }
  };

  const donate = async () => {
    if (!auth?.authenticated) {
      navigate("/login");
    }
    if (amount.trim() === "" || message.trim() === "") return;
    try {
      localStorage.setItem("donationToken", {
        userEmail: auth?.state?.user?.email,
        eventsEventId: id,
        monetary: amount,
      });
      const res = await axios.post(`${server_url}/api/payment`, {
        items: [{ id: 1, quantity: 1 }],
        amount: amount,
      });
      window.location = res.data.url;
    } catch (e) {
      console.log(e);
    }
  };

  const setComments = (comments) => {
    const data = {}
    Object.assign(data, event)
    data.comments = comments
    setEvent(event)
  }

  return (
    <div className="container page">
      <div className="event-cols">
        <div className="left">
          <img
            src={event.image ? event.image : "https://via.placeholder.com/512"}
          />
          <Link to={"/profile"} className="posted-by">
            <img src="https://via.placeholder.com/512" />
            <div>
              {event?.organizer?.firstName} {event?.organizer?.lastName}
              <div className="flex">
                <span>
                  <TbPlant2></TbPlant2>
                  <span>{event?.organizer?.workPts}</span>
                </span>
                <span>
                  <FaDonate />
                  <span>{event?.organizer?.resourcePts}</span>
                </span>
              </div>
            </div>
          </Link>

          <div className="event-info">
            <span>
              <i>
                <BiCalendarAlt></BiCalendarAlt>
              </i>
              <span>{moment(event?.time).format("Do MMMM YYYY")}</span>
            </span>

            <span>
              <i>
                <BiTime></BiTime>
              </i>
              <span>{moment(event?.time).format("LT")}</span>
            </span>

            <span>
              <i>
                <BiMapPin></BiMapPin>
              </i>
              <span>{event?.address}</span>
            </span>
          </div>

          <div style={{ marginTop: "16px" }}>
            <BigButton>Join Event</BigButton>
          </div>
        </div>

        <div className="right">
          <div className="event-type" style={{ color: eventType.color }}>
            <eventType.icon />
            <span>{eventType.title}</span>
          </div>

          <h1>{event?.title}</h1>

          <div className="event-content">{event?.description}</div>

          <div className="contribute">
            <h2>Can't attend but want to help?</h2>
            <p>
              You can contribute by donating to the cause. <br />
              All proceeds will be used to fund this event.
              <br />
              <br />
              You can also contact the event creator directly in case you want
              to provide supplies or other non monetary contributions.
            </p>
          </div>
          <div className="donate-form">
            <div className="input">
              <span>
                <BiRupee></BiRupee>
              </span>
              <input
                name="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
            </div>

            <div className="input">
              <span>
                <BiMessage></BiMessage>
              </span>
              <input
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Message"
              />
            </div>

            <div onClick={donate} style={{ width: "fit-content" }}>
              <BigButton>Donate Now</BigButton>
            </div>
          </div>
        </div>
      </div>

      <div className='post-comment-sec'>
        <h2>Comments</h2>

        {
          event?.comments != null ?
            <WriteCommentBox setComments={setComments} eventId={id} />
          : null
        }

        {
          event?.comments?.map((item) => {
            return <CommentCard comment={item}></CommentCard>
          })
        }
      </div>
    </div>
  );
};


const WriteCommentBox = ({setComments, eventId}) => {
  const auth = useAuth()
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  const onSubmit = async () => {
    if (text.trim() === '' || sending) return

    setSending(true)

    const res = await axios.post(
      `${server_url}/api/events/comments`,
      {
        "comment": text,
        "eventsEventId": Number(eventId)
      },
      {
        headers: {
          'Authorization': auth.state.token
        }
      }
    )

    setComments(res.data);
    setSending(false)
  }

  if (!auth.state.authenticated) return

  return (
    <div className='wcom'>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder='Want to discuss something?'
        />

      <div style={{'width': 'fit-content', 'marginLeft': 'auto'}}>
        <BigButton onClick={onSubmit}>Submit</BigButton>
      </div>
    </div>
  )
}

export default ViewEvent;
