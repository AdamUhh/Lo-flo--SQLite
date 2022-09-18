import * as React from "react";

const SvgListicon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="listicon_svg__icon listicon_svg__icon-tabler listicon_svg__icon-tabler-list-details"
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
    <path d="M13 5h8M13 9h5M13 15h8M13 19h5" />
    <rect x={3} y={4} width={6} height={6} rx={1} />
    <rect x={3} y={14} width={6} height={6} rx={1} />
  </svg>
);

export default SvgListicon;

