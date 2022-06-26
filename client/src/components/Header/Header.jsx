import React from "react";
import "./Header.scss";
import Lottie from "react-lottie-player";
import { BsFillPlayFill } from "react-icons/bs";
import { GiThreeLeaves } from "react-icons/gi";
import lottieJson from "../../assets/lottie/wateringPlants.json";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="bg-sections">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="header-info">
        <div className="left">
          <div className="title">
            <div className="green">Together</div>
            <div className="words">We can restore the planet</div>
          </div>
          <Link to="/quality">
            <div className="util">
              <div className="btn">
                <GiThreeLeaves />
              </div>
              <div className="content">View Statistics</div>
            </div>
          </Link>
        </div>
        <div className="right">
          <div className="image">
            <Lottie
              loop
              animationData={lottieJson}
              play
              style={{ margin: "auto", height: "80vh", minHeight: "300px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
