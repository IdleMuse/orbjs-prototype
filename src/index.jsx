import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App mount={rootElement} />
  </StrictMode>,
  rootElement
);
