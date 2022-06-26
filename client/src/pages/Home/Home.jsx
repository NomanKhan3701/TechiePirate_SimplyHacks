import React from 'react'
import EventCard from '../../components/EventCard/EventCard'
import { About, Header, Post } from '../../components/import'
import './Home.scss'

const Home = () => {
	return (
		<div className='home container'>
			<Header />
			<About />

			<div className='home-sec'>
				<h1>Top Events</h1>
				<div className='items-grid'>
					<EventCard></EventCard>
					<EventCard></EventCard>
					<EventCard></EventCard>
					<EventCard></EventCard>
				</div>
			</div>

			<div className='home-sec'>
				<h1>Top Posts</h1>
				<div className='items-grid'>
				</div>
			</div>
		</div>
	)
}

export default Home