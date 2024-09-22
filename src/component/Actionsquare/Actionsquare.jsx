import PropTypes from "prop-types";
import React from "react";
import "./actionsquare.css";

export const Actionsquare = ({ property1, className }) => {
  return (
    <div className={`actionsquare ${className}`}>
      <div className="btn-block">
        <div className="action-block">¡Conoce nuestros planes!</div>
      </div>
    </div>
  );
};

Actionsquare.propTypes = {
  property1: PropTypes.oneOf(["default"]),
};
