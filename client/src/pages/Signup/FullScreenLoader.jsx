import React from "react";
import "./FullScreenLoader.scss";

const FullScreenLoader = () => {
	return (
		<div className="full-screen-loader">
			<div className="gooey">
				<span className="dot"></span>
				<div className="dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	);
};

export default FullScreenLoader;