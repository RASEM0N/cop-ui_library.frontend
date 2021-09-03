import React from "react";
import ReactDOM from "react-dom";

import { Color } from "@cop.ui/react";

// import "@cop.ui/scss/lib/global.css"
import "@cop.ui/scss/lib/Utilities.css";

ReactDOM.render(
  <Color hexCode="#cdcdcd" height="lg" width="xxl" />,
  document.querySelector("#id")
);
