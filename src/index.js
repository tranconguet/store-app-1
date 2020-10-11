import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UIReducer from "../src/Redux/reducer/UIreducer";
import userReducer from "../src/Redux/reducer/userReducer";
import authReducer from "../src/Redux/reducer/AuthReducer";
import CssBaseline from "@material-ui/core/CssBaseline";

const rootReducer = combineReducers({
  auth: authReducer,
  UI: UIReducer,
  user: userReducer,
});

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("[Middleware] Dispatching", action);
      const result = next(action);
      console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />   
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
