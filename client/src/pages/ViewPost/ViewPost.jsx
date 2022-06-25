import './ViewPost.scss'
import { TbPlant2 } from 'react-icons/tb'
import { BiCalendarAlt, BiTime, BiMapPin } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { eventTypes } from '../../constants'

const ViewPost = () => {
  const eventType = eventTypes['tree_planting']
  return (
    <div className='container page'>
			<div className='event-cols'>
        <div className="left">
          <img src='https://via.placeholder.com/512' />

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

          <div className='event-info'>
            <span>
              <i><BiCalendarAlt></BiCalendarAlt></i>
              <span>14th February 2022</span>
            </span>

            <span>
              <i><BiTime></BiTime></i>
              <span>10:00 AM</span>
            </span>

            <span>
              <i><BiMapPin></BiMapPin></i>
              <span>
                Bhavans Campus, Old D N Nagar, Munshi Nagar, Andheri West, Mumbai, Maharashtra 400058
              </span>
            </span>
          </div>
        </div>

        <div className="right">
          <div className='event-type' style={{'color': eventType.color}}>
            <eventType.icon />
            <span>{eventType.title}</span>
          </div>
          <h1>Event Title</h1>
          <div className='event-content'>
            
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat viverra lectus, sed lacinia risus convallis sit amet. Curabitur lacinia est et egestas egestas. Fusce non lorem id mi dapibus accumsan in eget eros. Fusce auctor placerat lacus in luctus. Morbi porttitor molestie libero non placerat. Nullam tempus lacus sed felis lacinia, ac molestie mauris tempor. Nam porttitor, felis vitae commodo vulputate, odio risus tincidunt elit, vel egestas sem justo vel nulla. Aenean mattis magna enim. Praesent quis massa laoreet lacus porta ultrices elementum rhoncus enim. Aliquam erat volutpat.
<br />
<br />
Morbi erat nisi, laoreet quis tellus et, imperdiet tempus nibh. Sed nec pretium enim. Mauris lacinia rutrum pellentesque. Praesent libero nibh, efficitur vitae lobortis in, aliquet id purus. Morbi rutrum, turpis vel dapibus mattis, arcu sapien convallis libero, et viverra sem metus at justo. Donec semper enim ex, at luctus dui vulputate pellentesque. Etiam sapien quam, rhoncus in urna at, efficitur viverra purus. Mauris blandit turpis feugiat lacinia venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae tellus consequat lectus viverra maximus. Etiam pellentesque consectetur enim, et gravida elit tincidunt quis.
          </div>
        </div>
      </div>
		</div>
  )
}

export default ViewPost