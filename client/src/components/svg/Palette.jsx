import * as React from "react";

const Palette = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="palette_svg__icon palette_svg__icon-tabler palette_svg__icon-tabler-palette"
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
    <path d="M12 21a9 9 0 1 1 0-18 9 8 0 0 1 9 8 4.5 4 0 0 1-4.5 4H14a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 12 21" />
    <circle cx={7.5} cy={10.5} r={0.5} fill="currentColor" />
    <circle cx={12} cy={7.5} r={0.5} fill="currentColor" />
    <circle cx={16.5} cy={10.5} r={0.5} fill="currentColor" />
  </svg>
);

export default Palette;

