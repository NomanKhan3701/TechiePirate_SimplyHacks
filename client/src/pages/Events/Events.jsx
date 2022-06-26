import React from "react";
import { useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Events.scss";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { BigButton } from "../../components/import";
import { Link, useNavigate } from "react-router-dom";

const server_url = process.env.REACT_APP_server_url;
const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server_url}/api/events`);
      setEvents(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container page">
      <h1>Upcoming Events</h1>

      <SearchBar />

      {auth.state.authenticated ? (
        <Link
          style={{
            width: "fit-content",
            marginBottom: "24px",
            display: "flex",
          }}
          to="/events/create"
        >
          <BigButton>Create</BigButton>
        </Link>
      ) : null}

      <div className="events-list">
        {events.map((event, index) => {
          return <EventCard key={index} event={event}></EventCard>;
        })}
      </div>
    </div>
  );
};

export default Events;
