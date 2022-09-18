import * as React from "react";

const ButtonLoadingIcon = (props) => (
  <svg viewBox="0 0 50 50" {...props} className="btn_loading_spinner">
    <circle className="btn_loading_path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
  </svg>
);

export default ButtonLoadingIcon;
