import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./renderer/register-components";
import TestRenderApp from "./test/test-render";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TestRenderApp />
  </React.StrictMode>
);