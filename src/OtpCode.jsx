import React, { useState, useEffect } from "react";
import "./OtpCode.css";
import StepHeader from "./StepHeader";
import logo from "./assets/logo-doctocliq-light.webp";

const OtpCode = ({ goTo, goHome }) => {
  return (
    <div className="otp-negocio-container">
      <StepHeader
        onInicio={goHome}
        onAnterior={() => goTo && goTo("sign_up")}
        onSiguiente={() => goTo("verify_mail")}
      />
      <div className="otp-negocio-card">
        <div className="otp-header-logo">
          <img src={logo} alt="Doctocliq Logo" className="otp-logo" />
        </div>
        <div className="otp-verification-section">
          <h1 className="otp-title">Verifica tu correo electrónico</h1>
          <p className="otp-subtitle">
            Tu código de verificación es el siguiente:
          </p>
          <div className="otp-code-container">
            <span className="otp-code">7407</span>
          </div>
          <p className="otp-expiry-note">
            <strong>Este código expirará en 15 minutos.</strong>
          </p>
          <div className="otp-info-message">
            Has recibido este email porque estás usando uno de nuestros servicios.
            Si crees que es un error, por favor ignora este mensaje o escríbenos a{" "}
            <a
              href="mailto:contacto@doctocliq.com"
              className="otp-link"
            >
              contacto@doctocliq.com
            </a>
          </div>
        </div>
        <div className="otp-footer">
          <p className="otp-footer-text">
            Servicio ofrecido por{" "}
            <a
              href="mailto:contacto@doctocliq.com"
              className="otp-link"
            >
              Doctocliq
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpCode;
