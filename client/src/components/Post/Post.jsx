import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { LimitChar } from '../import'
import './Post.scss'

const Post = ({ post }) => {
	return (
		<Link to={`/post/${post.postId}`} className='post'>
			<div className="img-holder">
				<img src={post.image ? post.image : 'https://via.placeholder.com/512'} />

				<div className="fader"></div>
			</div>
			<div className='title'>
				{post.title}
				<span>By Aditya • {post.tags[0]} • {moment(post.createdAt).format("DD/MM/YY")}</span>
			</div>
			<div className='content'>
				<LimitChar word={post.content} limit={30} />
			</div>
		</Link>
	)
}

export default Post