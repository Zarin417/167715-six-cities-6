import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  CARDS_AMOUNT: 5
};

const root = document.querySelector(`#root`);

ReactDOM.render(
    <App
      cardsAmount={Setting.CARDS_AMOUNT}
    />,
    root
);
