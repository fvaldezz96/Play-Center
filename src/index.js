import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import io from "socket.io-client";

const stripePromise = loadStripe(
  "pk_test_51LZyETGeR2tWeoGCHWKrNwd3COAVfyKMLNrIIL8AuUa9gCNuwEUCtdJTpv4azhK8PYyuDyYsYxd2vw1tzDBW4fM7006ovG6uFg"
);

const socket = io("https://pf-henry-gamesportal.herokuapp.com");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-z0wqn8uf.us.auth0.com"
      clientId="Dcm7TYoMTTOJ46I5hdtSkaTCwvlKNauM"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </Auth0Provider>
  </Provider>
);

export default socket;
