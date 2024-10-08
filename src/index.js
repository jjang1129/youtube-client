import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import "./assets/reset (5).css";
import "./assets/dark.scss";
import { AuthProvidver } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// 리덕스 import
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <AuthProvidver>
        <RouterProvider router={router} />
      </AuthProvidver>
    </ThemeProvider>
  </Provider>
);
// provider 쓸때 계속 감싸주면댐
