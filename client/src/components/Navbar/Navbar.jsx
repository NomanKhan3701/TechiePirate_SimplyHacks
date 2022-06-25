import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	
	useEffect(() => {
		const listener = () => {
			if (window.scrollY > 60 && !scrolled) {
				setScrolled(true)
			}
			else if (window.scrollY < 60 && scrolled) {
				setScrolled(false)
			}
		}

		window.addEventListener('scroll', listener)
	}, [scrolled])

	return (
		<div className={'navbar container' + (scrolled ? ' scrolled' : '')}>
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