import './ViewPost.scss'
import { TbPlant2 } from 'react-icons/tb'
import { BiCalendarAlt, BiTime, BiMapPin } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { testMarkdown } from '../../constants'
import CommentCard from './CommentCard'

const ViewPost = () => {
  const post = {
    // image: 'https://via.placeholder.com/512',
    title: 'Example Post',

  }

  return (
    <div className='container page'>
			<div className='post-cols'>
        <div className="left">
          {
            post.image ? 
              <img src={post.image} />
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
              <span>14th February 2022</span>
            </span>

            <span>
              <i><BiTime></BiTime></i>
              <span>10:00 AM</span>
            </span>
          </div>
        </div>

        <div className="right">
          <h1>Post Title</h1>
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