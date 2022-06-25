import React from 'react'
import { Post } from '../../components/import'
import './Posts.scss'

const Posts = () => {
  return (
	<div className='container page'>
		<h1>Posts</h1>
		<div className='posts-list'>
			<Post></Post>
			<Post></Post>
			<Post></Post>
			<Post></Post>
		</div>
	</div>
  )
}

export default Posts