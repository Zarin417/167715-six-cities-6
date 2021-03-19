import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import offerProp from "../offer/offer.prop";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({offers, location}) => {
  const mapRef = useRef();

  useEffect(() =>{
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: location.latitude,
        lng: location.longitude
      },
      zoom: location.zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    offers.forEach((offer) => {
      const customIcon = leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [27, 39]
      });

      leaflet
        .marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        }, {
          icon: customIcon
        })
        .addTo(mapRef.current);

      return () => {
        mapRef.current.remove();
      };
    });
  }, [location]);

  return (
    <div id="map" style={{height: `100%`}} ref={mapRef} />
  );
};


Map.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }),
  offers: PropTypes.arrayOf(offerProp).isRequired
};

export default Map;
