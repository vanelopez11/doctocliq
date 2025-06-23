import React, { useState, useEffect } from "react";
import "./OtpCode.css";
import StepHeader from "./StepHeader";

const OtpCode = ({ goTo, goHome }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleResendCode = () => {
    setTimeLeft(15 * 60);
    setIsExpired(false);
    // Here you would typically call an API to resend the code
  };

  return (
    <div className="otp-container">
      <StepHeader
        onInicio={goHome}
        onSiguiente={() => goTo("datos_propietario")}
        siguienteDisabled={isExpired}
      />

      <main className="otp-main">
        <div className="email-card">
          <div className="email-header">
            <img
              src="https://cdn.builder.io/api/v1/assets/6995cc2011664f5ea2fc48a0d3ae7681/figma-screenshot-e0e5ec?format=webp&width=800"
              alt="Doctocliq Logo"
              className="logo"
            />
          </div>

          <div className="verification-section">
            <h1 className="verification-title">
              Tu código de verificación es:
            </h1>

            <div className="code-container">
              <span className="verification-code">7407</span>
            </div>

            <div className="expiration-info">
              {!isExpired ? (
                <div className="timer-container">
                  <div className="timer-icon">⏱️</div>
                  <span className="timer-text">
                    Este código expira en:{" "}
                    <strong>{formatTime(timeLeft)}</strong>
                  </span>
                </div>
              ) : (
                <div className="expired-container">
                  <div className="expired-icon">⚠️</div>
                  <span className="expired-text">El código ha expirado</span>
                  <button onClick={handleResendCode} className="resend-button">
                    Solicitar nuevo código
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="email-footer">
            <p className="footer-text">
              Has recibido este email porque estás usando uno de nuestros
              servicios. Si crees que es un error, por favor ignora este mensaje
              o escríbenos a{" "}
              <a href="mailto:contacto@doctocliq.com" className="contact-link">
                contacto@doctocliq.com
              </a>
            </p>

            <p className="service-attribution">
              Servicio ofrecido por{" "}
              <a href="#" className="brand-link">
                Doctocliq
              </a>
            </p>
          </div>
        </div>

        <div className="actions-section">
          <div className="action-buttons">
            <button
              onClick={() => goTo("verify_mail")}
              className="action-button action-button--secondary"
            >
              ← Volver a verificar email
            </button>

            <button
              onClick={() => goTo("datos_propietario")}
              className="action-button action-button--primary"
              disabled={isExpired}
            >
              Continuar →
            </button>
          </div>

          <div className="help-section">
            <p className="help-text">
              ¿No recibiste el código?{" "}
              <button onClick={handleResendCode} className="link-button">
                Reenviar código
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OtpCode;
