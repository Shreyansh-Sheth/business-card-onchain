import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
(window as any).global = window;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThirdwebProvider>
);
