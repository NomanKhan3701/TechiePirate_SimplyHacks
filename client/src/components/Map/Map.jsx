import React, { useEffect, useState, useRef } from "react";
import "./Map.scss";
import Map, { GeolocateControl, Marker, useControl, NavigationControl } from 'react-map-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import marker from '../../assets/images/marker.png'

const accessToken =
  "pk.eyJ1Ijoibm9tYW4zNzAxIiwiYSI6ImNsNHR4dXBsZTBqOXgzZXBoeDdydHpjajMifQ.6-p5dHzGJUZuRvrjxLQm4w";

const CreateEventMap = ({ longi, setLongitude, lati, setLatitude }) => {
  const [zoom, setZoom] = useState(10);
  const [initialLongi, setInitialLongi] = useState(longi);
  const [initialLati, setInitialLati] = useState(lati);
  const [viewState, setViewState] = React.useState({
    longitude: longi,
    latitude: lati,
    zoom: zoom
  });

  const change = (evt) => {
    setViewState(evt.viewState)
  }

  const markerMove = (evt) => {
    setInitialLati(evt.lngLat.lat);
    setInitialLongi(evt.lngLat.lng);
    setLongitude(evt.lngLat.lng)
    setLatitude(evt.lngLat.lat)
  }

  return <Map
    {...viewState}
    onMove={evt => change(evt)}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={accessToken}
    onClick={evt => markerMove(evt)}
  ><GeolocateControl />
    <Marker pitchAlignment="auto" draggable="true" onDrag={evt => console.log(evt)} longitude={initialLongi} latitude={initialLati} anchor="bottom" >
      <img className="marker" src={marker} />
    </Marker>
    <NavigationControl position="top-left" />
  </Map>;
};

export default CreateEventMap;
