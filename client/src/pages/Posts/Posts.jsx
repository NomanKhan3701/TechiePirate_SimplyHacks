import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BigButton, Loader, Post } from "../../components/import";
import { useAuth } from "../../contexts/AuthContext";
import FullScreenLoader from "../Signup/FullScreenLoader";
import "./Posts.scss";

const server_url = process.env.REACT_APP_server_url;

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const auth = useAuth();
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server_url}/api/posts`);
      setPosts(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPosts();
    setLoading(false);
  }, []);

  if (loading) {
    return <FullScreenLoader></FullScreenLoader>;
  }

  return (
    <div className="container page">
      <h1>Posts</h1>

      {auth.state.authenticated ? (
        <Link
          style={{
            width: "fit-content",
            marginBottom: "24px",
            display: "flex",
          }}
          to="/posts/create"
        >
          <BigButton>Create</BigButton>
        </Link>
      ) : null}

      <div className="posts-list">
        {loading ? (
          <div className="loading">
            <Loader />
          </div>
        ) : (
          posts?.map((post, key) => {
            return <Post post={post} key={key} />;
          })
        )}
      </div>
    </div>
  );
};

export default Posts;
