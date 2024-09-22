import React from "react";
import { Component } from "../Component/Component";
import { Frame } from "../Frame/Frame";
import "./style.css";

export const Web = () => {
  return (
    <div className="web">
      <div className="div-3">
        <img className="img" alt="Frame" src="frame-58.png" />
        <div className="action-block-wrapper">
          <div className="action-block-2">Conoce como</div>
        </div>
        <div className="frame-2">
          <div className="component-wrapper">
            <Component className="component-1" />
          </div>
          <div className="text-wrapper-3">¿Cómo funciona?</div>
        </div>
        <div className="frame-3">
          <div className="btn-block-wrapper">
            <div className="div-wrapper">
              <div className="action-block-3">Acceso al portal:</div>
            </div>
          </div>
          <div className="flexcontainer">
            <p className="text">
              <span className="text-wrapper-4">
                ¿Qué esperas para unirte?
                <br />
              </span>
            </p>
            <p className="text">
              <span className="text-wrapper-5">Regístrate en nuestro portal&nbsp;&nbsp; </span>
            </p>
          </div>
        </div>
        <div className="frame-4">
          <div className="frame-5">
            <Frame className="frame-48" property1="one" />
            <Frame property1="two" />
          </div>
          <div className="btn-block-2">
            <div className="action-block-4">¡Únete ahora!</div>
          </div>
        </div>
        <header className="header">
          <div className="frame-6">
            <div className="text-wrapper-6">Nuestros planes</div>
            <div className="list">
              <div className="item-margin">
                <div className="item">
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-7">SISTEMA DE PUNTOS</div>
                  </div>
                </div>
              </div>
              <div className="item-margin">
                <div className="item">
                  <div className="div-wrapper-2">
                    <div className="cibercolegios">PLANES</div>
                  </div>
                </div>
              </div>
              <div className="item-margin">
                <div className="item">
                  <div className="div-wrapper-2">
                    <div className="text-wrapper-7">UNIRME</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="png">
            <div className="group">
              <div className="rectangle" />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};
