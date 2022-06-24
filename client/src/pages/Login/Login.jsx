import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";

// const admin_server_url = import.meta.env.ADMIN_SERVER_URL;
const admin_server_url = process.env.ADMIN_SERVER_URL;

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
      const { data: res } = await axios.post(`${admin_server_url}/Login`, {
        email: loginData.email,
        password: loginData.password,
      });
      localStorage.setItem("token", res.data);
      console.log(res);
    }
  };
  return (
    <div className="login-container">
      <ToastContainer></ToastContainer>
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
        <div className="btn" onClick={submit}>
          Submit
        </div>
      </div>
    </div>
  );
};
export default Login;
