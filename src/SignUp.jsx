import React, { useState } from "react";
import "./SignUp.css";
import StepHeader from "./StepHeader";
import logo from "./assets/logo-doctocliq-light.webp";

const SignUp = ({ goTo, goHome }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Referencia al formulario para poder hacer submit desde el header
  const formRef = React.useRef();

  // Validaciones de contraseña
  const validatePassword = (password) => {
    const validations = {
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const passedCount = Object.values(validations).filter(Boolean).length - 1; // Exclude minLength
    validations.hasThreeRequirements = passedCount >= 3;

    return validations;
  };

  const passwordValidations = validatePassword(password);

  // Verificar si el formulario está completo
  const isFormComplete =
    email.length > 0 &&
    passwordValidations.minLength &&
    passwordValidations.hasThreeRequirements;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      goTo("otp_code");
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Iniciando sesión con ${provider}`);
    // Aquí iría la lógica de autenticación social
  };

  // Handler para el botón Siguiente del header (sin validación)
  const handleHeaderNext = () => {
    goTo("otp_code");
  };

  return (
    <div className="signup-container" style={{ background: '#f8f9fa' }}>
      {/* Header con navegación y pasos */}
      <StepHeader
        currentStep={1}
        showSteps={true}
        onInicio={goHome}
        onAnterior={() => goTo && goTo("home")}
        onSiguiente={handleHeaderNext}
      />

      <div className="signup-card">
        <div className="signup-header">
          <div className="doctocliq-logo">
            <img
              src={logo}
              alt="Doctocliq"
              style={{
                width: 120,
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
          <h1 className="welcome-title">Welcome</h1>
          <p className="signup-subtitle">Sign Up to Doctocliq</p>
        </div>

        {/* Botones sociales primero */}
        <div className="social-section">
          <div className="social-title">Continuar con</div>
          <div className="social-buttons">
            <button
              className="social-button"
              onClick={() => handleSocialLogin("Google")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.07 1.53 7.47 2.81l5.54-5.39C33.64 3.54 29.2 1.5 24 1.5 14.82 1.5 6.98 7.6 3.69 15.44l6.44 5.01C12.1 14.13 17.57 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.21-.42-4.73H24v9.18h12.42c-.54 2.9-2.18 5.36-4.66 7.02l7.18 5.58C43.98 37.13 46.1 31.36 46.1 24.55z"/>
                  <path fill="#FBBC05" d="M10.13 28.45a14.5 14.5 0 0 1 0-8.9l-6.44-5.01A23.97 23.97 0 0 0 0 24c0 3.82.92 7.44 2.54 10.46l7.59-6.01z"/>
                  <path fill="#EA4335" d="M24 46.5c6.48 0 11.92-2.14 15.89-5.84l-7.18-5.58c-2 1.36-4.56 2.17-8.71 2.17-6.43 0-11.9-4.63-13.87-10.95l-7.59 6.01C6.98 40.4 14.82 46.5 24 46.5z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </g>
              </svg>
              Google
            </button>

            <button
              className="social-button"
              onClick={() => handleSocialLogin("Apple")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9406 15.3235C17.6524 15.9894 17.3112 16.6024 16.9159 17.1659C16.3771 17.9341 15.9359 18.4659 15.5959 18.7612C15.0688 19.2459 14.5041 19.4941 13.8994 19.5082C13.4653 19.5082 12.9418 19.3847 12.3324 19.1341C11.7209 18.8847 11.1591 18.7612 10.6453 18.7612C10.1065 18.7612 9.52859 18.8847 8.91047 19.1341C8.29141 19.3847 7.79271 19.5153 7.41141 19.5282C6.83153 19.5529 6.25353 19.2977 5.67659 18.7612C5.30835 18.44 4.84776 17.8894 4.296 17.1094C3.704 16.2765 3.21729 15.3106 2.836 14.2094C2.42765 13.02 2.22294 11.8682 2.22294 10.7532C2.22294 9.47589 2.49894 8.37424 3.05176 7.45106C3.48623 6.70953 4.06423 6.12459 4.78765 5.69518C5.51106 5.26577 6.29271 5.04694 7.13447 5.03294C7.59506 5.03294 8.19906 5.17542 8.94965 5.45542C9.69812 5.73636 10.1787 5.87883 10.3894 5.87883C10.5469 5.87883 11.0808 5.71224 11.9859 5.38012C12.8418 5.07212 13.5641 4.94459 14.1559 4.99483C15.7594 5.12424 16.9641 5.75636 17.7653 6.89518C16.3312 7.76412 15.6218 8.98118 15.6359 10.5425C15.6488 11.7586 16.09 12.7706 16.9571 13.5741C17.35 13.9471 17.7888 14.2353 18.2771 14.44C18.1712 14.7471 18.0594 15.0412 17.9406 15.3235ZM14.2629 0.851768C14.2629 1.80494 13.9147 2.69494 13.2206 3.51871C12.3829 4.498 11.3698 5.06389 10.2711 4.97459C10.2563 4.85476 10.249 4.73415 10.2489 4.61342C10.2489 3.69836 10.6473 2.71906 11.3547 1.91836C11.7079 1.51294 12.1571 1.17589 12.7018 0.906945C13.2453 0.642004 13.7594 0.495533 14.2429 0.470474C14.2571 0.597886 14.2629 0.725415 14.2629 0.851768Z"
                  fill="black"
                />
              </svg>
              Apple
            </button>
          </div>
        </div>

        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">O</span>
          <span className="divider-line"></span>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} ref={formRef}>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder=" "
                required
              />
              <label className="floating-label">Email address*</label>
            </div>
          </div>

          <div className="form-group">
            <div
              className="input-wrapper password-wrapper"
              onMouseEnter={() => setShowPasswordTooltip(true)}
              onMouseLeave={() => setShowPasswordTooltip(false)}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder=" "
                required
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <label className="floating-label">Password*</label>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                <svg
                  width="18"
                  height="13"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.25 12.5C12.38 12.5 14.982 10.712 17.106 7C14.982 3.288 12.38 1.5 9.25 1.5C6.12 1.5 3.518 3.288 1.394 7C3.518 10.712 6.12 12.5 9.25 12.5ZM9.25 0.5C12.917 0.5 15.917 2.667 18.25 7C15.917 11.333 12.917 13.5 9.25 13.5C5.583 13.5 2.583 11.333 0.25 7C2.583 2.667 5.583 0.5 9.25 0.5ZM9.25 9.5C9.91304 9.5 10.5489 9.23661 11.0178 8.76777C11.4866 8.29893 11.75 7.66304 11.75 7C11.75 6.33696 11.4866 5.70107 11.0178 5.23223C10.5489 4.76339 9.91304 4.5 9.25 4.5C8.58696 4.5 7.95107 4.76339 7.48223 5.23223C7.01339 5.70107 6.75 6.33696 6.75 7C6.75 7.66304 7.01339 8.29893 7.48223 8.76777C7.95107 9.23661 8.58696 9.5 9.25 9.5V9.5ZM9.25 10.5C8.79037 10.5 8.33525 10.4095 7.91061 10.2336C7.48597 10.0577 7.10013 9.79988 6.77513 9.47487C6.45012 9.14987 6.19231 8.76403 6.01642 8.33939C5.84053 7.91475 5.75 7.45963 5.75 7C5.75 6.54037 5.84053 6.08525 6.01642 5.66061C6.19231 5.23597 6.45012 4.85013 6.77513 4.52513C7.10013 4.20012 7.48597 3.94231 7.91061 3.76642C8.33525 3.59053 8.79037 3.5 9.25 3.5C10.1783 3.5 11.0685 3.86875 11.7249 4.52513C12.3813 5.1815 12.75 6.07174 12.75 7C12.75 7.92826 12.3813 8.8185 11.7249 9.47487C11.0685 10.1313 10.1783 10.5 9.25 10.5Z"
                    fill="#5C677D"
                  />
                </svg>
              </button>

              {/* Tooltip de validación de contraseña */}
              {/* Desktop/floating */}
              <div className="password-tooltip-helper">
                {(passwordFocused || showPasswordTooltip) && password.length > 0 && (
                  <div className="password-tooltip">
                    <div className="tooltip-content">
                      <p className="tooltip-title">
                        Tu contraseña debe contener:
                      </p>
                      <ul className="tooltip-list">
                        <li
                          className={
                            passwordValidations.minLength ? "valid" : "invalid"
                          }
                        >
                          <span className="checkmark">✓</span>
                          Al menos 8 caracteres
                        </li>
                        <li
                          className={
                            passwordValidations.hasThreeRequirements
                              ? "valid"
                              : "invalid"
                          }
                        >
                          <span className="checkmark">✓</span>
                          Al menos 3 de los siguientes:
                        </li>
                        <ul className="sub-tooltip-list">
                          <li
                            className={
                              passwordValidations.hasLowercase
                                ? "valid"
                                : "invalid"
                            }
                          >
                            <span className="checkmark">✓</span>
                            Minúsculas (a-z)
                          </li>
                          <li
                            className={
                              passwordValidations.hasUppercase
                                ? "valid"
                                : "invalid"
                            }
                          >
                            <span className="checkmark">✓</span>
                            Mayúsculas (A-Z)
                          </li>
                          <li
                            className={
                              passwordValidations.hasNumbers ? "valid" : "invalid"
                            }
                          >
                            <span className="checkmark">✓</span>
                            Números (0-9)
                          </li>
                          <li
                            className={
                              passwordValidations.hasSpecialChars
                                ? "valid"
                                : "invalid"
                            }
                          >
                            <span className="checkmark">✓</span>
                            Caracteres especiales (!@#$%^&*)
                          </li>
                        </ul>
                      </ul>
                    </div>
                  </div>
                )}
                {/* Mobile/bloque */}
                <div className="password-helper-mobile">
                  {password.length > 0 && (
                    <div className="tooltip-content">
                      <p className="tooltip-title">
                        Tu contraseña debe contener:
                      </p>
                      <ul className="tooltip-list">
                        <li
                          className={
                            passwordValidations.minLength ? "valid" : "invalid"
                          }
                        >
                          <span className="checkmark">✓</span>
                          Al menos 8 caracteres
                        </li>
                        <li
                          className={
                            passwordValidations.hasThreeRequirements
                              ? "valid"
                              : "invalid"
                          }
                        >
                          <span className="checkmark">✓</span>
                          Al menos 3 de los siguientes:
                        </li>
                        <ul className="sub-tooltip-list">
                          <li
                            className={
                              passwordValidations.hasLowercase
                                ? "valid"
                                : "invalid"
                            }
                          >
                            <span className="checkmark">✓</span>
                            Minúsculas (a-z)
                          </li>
                          <li
                            className={
                              passwordValidations.hasUppercase
                                ? "valid"
                                : "invalid"
                            }
                          >
                            <span className="checkmark">✓</span>
                            Mayúsculas (A-Z)
                          </li>
                          <li
                            className={
                              passwordValidations.hasNumbers ? "valid" : "invalid"
                            }
                          >
                            <span className="checkmark">✓</span>
                            Números (0-9)
                          </li>
                          <li
                            className={
                              passwordValidations.hasSpecialChars
                                ? "valid"
                                : "invalid"
                            }
                          >
                            <span className="checkmark">✓</span>
                            Caracteres especiales (!@#$%^&*)
                          </li>
                        </ul>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`continue-button ${isFormComplete ? "active" : ""}`}
            style={{ display: 'block', margin: '32px auto 0', minWidth: 180 }}
          >
            Continuar
          </button>
        </form>

        <div className="login-link">
          <span>¿Ya tienes una cuenta? </span>
          <button className="link-button" onClick={() => goTo("login")}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
