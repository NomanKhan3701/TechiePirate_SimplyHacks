import React, { useEffect, useState, useRef } from 'react'
import './Map.scss'
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = "pk.eyJ1Ijoibm9tYW4zNzAxIiwiYSI6ImNsNHR4dXBsZTBqOXgzZXBoeDdydHpjajMifQ.6-p5dHzGJUZuRvrjxLQm4w";

const Map = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(12);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
		}
	}, []);

	function positionSuccess(pos) {
		const crd = pos.coords;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [crd.longitude, crd.latitude],
			zoom: zoom
		});
		console.log(`More or less ${crd.accuracy} meters.`);
	}

	function positionError(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	}, []);

	return (
		<div>
			<div className="sidebar">
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	)
}

export default Map