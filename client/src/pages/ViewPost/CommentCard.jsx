import './CommentCard.scss'
import { TbPlant2 } from 'react-icons/tb'

const CommentCard = ({comment}) => {
  return (
    <div className='comment'>
      <div className='author'>
        <img src='https://via.placeholder.com/256' />
        <div>
          {comment.userEmail}
          <span>
            <TbPlant2 />
            <span>12</span>
          </span>
        </div>  
      </div>  

      <div className="content">
        {comment.comment}
      </div>
    </div>
  )
}

export default CommentCard