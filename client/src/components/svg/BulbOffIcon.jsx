import * as React from "react";

const BulbOffIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="bulbofficon_svg__icon bulbofficon_svg__icon-tabler bulbofficon_svg__icon-tabler-bulb-off"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#2c3e50"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M9 16a5 5 0 1 1 6 0 3.5 3.5 0 0 0-1 3 2 2 0 0 1-4 0 3.5 3.5 0 0 0-1-3M9.7 17h4.6" />
  <line x1="5" y1="7" x2="19" y2="19" />

  </svg>
);

export default BulbOffIcon;
