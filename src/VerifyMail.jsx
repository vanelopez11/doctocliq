import React, { useState, useRef, useEffect } from "react";
import "./VerifyMail.css";

const VerifyMail = ({ goTo, goHome }) => {
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const email = "vanessa.lopez.test.2@gmail.com"; // This could be passed as prop

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
      <div className="verify-mail-card">
        {/* Header Section */}
        <div className="verify-header">
          <h1 className="verify-title">Verifica tu email</h1>
        </div>

        {/* Email Verification Image */}
        <div className="verification-image">
          <svg
            width="218"
            height="197"
            viewBox="0 0 218 197"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_22_708)">
              <mask
                id="mask0_22_708"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="218"
                height="197"
              >
                <path d="M218 0H0V197H218V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_22_708)">
                <path
                  opacity="0.1"
                  d="M109 192.068C160.676 192.068 202.568 150.176 202.568 98.5C202.568 46.8236 160.676 4.93158 109 4.93158C57.3236 4.93158 15.4316 46.8236 15.4316 98.5C15.4316 150.176 57.3236 192.068 109 192.068Z"
                  fill="#61D6E6"
                />
                <path
                  d="M124.994 235.654C128.412 206.606 126.972 170.611 124.976 136.805L108.28 144.959L96.6309 236.205C103.232 236.593 124.702 238.141 124.994 235.654Z"
                  fill="#FFD5CC"
                />
                <path
                  d="M102.781 148.034C102.781 148.034 106.674 102.261 117.82 109.033C128.967 115.806 126.238 142.551 126.238 142.551L102.781 148.034Z"
                  fill="#007B8E"
                />
                <path
                  d="M122.631 242.834C122.631 242.834 36.3727 279.648 42.4562 234.916C48.5397 190.185 37.6725 161.464 41.8792 106.94C49.0758 96.1462 97.1179 102.175 97.1179 102.175C98.278 102.331 99.374 102.522 100.437 102.715C105.512 103.673 111.108 102.874 118.516 109.991C125.923 117.108 120.402 206.102 122.631 242.834Z"
                  fill="#008BA1"
                />
                <path
                  d="M96.0914 86.7085L71.6672 79.1132C71.6672 79.1132 79.6077 96.156 72.0702 100.213C72.0702 100.213 86.5764 116.439 89.6849 116.382C92.7934 116.325 97.5915 102.258 97.5915 102.258C91.1831 97.4955 92.8582 92.2527 96.0914 86.7085Z"
                  fill="#FFD5CC"
                />
                <path
                  d="M96.0985 88.1254L77.1953 86.8895C80.8974 90.0845 89.5307 96.9793 94.4464 98.9983C91.813 94.9384 93.1297 90.2202 96.0985 88.1254Z"
                  fill="#F4C4BA"
                />
                <path
                  d="M112.439 56.4548C106.399 59.3296 92.9559 57.9666 101.939 31.9015C109.608 9.92784 123.69 51.1379 112.439 56.4548Z"
                  fill="#50535A"
                />
                <path
                  d="M62.7235 45.1105C63.6814 63.6855 63.2732 74.6068 72.6521 84.1785C86.7309 98.5481 109.974 90.1116 114.648 71.6054C118.863 54.9348 116.62 27.3601 98.3249 19.9256C94.2813 18.2842 89.8848 17.6849 85.5458 18.1836C81.2067 18.6824 77.0666 20.2629 73.5116 22.7777C69.9566 25.2926 67.1027 28.6597 65.2162 32.565C63.3297 36.4703 62.4722 40.7864 62.7235 45.1105Z"
                  fill="#FFD5CC"
                />
                <path
                  d="M104.874 70.3614C98.196 69.7633 94.812 69.2833 88.5135 67.8985C88.2482 67.8401 87.9888 68.0066 87.9578 68.2765C87.7398 70.1731 87.5055 77.0341 95.3137 78.1128C103.108 79.1897 104.93 72.7338 105.289 70.8879C105.341 70.6218 105.144 70.3855 104.874 70.3614Z"
                  fill="#A33A3A"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_22_708">
                <rect width="218" height="197" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
          className={`verify-button ${isCodeComplete && !isLoading ? "active" : ""}`}
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
