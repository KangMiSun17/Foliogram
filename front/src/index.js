import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./components/common/context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
