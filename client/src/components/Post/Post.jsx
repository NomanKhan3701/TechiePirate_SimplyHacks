import React from 'react'
import { Link } from 'react-router-dom'
import './Post.scss'

const Post = () => {
	return (
		<Link to={'/post/gfg'} className='post'>
			<div className="img-holder">
				<img src='https://via.placeholder.com/512' />

				<div className="fader"></div>
			</div>
			<div className='title'>
				Post Title
				<span>By Aditya • Misc • 25/06/2022</span>
			</div>

			<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum magna vel justo tincidunt aliquet.
			</p>
		</Link>
	)
}

export default Post