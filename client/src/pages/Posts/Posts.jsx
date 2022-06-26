import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Loader, Post } from '../../components/import'
import './Posts.scss'

const server_url = process.env.REACT_APP_server_url
const Posts = () => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts();
	}, [])

	const getPosts = async () => {
		try {
			setLoading(true)
			const res = await axios.get(`${server_url}/api/posts`);
			setPosts(res.data)
			setLoading(false)
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className='container page'>
			<h1>Posts</h1>
			<div className='posts-list'>
				{loading ? <div className='loading'><Loader /></div> : posts?.map((post, key) => {
					return <Post post={post} key={key} />
				})}
			</div>
		</div>
	)
}

export default Posts