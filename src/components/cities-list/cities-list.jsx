import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import PropTypes from "prop-types";
import {CITIES} from "../../const";
import City from "../city/city";

const CitiesList = ({currentCity, onChangeCity}) => {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => <City key={city} city={city} isActive={currentCity === city} onChangeCity={onChangeCity} />)}
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
