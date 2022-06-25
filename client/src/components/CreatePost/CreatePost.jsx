import React, { useState } from 'react'
import { useEffect } from 'react';
import { FileUpload } from '../import'
import { toast } from 'react-toastify';
import './CreatePost.scss'
import axios from 'axios';

const server_url = `${process.env.REACT_APP_server_url}/api`;
const CreatePost = () => {
	const [files, setFiles] = useState([]);
	const [prevImg, setPrevImg] = useState();
	const [post, setPost] = useState({
		title: "",
		tags: "",
		content: ""
	})

	const createPost = async () => {
		if (post.title === "" || post.tags === "" || post.content === "") {
			toast.error("Please fill all the fields", {
				position: "top-center",
			});
			return;
		}
		try {
			const res = await axios.post(`${server_url}/posts`, {
				title: post.title,
				tags: post.tags,
				content: post.content,
			})
			console.log(res)
		} catch (e) {
			console.log("err --> ", e);
		}

	}

	useEffect(() => {
		if (prevImg) {
			setPost((prevValue) => {
				return {
					...prevValue,
					content: prevImg,
				}
			})
		}
	}, [prevImg])

	const handleOnChange = (event) => {
		const { value, name } = event.target;
		setPost((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	};

	return (
		<div className='create-post container'>
			<div className="form-container">
				<div className="title-util">
					<h3>Title</h3>
					<div className="title">
						<input name='title' value={post.title} onChange={handleOnChange} type="text" placeholder='Title here...' />
					</div>
				</div>
				<div className="title-util">
					<h3>Tags</h3>
					<div className="tags">
						<textarea name='tags' value={post.tags} onChange={handleOnChange} placeholder="Enter ',' seperated (e.g. india,tree)..." />
					</div>
				</div>
				<div className="title-util">
					<h3>Post Image</h3>
					<div className="image">
						<FileUpload setPrevImg={setPrevImg} setFiles={setFiles} />
					</div>
				</div>
				<div className="btn" onClick={createPost}>Create Post</div>
			</div>

		</div>
	)
}

export default CreatePost