import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import OktaProvider from "@/auth/OktaProvider";
//import { Security } from "@okta/okta-react";
import App from "./App";
import "./index.css";
//import { oktaAuth, restoreOriginalUri } from "./auth/oktaConfig";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <OktaProvider>
      <App />
    </OktaProvider>
  </BrowserRouter>
);
