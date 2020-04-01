import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/redux/store.js";
import App from "./js/components/App";

import * as actions from './js/redux/actions.js'  
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);