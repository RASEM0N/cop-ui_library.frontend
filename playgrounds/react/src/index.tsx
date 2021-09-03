import React from "react";
import ReactDOM from "react-dom";

import { Button } from "@cop.ui/react";
import '@cop.ui/scss/lib/Button.css'
import '@cop.ui/scss/lib/global.css'

ReactDOM.render(<Button label="Example button" />, document.querySelector("#id"));
