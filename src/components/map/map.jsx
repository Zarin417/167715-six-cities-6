import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {useSelector} from "react-redux";
import {offerProp} from "../../prop-types/offer.prop";
import {cityProp} from "../../prop-types/city.prop";
import {getCityPlaces} from '../../utils';
import "leaflet/dist/leaflet.css";

let layerGroup;

const Map = ({places, city, placeInfo}) => {
  const {activeCard} = useSelector((state) => state.CARD);
  const mapRef = useRef();
  const cityPlaces = getCityPlaces(places, city);

  const location = cityPlaces[0].city.location;

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: location.latitude,
        lng: location.longitude
      },
      zoom: location.zoom,
      zoomControl: false,
      marker: true
    });

    mapRef.current.setView({
      lat: location.latitude,
      lng: location.longitude
    }, location.zoom);


    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
          contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      }).addTo(mapRef.current);

    layerGroup = leaflet.layerGroup().addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, [city]);

  useEffect(() => {
    layerGroup.clearLayers();

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });


    const activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 30]
    });


    places.map((place) => {
      const pin = (place.id === activeCard) ? activeIcon : icon;
      leaflet
        .marker({
          lat: place.location.latitude,
          lng: place.location.longitude
        }, {icon: pin})
        .addTo(layerGroup);
    });

    if (placeInfo) {
      leaflet
        .marker({
          lat: placeInfo.location.latitude,
          lng: placeInfo.location.longitude
        }, {icon: activeIcon})
        .addTo(layerGroup);
    }
  });

  return (
    <div id="map" style={{height: `100%`}} />
  );
};

Map.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(offerProp)
  ).isRequired,
  city: cityProp,
  placeInfo: PropTypes.shape(offerProp),
};

export default Map;
