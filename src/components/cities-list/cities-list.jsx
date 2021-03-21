import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import PropTypes from "prop-types";
import {CITIES} from "../../const";

const CitiesList = ({currentCity, onChangeCity}) => {
  const handleCityClick = (evt) => {
    evt.preventDefault();
    onChangeCity(evt.target.innerText);
  };

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => {
        return (
          <li key={city} className="locations__item">
            <a className={
              currentCity === city
                ? `locations__item-link tabs__item tabs__item--active`
                : `locations__item-link tabs__item`
            } href="#" onClick={handleCityClick} >
              <span>{city}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

CitiesList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  onChangeCity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});


export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
