import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.scss'

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const auth = useAuth()

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
			<div className="logo">
				We<span>Change</span>
			</div>
			<div className="links">
				<Link className='link' to='/'>Home</Link>
				<Link className='link' to='/posts'>Posts</Link>
				<Link className='link' to='/events'>Events</Link>
				{
					!auth.state.authenticated ?
						<Link className='big' to='/login'>Login / Register</Link>
						:
						<Link to='/profile'>
							<div className='nav-user'>
								<img src={auth.state?.user?.image || 'https://via.placeholder.com/128'} />
								{`${auth.state.user.firstName} ${auth.state.user.lastName}`}
							</div>
						</Link>
				}
			</div>
		</div>
	)
}

export default Navbar