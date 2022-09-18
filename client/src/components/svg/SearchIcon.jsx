import * as React from "react";

const SvgSearchicon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="searchicon_svg__icon searchicon_svg__icon-tabler searchicon_svg__icon-tabler-search"
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
    <circle cx={10} cy={10} r={7} />
    <path d="m21 21-6-6" />
  </svg>
);

export default SvgSearchicon;

