import React from 'react'
import { Post } from '../../components/import'
import './Posts.scss'

const Posts = () => {
  return (
	<div>
		<h1>Posts</h1>
		<div> ALl the post below</div>
		<Post/>
		<Post/>
		<Post/>
		<Post/>
	</div>
  )
}

export default Posts