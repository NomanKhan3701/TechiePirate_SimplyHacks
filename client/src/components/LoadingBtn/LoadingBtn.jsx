import React from "react";
import { TiTick } from "react-icons/ti";
import loaderGif from "../../assets/gif/loaderGif.gif";
import "./LoadingBtn.scss";

const LoadingBtn = ({ loading, text }) => {
  return (
    <div className="loader-btn">
      <span className="txt">{text}</span>
      {loading === "none" ? (
        ""
      ) : loading === "true" ? (
        <span>
          <img src={loaderGif} alt="" />
        </span>
      ) : loading === "false" ? (
        <span>
          <TiTick />
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoadingBtn;
