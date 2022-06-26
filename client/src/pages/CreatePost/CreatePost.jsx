import React, { useState } from "react";
import { useEffect } from "react";
import { BigButton, FileUpload } from "../../components/import";
import { toast } from "react-toastify";
import MarkdownEditor from "../../components/MarkdownEditor/MarkdownEditor";
import "./CreatePost.scss";
import axios from "axios";
import LoadingBtn from "../../components/LoadingBtn/LoadingBtn";

const server_url = `${process.env.REACT_APP_server_url}/api`;
const CreatePost = () => {
  const [files, setFiles] = useState([]);
  const [prevImg, setPrevImg] = useState();
  const [markdownVal, setMarkdownVal] = useState("");
  const [post, setPost] = useState({
    title: "",
    tags: "",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState("none");

  const createPost = async () => {
    if (post.title === "" || post.tags === "") {
      toast.error("Please fill all the fields", {
        position: "top-center",
      });
      return;
    }
    try {
      const varToken = await localStorage.getItem("auth_token");
      setLoading("true");
      const res = await axios.post(
        `${server_url}/posts`,
        {
          title: post.title,
          tags: post.tags.split(","),
          content: markdownVal,
          image: post.image,
        },
        {
          headers: {
            Authorization: varToken,
          },
        }
      );
      setLoading("false");
      toast.success("Post created successfully", { position: "top-center" });
    } catch (e) {
      console.log("err --> ", e);
    }
  };

  useEffect(() => {
    if (prevImg) {
      setPost((prevValue) => {
        return {
          ...prevValue,
          image: prevImg,
        };
      });
    }
  }, [prevImg]);

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
    <div className="create-post container page">
      <h1>New Post</h1>
      <div className="form-container">
        <div className="title-util">
          <h3>Title</h3>
          <div className="title">
            <input
              name="title"
              value={post.title}
              onChange={handleOnChange}
              type="text"
              placeholder="Title here..."
            />
          </div>
        </div>
        <div className="title-util">
          <h3>Content</h3>
          <div className="tags">
            <MarkdownEditor setMarkdownVal={setMarkdownVal} />
          </div>
        </div>
        <div className="title-util">
          <h3>Tags</h3>
          <div className="tags">
            <textarea
              name="tags"
              value={post.tags}
              onChange={handleOnChange}
              placeholder="Enter ',' seperated tag (e.g. india, tree)"
            />
          </div>
        </div>
        <div className="title-util">
          <h3>Post Image</h3>
          <div className="image">
            <FileUpload setPrevImg={setPrevImg} setFiles={setFiles} />
          </div>
        </div>
        <div className="btn" onClick={createPost}>
          <LoadingBtn loading={loading} text="Create Post" />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
