import React, { useState } from "react";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useNavigate } from "react-router";
import FullScreenLoader from "./FullScreenLoader";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.scss";
import { Link } from "react-router-dom";
import { Button } from "../../components/import";
import { useAuth } from "../../contexts/AuthContext";

const client_server_url = `${process.env.REACT_APP_server_url}/api/auth`;

const SignUp = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cnfrmPassword: "",
  });

  const auth = useAuth()

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const submit = () => {
    const passwordRegex = new RegExp(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    );
    const emailRegex = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (
      !(
        loginData.firstname &&
        loginData.lastname &&
        loginData.password &&
        loginData.cnfrmPassword &&
        loginData.email
      )
    ) {
      toast.error("Fields cannot be empty.", { position: "top-center" });
    } else if (!emailRegex.test(loginData.email)) {
      toast.error("Please enter valid Email Address.", {
        position: "top-center",
      });
    } else if (loginData.password !== loginData.cnfrmPassword) {
      toast.error("Password Field Didnt Match.", { position: "top-center" });
    } else if (!passwordRegex.test(loginData.password)) {
      toast.error(
        "Min 8 letter password, with at least a symbol, upper and lower case letters and a number",
        {
          position: "top-center",
        }
      );
    } else {
      setLoading(true);
      axios
        .post(`${client_server_url}/SignUp/`, {
          firstName: loginData.firstname,
          lastName: loginData.lastname,
          email: loginData.email,
          password: loginData.password,
          google: false,
        })
        .then((response) => {
          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          setLoading(false);
          const statusCode = error.response.status;
          if (statusCode == 409) {
            toast.error("Email address already in use.", {
              position: "top-center",
            });
          }
        });
    }
  };
  const onSuccess = async (response) => {
    console.log(response.profileObj.email);
    localStorage.setItem("username", response.profileObj.email);
    localStorage.setItem("loggedIn", true);

    try {
      const { data: res } = await axios.post(`${client_server_url}/SignUp`, {
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        password: "",
        google: true,
      });
      console.log(res);
      navigate("/login");
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode == 409) {
        toast.error("Email address already in use.", {
          position: "top-center",
        });
      }
    }

    //refreshTokenSetup(res);
  };
  return (
    <div className="signup-container">
      <div className="bg-sections">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="signup">
        <h1>Register your account</h1>

        <input
          type="text"
          name="firstname"
          value={loginData.firstname}
          placeholder="Firstname"
          onChange={onChange}
        ></input>
        <input
          type="text"
          name="lastname"
          value={loginData.lastname}
          placeholder="Lastname"
          onChange={onChange}
        ></input>
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
        <input
          type="password"
          name="cnfrmPassword"
          value={loginData.cnfrmPassword}
          placeholder="Confirm Password"
          onChange={onChange}
        ></input>
        <div className="redirect">
          <span>Have an account ? </span>
          <Link to="/login">Login</Link>
        </div>
        <div className="btn">
          <Button onClick={submit} text='Signup' />

        </div>
        <div className="or">OR</div>
        <div className="google">
          <GoogleLogin
            clientId={process.env.REACT_APP_client_id}
            onSuccess={onSuccess}
            onFailure={(err) => console.log("fail", err)}
            buttonText="Signup with Google"
          ></GoogleLogin>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
