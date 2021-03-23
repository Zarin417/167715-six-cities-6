import React from "react";
import PropTypes from "prop-types";

const City = ({city, isActive, onChangeCity}) => {
  const handleCityClick = (evt) => {
    evt.preventDefault();
    onChangeCity(city);
  };

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive && `tabs__item--active`}`} href="#" onClick={handleCityClick}>
        <span>{city}</span>
      </a>
    </li>
  );
};

City.propTypes = {
  city: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChangeCity: PropTypes.func.isRequired
};

export default City;
