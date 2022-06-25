import './ViewPost.scss'
import { TbPlant2 } from 'react-icons/tb'
import { BiCalendarAlt, BiTime, BiMapPin } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { testMarkdown } from '../../constants'
import CommentCard from './CommentCard'
import { useState } from 'react'
import { useParams } from "react-router";
import { useEffect } from 'react'
import axios from "axios"
import moment from 'moment'

const server_url = process.env.REACT_APP_server_url
const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPost();
  }, [])

  const getPost = async () => {
    const res = await axios.get(`${server_url}/api/posts/getpost/?id=${id}`)
    setPost(res.data);
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

          <Link to={'/profile'} className='posted-by'>
            <img src='https://via.placeholder.com/512' />
            <div>
              Aditya Kharote
              <div>
                <span>
                  <TbPlant2></TbPlant2>
                  <span>12</span>
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
            <ReactMarkdown children={testMarkdown}></ReactMarkdown>
          </div>
        </div>
      </div>

      <div className='post-comment-sec'>
        <h2>Comments</h2>

        <WriteCommentBox />

        <div>
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </div>
  )
}

const WriteCommentBox = () => {
  return (
    <div className='wcom'>
      <textarea placeholder='Want to discuss something?' />

    </div>
  )
}

export default ViewPost