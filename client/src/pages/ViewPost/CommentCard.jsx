import './CommentCard.scss'
import { TbPlant2 } from 'react-icons/tb'

const CommentCard = () => {
  return (
    <div className='comment'>
      <div className='author'>
        <img src='https://via.placeholder.com/256' />
        <div>
          Aditya Kharote
          <span>
            <TbPlant2 />
            <span>12</span>
          </span>
        </div>  
      </div>  

      <div className="content">
        Sab scam hain, so jao
      </div>
    </div>
  )
}

export default CommentCard