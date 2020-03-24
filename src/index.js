import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store.js";
import App from "./js/components/App";

import * as actions from './js/actions.js'


// //Initialize instances for the console
// window.store = store;
// for(const action in actions){
//   window[action] = actions[action]
// }


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);