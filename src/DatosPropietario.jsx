import React, { useState, useEffect } from "react";
import "./DatosPropietario.css";
import StepHeader from "./StepHeader";

// List of countries with codes for the dropdown
const COUNTRIES = [
  { code: "+1", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "+1", name: "Canadá", flag: "🇨🇦" },
  { code: "+52", name: "México", flag: "🇲🇽" },
  { code: "+34", name: "España", flag: "🇪🇸" },
  { code: "+33", name: "Francia", flag: "🇫🇷" },
  { code: "+49", name: "Alemania", flag: "🇩🇪" },
  { code: "+39", name: "Italia", flag: "🇮🇹" },
  { code: "+44", name: "Reino Unido", flag: "🇬🇧" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+55", name: "Brasil", flag: "🇧🇷" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+51", name: "Perú", flag: "🇵🇪" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾" },
];

const DatosPropietario = ({ goTo, goHome }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    pais: "",
    telefono: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCountryList, setShowCountryList] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate individual fields
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "nombre":
        if (!value.trim()) {
          newErrors.nombre = "El nombre es requerido";
        } else if (value.trim().length < 2) {
          newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
        } else {
          delete newErrors.nombre;
        }
        break;

      case "apellidos":
        if (!value.trim()) {
          newErrors.apellidos = "Los apellidos son requeridos";
        } else if (value.trim().length < 2) {
          newErrors.apellidos =
            "Los apellidos deben tener al menos 2 caracteres";
        } else {
          delete newErrors.apellidos;
        }
        break;

      case "pais":
        if (!value) {
          newErrors.pais = "Debe seleccionar un país";
        } else {
          delete newErrors.pais;
        }
        break;

      case "telefono":
        // Remove spaces and validate 9 digits
        const cleanPhone = value.replace(/\s/g, "");
        if (!cleanPhone) {
          newErrors.telefono = "El teléfono es requerido";
        } else if (!/^\d{9}$/.test(cleanPhone)) {
          newErrors.telefono = "El teléfono debe tener exactamente 9 dígitos";
        } else {
          delete newErrors.telefono;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // Handle input changes
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Handle input blur (touched state)
  const handleInputBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Check if form is valid
  const isFormValid = () => {
    const { nombre, apellidos, pais, telefono } = formData;
    const cleanPhone = telefono.replace(/\s/g, "");

    return (
      nombre.trim().length >= 2 &&
      apellidos.trim().length >= 2 &&
      pais &&
      /^\d{9}$/.test(cleanPhone) &&
      Object.keys(errors).length === 0
    );
  };

  // Format phone number with spaces for better readability
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter((x) => x).join(" ");
    }
    return cleaned;
  };

  // Handle phone number input
  const handlePhoneChange = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 9) {
      const formatted = formatPhoneNumber(cleaned);
      handleInputChange("telefono", formatted);
    }
  };

  // Handler para el botón Siguiente del header (sin validación)
  const handleHeaderNext = () => {
    goTo("datos_negocio");
  };

  return (
    <div className="datos-propietario-container">
      <StepHeader
        currentStep={3}
        showSteps={true}
        onInicio={goHome}
        onAnterior={() => goTo && goTo("verify_mail")}
        onSiguiente={handleHeaderNext}
      />
      <div className="datos-propietario-card">
        {/* Header with title */}
        <div className="form-header">
          <h1 className="form-title">¡Personalicemos tu cuenta Doctocliq!</h1>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className="step active">
            <div className="step-circle active">
              <span className="step-number">1</span>
            </div>
            <span className="step-label active">Datos del propietario</span>
          </div>
          <div className="step-divider"></div>
          <div className="step">
            <div className="step-circle">
              <span className="step-number">2</span>
            </div>
            <span className="step-label">Datos del negocio</span>
          </div>
        </div>

        {/* Form */}
        <form className="owner-form" onSubmit={e => { e.preventDefault(); goTo("datos_negocio"); }}>
          {/* Nombre */}
          <div className="form-field">
            <label className="form-label">
              Nombre <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              className={`form-input ${errors.nombre ? "error" : ""}`}
              value={formData.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              onBlur={() => handleInputBlur("nombre")}
              placeholder="Ingresa tu nombre"
              maxLength={50}
            />
            {errors.nombre && touched.nombre && (
              <span className="error-message">{errors.nombre}</span>
            )}
          </div>

          {/* Apellidos */}
          <div className="form-field">
            <label className="form-label">
              Apellidos <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              className={`form-input ${errors.apellidos ? "error" : ""}`}
              value={formData.apellidos}
              onChange={(e) => handleInputChange("apellidos", e.target.value)}
              onBlur={() => handleInputBlur("apellidos")}
              placeholder="Ingresa tus apellidos"
              maxLength={50}
            />
            {errors.apellidos && touched.apellidos && (
              <span className="error-message">{errors.apellidos}</span>
            )}
          </div>

          {/* País */}
          <div className="form-field">
            <label className="form-label">
              País <span className="required-asterisk">*</span>
            </label>
            <div className="select-wrapper">
              <div
                className={`form-select ${errors.pais ? "error" : ""} ${showCountryList ? "open" : ""}`}
                onClick={() => setShowCountryList(!showCountryList)}
                onBlur={() => handleInputBlur("pais")}
              >
                <span
                  className={`select-text ${formData.pais ? "" : "placeholder"}`}
                >
                  {formData.pais || "Seleccione una opción"}
                </span>
                <div className="select-arrow">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path
                      d="M5 7L9.5 11.5L14 7"
                      stroke="#A1BDC8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {showCountryList && (
                <div className="country-dropdown">
                  {COUNTRIES.map((country, index) => (
                    <div
                      key={index}
                      className="country-option"
                      onClick={() => {
                        handleInputChange("pais", country.name);
                        setSelectedCountry(country);
                        setShowCountryList(false);
                      }}
                    >
                      <span className="country-flag">{country.flag}</span>
                      <span className="country-name">{country.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.pais && touched.pais && (
              <span className="error-message">{errors.pais}</span>
            )}
          </div>

          {/* Teléfono */}
          <div className="form-field">
            <label className="form-label">
              Teléfono <span className="required-asterisk">*</span>
            </label>
            <div className="phone-input-wrapper">
              <div className="country-code-select">
                <div
                  className="country-code-button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <span className="country-flag">{selectedCountry.flag}</span>
                  <span className="country-code">{selectedCountry.code}</span>
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                    <path
                      d="M1 1L4 4L7 1"
                      stroke="#A1BDC8"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {showCountryDropdown && (
                  <div className="country-code-dropdown">
                    {COUNTRIES.map((country, index) => (
                      <div
                        key={index}
                        className="country-code-option"
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountryDropdown(false);
                        }}
                      >
                        <span className="country-flag">{country.flag}</span>
                        <span className="country-code">{country.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                className={`phone-input ${errors.telefono ? "error" : ""}`}
                value={formData.telefono}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onBlur={() => handleInputBlur("telefono")}
                placeholder="123 456 789"
                maxLength={11} // 9 digits + 2 spaces
              />
            </div>
            {errors.telefono && touched.telefono && (
              <span className="error-message">{errors.telefono}</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="action-buttons">
            <button className="exit-button" onClick={goHome}>
              Salir
            </button>
            <button
              className="continue-button active"
              type="submit"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatosPropietario;
