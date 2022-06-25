import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";
import { gapi } from "gapi-script";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import FullScreenLoader from "../Signup/FullScreenLoader";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";
import { Link } from "react-router-dom";

// const admin_server_url = import.meta.env.ADMIN_SERVER_URL;
// const admin_server_url = process.env.REACT_APP_SERVER_URL;
const admin_server_url = process.env.REACT_APP_server_url;

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const submit = async () => {
    if (!(loginData.email && loginData.password)) {
      toast.error("Fields cannot be empty.", { position: "top-center" });
    } else {
      setLoading(true);
      console.log(admin_server_url);
      const { data: res } = await axios.post(
        `${admin_server_url}/api/auth/login`,
        {
          email: loginData.email,
          password: loginData.password,
        }
      );
      localStorage.setItem("token", res.data);
      console.log(res);
    }
  };
  const onSuccess = (res) => {
    console.log(res.profileObj.email);
    localStorage.setItem("username", res.profileObj.email);
    localStorage.setItem("loggedIn", true);

    //refreshTokenSetup(res);
  };
  return (
    <div className="login-container">
      <ToastContainer></ToastContainer>
      <div className="bg-sections">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          value={loginData.email}
          placeholder="Email"
          onChange={onChange}
        ></input>
        <input
          type="password"
          name="password"
          value={loginData.password}
          placeholder="Password"
          onChange={onChange}
        ></input>
        <div className="redirect">
          <span>Dont have an account ? </span>
          <Link to="/signup">Signup</Link>
        </div>
        <div className="btn" onClick={submit}>
          Submit
        </div>
        <GoogleLogin
          clientId={process.env.REACT_APP_client_id}
          onSuccess={onSuccess}
          onFailure={(err) => console.log("fail", err)}
        ></GoogleLogin>
      </div>
    </div>
  );
};
export default Login;
