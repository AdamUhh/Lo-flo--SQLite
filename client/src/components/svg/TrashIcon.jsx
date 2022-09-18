import * as React from "react";

const TrashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="trashicon_svg__icon trashicon_svg__icon-tabler trashicon_svg__icon-tabler-trash"
    width={30}
    height={30}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#2c3e50"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
  </svg>
);

export default TrashIcon;
