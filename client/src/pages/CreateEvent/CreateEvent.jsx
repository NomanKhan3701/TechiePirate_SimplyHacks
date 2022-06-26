import React, { useEffect, useState } from "react";
import {
  BigButton,
  Button,
  FileUpload,
  Map,
  MarkdownEditor,
} from "../../components/import";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FcHome } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
import { FaCity } from "react-icons/fa";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import TextField from "@mui/material/TextField";
import "./CreateEvent.scss";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingBtn from "../../components/LoadingBtn/LoadingBtn";

const server_url = process.env.REACT_APP_server_url;
const CreateEvent = () => {
  const [files, setFiles] = useState([]);
  const [prevImg, setPrevImg] = useState();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [calendarToggle, setCalendarToggle] = useState(false);
  const [timeToggle, setTimeToggle] = useState(false);
  const [time, setTime] = useState(new Date());
  const [markdownVal, setMarkdownVal] = useState("");
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState("none");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    }
  }, []);

  function positionSuccess(pos) {
    const crd = pos.coords;
    const longi = crd.longitude,
      lati = crd.latitude;
    const accuracy = crd.accuracy;
    setLongitude(longi);
    setLatitude(lati);
  }

  function positionError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const createEvent = async () => {
    try {
      const varToken = localStorage.getItem("auth_token");
      setLoading("true");

      const res = await axios.post(
        `${server_url}/api/events`,
        {
          image: prevImg,
          title: title,
          time: selectedDay,
          city: city,
          address: address,
          description: markdownVal,
          eventTags: type.split(","),
        },
        {
          headers: {
            Authorization: varToken,
          },
        }
      );
      setLoading("false");
      toast.success("Event created successfully", { position: "top-center" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="create-event container page">
      <h1>New Event</h1>
      <div className="main-form">
        <div className="title">
          <h3>Title</h3>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name=""
            id=""
            placeholder="Title here..."
          />
        </div>
        <div className="desc">
          <h3>Description</h3>
          <MarkdownEditor setMarkdownVal={setMarkdownVal} />
        </div>
        <div className="searchbar-sec">
          <div>Type</div>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>All</option>
            <option>Tree Planting</option>
            <option>Beach Cleaning</option>
            <option>Misc</option>
          </select>
        </div>
        <div className="title-util">
          <h3 className="top-h3">Banner</h3>
          <div className="upload-img">
            <FileUpload setPrevImg={setPrevImg} setFiles={setFiles} />
          </div>
        </div>

        <div className="date-time">
          <div className={`calendar ${calendarToggle ? "open" : ""}`}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="Week picker"
                value={selectedDay}
                onChange={(date) => {
                  setSelectedDay(date);
                }}
                // renderDay={renderWeekPickerDay}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="DD/MM/YY"
              />
            </LocalizationProvider>
          </div>

          <div className="title-util">
            <h3>Date</h3>
            <div
              className="date"
              onClick={() => setCalendarToggle((toggle) => !toggle)}
            >
              <div className="date-info">
                {moment(selectedDay).format("DD/MM/YY")}
              </div>
              <div className="icon">
                <BsFillCalendarDateFill />
              </div>
            </div>
          </div>

          <div className={`time-picker ${timeToggle ? "open" : ""}`}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticTimePicker
                displayStaticWrapperAs="mobile"
                value={time}
                onChange={(time) => setTime(time)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="title-util">
            <h3>Time</h3>
            <div
              className="time"
              onClick={() => setTimeToggle((toggle) => !toggle)}
            >
              <div className="time-info">
                {time ? moment(time).format("hh:mm a") : "12:00 am"}
              </div>
              <div className="icon">
                <FcClock />
              </div>
            </div>
          </div>
        </div>
        <div className="location-input">
          <span>
            <FaCity />
          </span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Event city"
          />
        </div>
        <div className="location-input">
          <span>
            <FcHome />
          </span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Event address..."
          />
        </div>
        <div className="map">
          {longitude && latitude ? (
            <Map
              longi={longitude}
              lati={latitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          ) : (
            ""
          )}
        </div>
        <div className="btn" onClick={createEvent}>
          <LoadingBtn
            loading={loading}
            completedText="Event Created"
            text="Create Event"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
