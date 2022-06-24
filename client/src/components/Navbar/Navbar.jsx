import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
  return (
	<div className='navbar'>
		<div className="logo">Our Logo</div>
		<div className="links">
			<Link to='/'>Home</Link>
			<Link to='/posts'>Posts</Link>
			<Link to='/login'>Login</Link>
			<Link to='/signup'>Signup</Link>
		</div>
	</div>
  )
}

export default Navbar