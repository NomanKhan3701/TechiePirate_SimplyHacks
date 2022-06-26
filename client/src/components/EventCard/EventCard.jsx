import React from "react";
import moment from "moment";
import { HiOutlineLocationMarker } from "react-icons/hi";
import "./EventCard.scss";
import { Link } from "react-router-dom";
import { eventTypes } from "../../constants";
import { getEventType } from "../../utils";

const EventCard = ({ event }) => {
  // const eventType = eventTypes[event.eventTags[0]];
  const eventType = eventTypes[getEventType(event)];
  const IconComponent = eventType.icon;

  return (
    <Link
      to={`/event/${event.eventId}`}
      className="event-card"
      style={{ "--color-accent": eventType.color }}
    >
      <div className="event-card-header">
        <img
          src={event.image ? event.image : "https://via.placeholder.com/512"}
          alt=""
        />
        <div className="title">{event.title}</div>
        <div className="date">
          {moment(event.time).format("Do")}
          <span>{moment(event.time).format("MM/YY")}</span>
        </div>
      </div>

      <div className="details">{event.description}</div>

      <div className="event-card-overlay">
        <span className="big-icon">
          <IconComponent />
        </span>
        {eventType.title}
        <span className="info">
          <HiOutlineLocationMarker className="icon" />
          {event.city}
        </span>
      </div>
    </Link>
  );
};

export default EventCard;
