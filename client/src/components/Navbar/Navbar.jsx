import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
	return (
		<div className='navbar container'>
			<div className="logo">Our Logo</div>
			<div className="links">
				<Link to='/'>Home</Link>
				<Link to='/posts'>Posts</Link>
				<Link to='/events'>Events</Link>
				<Link className='big' to='/login'>Login / Register</Link>
			</div>
		</div>
	)
}

export default Navbar