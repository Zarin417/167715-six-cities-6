import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import offers from "./mocks/offers";
import reviews from "./mocks/reviews";

const root = document.querySelector(`#root`);

ReactDOM.render(
    <App offers={offers} reviews ={reviews} />,
    root
);
