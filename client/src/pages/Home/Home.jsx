import React from 'react'
import { About, Header } from '../../components/import'
import './Home.scss'

const Home = () => {
	return (
		<div className='home container'>
			<Header />
			<About />

			<div className='home-sec'></div>
		</div>
	)
}

export default Home