import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const CitiesList = ({cities}) => {
  const {activeCity} = useSelector((state) => state.OFFER);

  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => {
          return (
            <li key={city} className="locations__item">
              <Link className={`locations__item-link tabs__item ${(city === activeCity) ? `tabs__item--active` : ``}`} to={`/city/${city}`}>
                <span>{city}</span>
              </Link>
            </li>
          );
        })
      }
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesList;
