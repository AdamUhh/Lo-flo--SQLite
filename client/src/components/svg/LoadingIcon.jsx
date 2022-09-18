import * as React from "react";

const LoadingIcon = (props) => (
  <svg viewBox="0 0 50 50" {...props} className="loading_spinner">
    <circle className="loading_path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
  </svg>
);

export default LoadingIcon;
