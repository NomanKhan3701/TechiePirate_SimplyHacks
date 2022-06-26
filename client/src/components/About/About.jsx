import React from "react";
import "./About.scss";
import Lottie from "react-lottie-player";
import gardeningJson from "../../assets/lottie/gardening.json";
import contactJson from "../../assets/lottie/contact-us-lottie.json";
import deliveryJson from "../../assets/lottie/delivery-bike.json";
import envelopeJson from "../../assets/lottie/nature-envelope.json";
// import { motion } from "framer-motion";

const About = () => {
	return (
		<div className="about">

			<div className="about-info">
				<div className="image">
					<Lottie
						loop
						animationData={gardeningJson}
						play
						style={{ margin: "auto", width: "200px", minHeight: "200px" }}
					/>
				</div>
				<div className="content-right">
					<div className="content">
						When the last tree is cut and the last fish killed, the last river poisoned, then you will see that you can't eat money.

						- John May
					</div>
				</div>
			</div>

			<div className="about-info">
				<div className="content-left">
					<div className="content">
						Never doubt that a small group of thoughtful and committed citizens can change the world. Indeed, it is the only thing that ever has.

						- Margret Head
					</div>
				</div>
				<div className="image">
					<Lottie
						loop
						animationData={envelopeJson}
						play
						style={{ margin: "auto", width: "200px", minHeight: "200px" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
