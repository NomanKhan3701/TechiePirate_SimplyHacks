import './CommentCard.scss'
import { TbPlant2 } from 'react-icons/tb'
import { getDefaultPhoto } from '../../utils'

const CommentCard = ({comment}) => {
  return (
    <div className='comment'>
      <div className='author'>
        <img src={comment.author?.image || getDefaultPhoto(comment.author)} />
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