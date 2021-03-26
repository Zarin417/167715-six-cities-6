import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import {SORT_TYPE} from "../../const";
import SortListItem from "../sort-list-item/sort-list-item";

const SortList = ({currentSortType, onChangeSort}) => {
  const [isSortListOpen, setIsSortListOpen] = useState(false);

  const handleSortClick = () => {
    setIsSortListOpen((prevState) => !prevState);
  };

  const handleSortChange = (sortType) => {
    onChangeSort(sortType);
    setIsSortListOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0" onClick={handleSortClick}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortListOpen && `places__options--opened`}`}>
        {Object.values(SORT_TYPE).map((sort) =>
          <SortListItem key={sort} isActive={sort === currentSortType} sortType={sort} onChangeSort={handleSortChange} />
        )}
      </ul>
    </form>
  );
};

SortList.propTypes = {
  currentSortType: PropTypes.string.isRequired,
  onChangeSort: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentSortType: state.currentSortType
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSort(sortType) {
    dispatch(ActionCreator.changeSort(sortType));
  }
});

export {SortList};
export default connect(mapStateToProps, mapDispatchToProps)(SortList);
