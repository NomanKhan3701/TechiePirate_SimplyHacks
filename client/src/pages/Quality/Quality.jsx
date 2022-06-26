import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FullScreenLoader from "../Signup/FullScreenLoader";
import "react-toastify/dist/ReactToastify.css";
import "./Quality.scss";
import { Link } from "react-router-dom";
import { Button } from "../../components/import";
import NewsAPI from "newsapi";
import moment from "moment";
const newsapi = new NewsAPI("5dad1d2da1ac42e5bf6dc26c0274ab7b");

const admin_server_url = process.env.REACT_APP_server_url;

const Quality = () => {
  const [isLoading, setLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [aqi, setAqi] = useState();
  const [weather, setWeather] = useState();
  const [latLong, setLatLong] = useState(null)
  const [news, setNews] = useState()

  var optionsForCoordinates = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  var options;

  function success(pos) {
    var crd = pos.coords;
    var lat = crd.latitude.toString();
    var lng = crd.longitude.toString();
    setLatLong(lat + ', ' + lng)

    options = {
      method: "GET",
      url: "https://api.ambeedata.com/latest/by-lat-lng",
      params: { lat: lat, lng: lng },
      headers: {
        "x-api-key":
          "a80948852f3032aeac1ad36345d1c62c4a6fa1accf538e7b208b170afa8640ba",
        "Content-type": "application/json",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setLoading(false);
        setAqi(response.data.stations[0].AQI);
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
      });
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      success,
      error,
      optionsForCoordinates
    );

    axios.get(`${admin_server_url}/api/news`).then((response) => {
      console.log("news");
      console.log(response.data.data);
      setNews(response.data.data);
    });
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const onChange = (event) => {
    setCityName(event.target.value);
  };

  const submit = async () => {
    if (!cityName) {
      toast.error("Fields cannot be empty.", { position: "top-center" });
    } else {
      setLoading(true);
      var options = {
        method: "GET",
        url: "https://api.ambeedata.com/latest/by-city",
        params: { city: cityName },
        headers: {
          "x-api-key":
            "a80948852f3032aeac1ad36345d1c62c4a6fa1accf538e7b208b170afa8640ba",
          "Content-type": "application/json",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setLoading(false);
          setAqi(response.data.stations[0].AQI);
          console.log(response.data.stations[0].AQI);
        })
        .catch(function (error) {
          setLoading(false);
          toast.error("Invalid city name.", {
            position: "top-center",
          });
        });
      options.url = "https://api.ambeedata.com/weather/alerts/latest/by-place";
      options.params = { place: cityName };
      axios
        .request(options)
        .then(function (response) {
          console.log("shalom");
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <div className="container page">
      <div className="bg-sections">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <h1>Current Scenario</h1>
      <span className="nearest-to">
        Near your location: <span>{latLong}</span>
      </span>

      <div className="aqi-card">
        AQI
        <span>{aqi || '...'}</span>
      </div>

      <div className="news-list">
        {
          news ? news.articles.map((item) => {
            return <NewsCard news={item}></NewsCard>
          }) : null
        }
      </div>
    </div>
  );
};

function NewsCard({news = {}}) {
  return (
    <a href={news.url} className='news-card'>
			<div className="img-holder">
				<img src={news.urlToImage} />

				<div className="fader"></div>
			</div>
			<div className='title'>
				{news.title}
				<span>{news.source.name + ' • ' + moment(news.publishedAt).format('hh:mm a, DD/MM/YY').toUpperCase()}</span>
			</div>
			<div className='content'>
        {news.description}
			</div>
		</a>
  )
}

export default Quality;
