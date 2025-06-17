import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { CalendarApp } from "./CalendarApp.jsx";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CalendarApp />
    </Provider>
  </StrictMode>
);
