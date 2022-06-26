import './ViewPost.scss'
import { TbPlant2 } from 'react-icons/tb'
import { BiCalendarAlt, BiTime, BiMapPin } from 'react-icons/bi'
import { FaDonate } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { testMarkdown } from '../../constants'
import CommentCard from './CommentCard'
import { useState } from 'react'
import { useParams } from "react-router";
import { useEffect } from 'react'
import axios from "axios"
import moment from 'moment'
import FullScreenLoader from '../Signup/FullScreenLoader'
import { BigButton } from '../../components/import'
import { useAuth } from '../../contexts/AuthContext'

const server_url = process.env.REACT_APP_server_url

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost();
    getComments()
  }, [])

  const getPost = async () => {
    setLoading(true)
    const res = await axios.get(`${server_url}/api/posts/getpost/?id=${id}`)
    setPost(res.data);
    setLoading(false)
  }

  const getComments = async () => {
    const res = await axios.get(`${server_url}/api/posts/Comments?postId=${id}`)
    res.data.reverse()
    setComments(res.data);
  }

  if (loading) {
    return <FullScreenLoader></FullScreenLoader>
  }

  return (
    <div className='container page'>
      <div className='post-cols'>
        <div className="left">
          {
            post?.image ?
              <img src={post?.image} />
              : null
          }

          <Link to={'/profile/' + post.author.email} className='posted-by'>
            <img src={post.author.image || 'https://via.placeholder.com/512'} />
            <div>
              {`${post.author.firstName} ${post.author.lastName}`}
              <div>
                <span>
                  <TbPlant2></TbPlant2>
                  <span>{post.author.workPts}</span>
                  <div style={{'width': '16px'}}></div>
                  <FaDonate></FaDonate>
                  <span>{post.author.resourcePts}</span>
                </span>
              </div>
            </div>
          </Link>

          <div className='post-info'>
            <span>
              <i><BiCalendarAlt></BiCalendarAlt></i>
              <span>{moment(post?.createdAt).format('Do MMMM YYYY')}</span>
            </span>

            <span>
              <i><BiTime></BiTime></i>
              <span>{moment(post?.createdAt).format('LT')}</span>
            </span>
          </div>
        </div>

        <div className="right">
          <h1>{post?.title}</h1>
          <div className='post-content'>
            <ReactMarkdown children={post?.content}></ReactMarkdown>
          </div>
        </div>
      </div>

      <div className='post-comment-sec'>
        <h2>Comments</h2>

        {
          comments != null ?
            <WriteCommentBox setComments={setComments} postId={id} />
          : null
        }

        {
          comments?.map((item) => {
            return <CommentCard key={item.commentId} comment={item}></CommentCard>
          })
        }
      </div>
    </div>
  )
}

const WriteCommentBox = ({setComments, postId}) => {
  const auth = useAuth()
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  const onSubmit = async () => {
    if (text.trim() === '' || sending) return

    setSending(true)

    const res = await axios.post(
      `${server_url}/api/posts/Comments`,
      {
        "comment": text,
        "postsPostId": Number(postId)
      },
      {
        headers: {
          'Authorization': auth.state.token
        }
      }
    )
    res.data.reverse()

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

export default ViewPost