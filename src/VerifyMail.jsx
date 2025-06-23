import React, { useState, useRef, useEffect } from "react";
import "./VerifyMail.css";
import StepHeader from "./StepHeader";
import mailImg from "./assets/mail.png";

const VerifyMail = ({
  goTo,
  goHome,
  email = "vanessa.lopez.test.2@gmail.com",
}) => {
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // Auto-focus on first input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Auto-submit when all 4 digits are entered
  useEffect(() => {
    if (otpCode.every((digit) => digit !== "") && !isLoading) {
      handleVerifyCode();
    }
  }, [otpCode, isLoading]);

  const handleInputChange = (index, value) => {
    // Only allow single digits
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtpCode = [...otpCode];
    newOtpCode[index] = value;
    setOtpCode(newOtpCode);
    setError("");

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otpCode[index] && index > 0) {
        // If current input is empty, move to previous input
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtpCode = [...otpCode];
        newOtpCode[index] = "";
        setOtpCode(newOtpCode);
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    // Only process if it's exactly 4 digits
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtpCode(digits);
      // Focus on last input
      inputRefs.current[3]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const codeString = otpCode.join("");

      // Simulate validation (replace with actual API call)
      // For demo purposes, accept any 4-digit code, but in production this would validate against the sent code
      if (codeString.length === 4 && /^\d{4}$/.test(codeString)) {
        // Success - navigate to next step
        goTo("datos_propietario");
      } else {
        setError("Código incorrecto. Intenta nuevamente.");
        // Clear the code and focus first input
        setOtpCode(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError("Error al verificar el código. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // Simulate API call for resending code
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear current code and reset state
      setOtpCode(["", "", "", ""]);
      setError("");
      inputRefs.current[0]?.focus();

      // You could show a success message here
      console.log("Código reenviado");
    } catch (err) {
      setError("Error al reenviar el código.");
    }
  };

  const isCodeComplete = otpCode.every((digit) => digit !== "");

  return (
    <div className="verify-mail-container">
      <StepHeader
        currentStep={2}
        showSteps={true}
        onInicio={goHome}
        onAnterior={() => goTo && goTo("otp_code")}
        onSiguiente={() => goTo("datos_propietario")}
      />
      <div className="verify-mail-card">
        {/* Header Section */}
        <div className="verify-header">
          <h1 className="verify-title">Verifica tu email</h1>
        </div>

        {/* Email Verification Image */}
        <div className="verification-image">
          <img
            src={mailImg}
            alt="Correo enviado"
            style={{
              width: 400,
              height: 163,
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Description Text */}
        <div className="description-text">
          <p>Hemos enviado un código de 4 dígitos a</p>
          <p className="email-text">{email}.</p>
        </div>

        {/* OTP Form */}
        <div className="otp-form">
          <label className="form-label">Ingresa el código</label>

          <div className="otp-inputs">
            {otpCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`otp-input ${error ? "error" : ""}`}
                disabled={isLoading}
                aria-label={`Dígito ${index + 1} del código de verificación`}
              />
            ))}
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="resend-section">
            <span className="resend-text">¿Tienes problemas? </span>
            <button
              className="resend-link"
              onClick={handleResendCode}
              disabled={isLoading}
            >
              Reenviar código
            </button>
          </div>
        </div>

        {/* Verify Button */}
        <button
          className={`verify-button ${
            isCodeComplete && !isLoading ? "active" : ""
          }`}
          onClick={handleVerifyCode}
          disabled={!isCodeComplete || isLoading}
        >
          {isLoading ? (
            <span className="loading-content">
              <svg
                className="loading-spinner"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="28.27"
                  strokeDashoffset="28.27"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="28.27;0;28.27"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
              Verificando...
            </span>
          ) : (
            "Verificar"
          )}
        </button>

        {/* Back to Email Link */}
        <div className="back-to-email">
          <span className="mail-icon">✉</span>
          <button
            className="back-link"
            onClick={() => goTo("sign_up")}
            disabled={isLoading}
          >
            Volver a ingresar mi correo
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
