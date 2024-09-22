import React from "react";
import { Actionsquare } from "../Actionsquare/Actionsquare";
import "./component.css";

export const Component = ({ className }) => {
  return (
    <div className={`component ${className}`}>
      <p className="text-wrapper">
        Ofrecemos un innovador sistema de puntos que puedes canjear por objetos exclusivos, desde ropa deportiva hasta
        accesorios de entrenamiento. Cada esfuerzo cuenta para alcanzar tus metas de forma gratificante. ¡Únete y
        comienza tu nueva vida con nosotros!
      </p>
      <Actionsquare className="actionsquare-instance" property1="default" />
      <img className="image" alt="Image" />
    </div>
  );
};
