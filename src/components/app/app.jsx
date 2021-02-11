import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main';

const App = (props) => {
  const {cardsAmount} = props;

  return (
    <Main cardsAmount={cardsAmount}/>
  );
};

App.propTypes = {
  cardsAmount: PropTypes.number.isRequired
};

export default App;
