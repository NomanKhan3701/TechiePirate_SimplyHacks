import React from "react";
import "./About.scss";
import Lottie from "react-lottie-player";
import gardeningJson from "../../assets/lottie/gardening.json";
import contactJson from "../../assets/lottie/contact-us-lottie.json";
import deliveryJson from "../../assets/lottie/delivery-bike.json";
import envelopeJson from "../../assets/lottie/nature-envelope.json";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="about">
      <div className="about-info">
        <div className="image">
          <Lottie
            loop
            animationData={gardeningJson}
            play
            style={{ margin: "auto", height: "250px", minHeight: "200px" }}
          />
        </div>
        <div className="content-right">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          excepturi minima, molestias quia minus non quasi aliquam vero debitis?
          Autem praesentium consequuntur voluptas consequatur soluta odio modi,
          aut ut optio.
        </div>
      </div>
      <div className="about-info">
        <div className="content-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis eius
          deserunt dignissimos quod id ducimus suscipit voluptatum est porro
          nihil, cum fugiat, quidem dolores aperiam? Illo accusantium ad
          inventore. Exercitationem?
        </div>
        <div className="image">
          <Lottie
            loop
            animationData={contactJson}
            play
            style={{ margin: "auto", height: "250px", minHeight: "200px" }}
          />
        </div>
      </div>
      <div className="about-info">
        <div className="image">
          <Lottie
            loop
            animationData={deliveryJson}
            play
            style={{ margin: "auto", height: "250px", minHeight: "200px" }}
          />
        </div>
        <div className="content-right">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit dolorum
          vitae tempore dicta, minus unde laboriosam incidunt, alias accusamus,
          aperiam expedita voluptatibus illum tenetur vel quae voluptas hic enim
          natus.
        </div>
      </div>
      <div className="about-info">
        <div className="content-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam veniam
          nemo minus, vitae voluptates repudiandae saepe, natus molestias
          cupiditate ipsa expedita fuga culpa a esse dolores sapiente adipisci
          enim odit!
        </div>
        <div className="image">
          <Lottie
            loop
            animationData={envelopeJson}
            play
            style={{ margin: "auto", height: "250px", minHeight: "200px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
