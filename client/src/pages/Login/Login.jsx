import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gapi } from "gapi-script";
import FullScreenLoader from "../Signup/FullScreenLoader";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";
import { Link } from "react-router-dom";
import { Button } from "../../components/import";
import { useAuth } from "../../contexts/AuthContext";

const admin_server_url = process.env.REACT_APP_server_url;

const Login = () => {
  const navigate = useNavigate();
  window.gapi.load("client:auth2", () => {
    window.gapi.client.init({
      clientId: process.env.REACT_APP_client_id,
      plugin_name: "chat",
    });
  });

  const [isLoading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth()

  if (auth.state.authenticated) {
    return navigate('/');
  }

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  const submit = async () => {
    if (!(loginData.email && loginData.password)) {
      toast.error("Fields cannot be empty.", { position: "top-center" });
    } else {
      setLoading(true);
      try {
        const { data: res } = await axios.post(
          `${admin_server_url}/api/auth/login`,
          {
            email: loginData.email,
            password: loginData.password,
            google: false,
          }
        );

        localStorage.setItem("auth_token", res.token);
        auth.verifyLogin()
        navigate("/");
      } catch (error) {
        const statusCode = error.response.status;
        if (statusCode == 401) {
          toast.error("Invalid email/password.", {
            position: "top-center",
          });
        }
      }
      setLoading(false);
    }
  }

  const onSuccess = async (response) => {
    setLoading(true);
    try {
      const { data: res } = await axios.post(
        `${admin_server_url}/api/auth/login`,
        {
          email: response.profileObj.email,
          password: "",
          google: true,
        }
      )

      localStorage.setItem("auth_token", res.token);
      auth.verifyLogin()
      navigate("/");
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode == 401) {
        toast.error("Invalid email/password.", {
          position: "top-center",
        });
      }
    }
    setLoading(false);
    //refreshTokenSetup(res);
  }

  return (
    <div className="login-container">
      <div className="bg-sections">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="login">
        <h1>Login into your account</h1>
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
        <div className="btn">
          <Button text='Login' onClick={submit} />

        </div>

        <div className="or">OR</div>
        <div className="google">
          <GoogleLogin
            clientId={process.env.REACT_APP_client_id}
            onSuccess={onSuccess}
            onFailure={(err) => console.log("fail", err)}
            buttonText="Sign in with Google"
          ></GoogleLogin>
        </div>

      </div>
    </div>
  )
}

export default Login;
