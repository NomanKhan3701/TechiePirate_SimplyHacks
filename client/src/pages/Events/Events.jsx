import React from "react";
import { useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Events.scss";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { BigButton } from "../../components/import";
import { Link, useNavigate } from "react-router-dom";

const server_url = process.env.REACT_APP_server_url;
const Events = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	const [filter, setFilter] = useState('all')
	const [searchText, setSearchText] = useState('')

	const auth = useAuth()

	useEffect(() => {
		getEvents();
	}, [])

	const getEvents = async () => {
		try {
			setLoading(true);
			const res = await axios.get(`${server_url}/api/events`)
			setEvents(res.data);
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	const results = events.filter(
		(item) => {
			if (searchText.trim() === '')	return true
			return (
				item?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
				item?.description?.toLowerCase().includes(searchText.toLowerCase())
			)
		}
	).filter(
		(item) => {
			if (filter === 'all') return true
			for (let i = 0; i < item.eventTags.length; i++) {
				if (item.eventTags[i].toLowerCase().includes(filter)) {
					return true
				}
			}
			return false
		}
	)

	return (
		<div className='container page'>
			<h1>Upcoming Events</h1>

			<SearchBar
				searchText={searchText}
				setSearchText={setSearchText}
				filter={filter}
				setFilter={setFilter}
			/>
			
			{
				auth.state.authenticated ?
					<Link style={{'width': 'fit-content', 'marginBottom': '24px', 'display': 'flex'}} to="/events/create">
						<BigButton>Create</BigButton>
					</Link>
				: null
			}

			<div className='events-list'>
				{results.map((event, index) => {
					return <EventCard key={index} event={event}></EventCard>
				})}

			</div>
		</div>
	)
}

export default Events
