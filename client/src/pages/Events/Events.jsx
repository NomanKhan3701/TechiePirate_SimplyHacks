import React from 'react'
import EventCard from '../../components/EventCard/EventCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import './Events.scss'

const Events = () => {
	return (
		<div className='container page'>
			<h1>Upcoming Events</h1>

			<SearchBar />

			<div className='events-list'>
				<EventCard></EventCard>
				<EventCard></EventCard>
				<EventCard></EventCard>
				<EventCard></EventCard>
				<EventCard></EventCard>
				<EventCard></EventCard>
			</div>
		</div>
	)
}

export default Events