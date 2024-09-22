import PropTypes from "prop-types";
import React from "react";
import "./frame.css";

export const Frame = ({ property1, className }) => {
  return (
    <div className={`frame ${property1} ${className}`}>
      <div className="PLAN-b-SICO">
        {property1 === "one" && <>PLAN BÁSICO</>}

        {property1 === "two" && <>PLAN premuim</>}
      </div>
      <div className="div">MENSUAL</div>
      <div className="element">
        {property1 === "one" && <>70.000</>}

        {property1 === "two" && <>100.000</>}
      </div>
      <div className="div-2">
        <div className="text-wrapper-2">comprar</div>
        <img className="line" alt="Line" />
      </div>
      <div className="detalles-acceso-a">
        <span className="span">
          Detalles:
          <br />
          <br />
        </span>
        <span className="span-2">
          {property1 === "one" && (
            <>
              Acceso a Todas las Áreas del Gimnasio: Usa libremente todas las máquinas y espacios disponibles.
              <br />
              Acceso a reservas con el profesor de su elección.
              <br />
              Obtencion de puntos: gana puntos por cada vez que entrenes con nosotros!
            </>
          )}

          {property1 === "two" && (
            <>
              Todo en el Plan Básico: Disfruta de todas las instalaciones y actividades disponibles en el Plan Básico.
              <br />
              1.5x Más Obtención de Puntos: Aumenta tus puntos por cada entrenamiento, permitiéndote canjear recompensas
              más rápidamente.
            </>
          )}
        </span>
      </div>
    </div>
  );
};

Frame.propTypes = {
  property1: PropTypes.oneOf(["two", "one"]),
};
