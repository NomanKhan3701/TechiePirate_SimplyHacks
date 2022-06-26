import axios from 'axios'
import React, {useEffect, useState} from 'react'
import EventCard from '../../components/EventCard/EventCard'
import { About, Header, Loader, Post } from '../../components/import'
import './Home.scss'

const server_url = process.env.REACT_APP_server_url

const Home = () => {
	const [posts, setPosts] = useState(null);
	const [events, setEvents] = useState(null);

	const getPosts = async () => {
		try {
			const res = await axios.get(`${server_url}/api/posts`);
			setPosts(res.data)
		} catch (e) {
			console.log(e);
		}
	}

	const getEvents = async () => {
		try {
			/*const res = await axios.get(`${server_url}/api/events`);
			setEvents(res.data)*/
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getPosts();
		getEvents();
	}, [])

	return (
		<div className='home container'>
			<Header />
			<About />

			<div className='home-sec'>
				<h1>Top Events</h1>
				<div className='items-grid'>
					
				</div>
			</div>

			<div className='home-sec'>
				<h1>Top Posts</h1>
				<div className='items-grid'>
					{!posts ? <div className='loading'><Loader /></div> : posts?.map((post, key) => {
						return <Post post={post} key={key} />
					})}
				</div>
			</div>
		</div>
	)
}

export default Home