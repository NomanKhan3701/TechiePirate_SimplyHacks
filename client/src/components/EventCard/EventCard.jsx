import React from 'react'
import moment from 'moment'
import { FaTree } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { TbBeach } from 'react-icons/tb'
import './EventCard.scss'

const EventCard = () => {
  const event = {
    title: 'My Event Title',
    date: moment(),
    details: 'Hello World',
    type: Math.random() > 0.5 ? 'tree_planting' : 'beach_cleaning',
    location: 'Bandra, Mumbai' 
  }

  const eventTypes = {
    'tree_planting': {
      title: 'Tree Planting',
      icon: FaTree,
      color: 'var(--color-green)'
    },
    'beach_cleaning': {
      title: 'Beach Cleaning',
      icon: TbBeach,
      color: 'var(--color-blue)'
    },
  }

  const eventType = eventTypes[event.type]
  const IconComponent = eventType.icon

	return (
		<div className='event-card' style={{'--color-accent': eventType.color}}>
      <div className='event-card-header'>
        <img src='https://via.placeholder.com/512' />
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
    </div>
	)
}

export default EventCard