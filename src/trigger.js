import React from "react";

export const Trigger = props => (
  <button className="Button" onClick={props.onClick}>
    <i className="fas fa-ellipsis-v" />
  </button>
);
