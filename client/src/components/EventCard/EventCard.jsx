import React from 'react'
import moment from 'moment'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import './EventCard.scss'
import { Link } from 'react-router-dom'
import { eventTypes } from '../../constants'

const EventCard = () => {
  const event = {
    id: 'test',
    title: 'My Event Title',
    date: moment(),
    details: 'Hello World',
    type: Math.random() > 0.5 ? 'tree_planting' : 'beach_cleaning',
    location: 'Bandra, Mumbai' 
  }

  const eventType = eventTypes[event.type]
  const IconComponent = eventType.icon

	return (
		<Link to={`/event/${event.id}`} className='event-card' style={{'--color-accent': eventType.color}}>
      <div className='event-card-header'>
        <img src='https://via.placeholder.com/512' alt=''/>
        <div className='title'>
          {event.title}
        </div>
        <div className='date'>
          {event.date.format('Do')}
          <span>
            {event.date.format('MM/YY')}
          </span>
        </div>
      </div>

      <div className='details'>
        {event.details}
      </div>

      <div className='event-card-overlay'>
        <span className='big-icon'><IconComponent /></span>
        {eventType.title}
        <span className='info'>
          <HiOutlineLocationMarker className='icon' />
          {event.location}
        </span>
      </div>
    </Link>
	)
}

export default EventCard