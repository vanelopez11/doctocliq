import React, { useState } from "react";
import "./DatosNegocio.css";
import StepHeader from "./StepHeader";

const tiposNegocio = [
  "Odontologia",
  "Medicina General",
  "Pediatría",
  "Dermatología",
  "Otro",
];

const doctoresPrincipales = [
  "Soy 1",
  "Somos 2",
  "Somos 3+",
];

const DatosNegocio = ({ goTo, goHome }) => {
  const [nombreComercial, setNombreComercial] = useState("");
  const [tipoNegocio, setTipoNegocio] = useState("");
  const [numDoctores, setNumDoctores] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [membresia, setMembresia] = useState("7dias"); // "7dias" o "3meses"

  // Validación simple
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case "nombreComercial":
        if (!value.trim()) {
          newErrors.nombreComercial = "El nombre comercial es requerido";
        } else {
          delete newErrors.nombreComercial;
        }
        break;
      case "tipoNegocio":
        if (!value) {
          newErrors.tipoNegocio = "Debe seleccionar un tipo de negocio";
        } else {
          delete newErrors.tipoNegocio;
        }
        break;
      case "numDoctores":
        if (!value) {
          newErrors.numDoctores = "Debe seleccionar una opción";
        } else {
          delete newErrors.numDoctores;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleInputChange = (name, value) => {
    if (name === "nombreComercial") setNombreComercial(value);
    if (name === "tipoNegocio") setTipoNegocio(value);
    if (name === "numDoctores") setNumDoctores(value);
    if (touched[name]) validateField(name, value);
  };

  const handleInputBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    let value = "";
    if (name === "nombreComercial") value = nombreComercial;
    if (name === "tipoNegocio") value = tipoNegocio;
    if (name === "numDoctores") value = numDoctores;
    validateField(name, value);
  };

  const isFormValid = () => {
    return (
      nombreComercial.trim() &&
      tipoNegocio &&
      numDoctores &&
      aceptaTerminos &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div className="datos-negocio-container">
      <StepHeader
        currentStep={4}
        showSteps={true}
        onInicio={goHome}
        onAnterior={() => goTo && goTo("datos_propietario")}
        onSiguiente={() => goTo && goTo("home")}
        siguienteDisabled={!isFormValid()}
        anteriorDisabled={false}
      />
      <div className="datos-negocio-card">
        {/* Header with title */}
        <div className="form-header">
          <h1 className="form-title">¡Personalicemos tu cuenta Doctocliq!</h1>
        </div>
        {/* Progress Steps */}
        <div className="progress-steps">
          <div className="step">
            <div className="step-circle">
              <span>1</span>
            </div>
            <span className="step-label">Datos del propietario</span>
          </div>
          <div className="step-divider"></div>
          <div className="step active">
            <div className="step-circle active">
              <span style={{ color: 'white' }}>2</span>
            </div>
            <span className="step-label active">Datos del negocio</span>
          </div>
        </div>
        {/* Formulario */}
        <form className="business-form" onSubmit={e => { e.preventDefault(); if (isFormValid()) goTo("home"); }}>
          {/* Nombre comercial */}
          <div className="form-field">
            <label className="form-label">
              Nombre comercial <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              className={`form-input${errors.nombreComercial ? " error" : ""}`}
              value={nombreComercial}
              onChange={e => handleInputChange("nombreComercial", e.target.value)}
              onBlur={() => handleInputBlur("nombreComercial")}
              placeholder="Ej: Clínica Dental Sonrisa"
              maxLength={50}
              required
            />
            {errors.nombreComercial && touched.nombreComercial && (
              <span className="error-message">{errors.nombreComercial}</span>
            )}
          </div>
          {/* Tipo de negocio */}
          <div className="form-field">
            <label className="form-label">
              Tipo de negocio <span className="required-asterisk">*</span>
            </label>
            <select
              className={`form-select${errors.tipoNegocio ? " error" : ""}`}
              value={tipoNegocio}
              onChange={e => handleInputChange("tipoNegocio", e.target.value)}
              onBlur={() => handleInputBlur("tipoNegocio")}
              required
            >
              <option value="">Seleccione una opción</option>
              {tiposNegocio.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            {errors.tipoNegocio && touched.tipoNegocio && (
              <span className="error-message">{errors.tipoNegocio}</span>
            )}
          </div>
          {/* Nº doctores principales */}
          <div className="form-field">
            <label className="form-label">
              Nº doctores principales <span className="required-asterisk">*</span>
            </label>
            <select
              className={`form-select${errors.numDoctores ? " error" : ""}`}
              value={numDoctores}
              onChange={e => handleInputChange("numDoctores", e.target.value)}
              onBlur={() => handleInputBlur("numDoctores")}
              required
            >
              <option value="">Seleccione una opción</option>
              {doctoresPrincipales.map(op => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
            {errors.numDoctores && touched.numDoctores && (
              <span className="error-message">{errors.numDoctores}</span>
            )}
          </div>
          {/* Membresía */}
          <div className="membresia-section">
            <label className="form-label" style={{ marginBottom: 8 }}>
              Elige tu membresía:
            </label>
            <div className="membresia-options" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 16 }}>
              <div
                className={`membresia-card${membresia === "7dias" ? " selected" : ""}`}
                style={{
                  border: membresia === "7dias" ? '2px solid #0097a9' : '1px solid #ccc',
                  background: membresia === "7dias" ? '#e6fafd' : '#fff',
                  borderRadius: 10,
                  padding: '16px 24px',
                  cursor: 'pointer',
                  minWidth: 200,
                  minHeight: 70,
                  position: 'relative',
                  boxShadow: membresia === "7dias" ? '0 2px 8px #0097a91a' : 'none',
                  transition: 'border 0.2s, background 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
                onClick={() => setMembresia("7dias")}
              >
                <span style={{
                  width: 22,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 18,
                  color: membresia === "7dias" ? '#0097a9' : 'transparent',
                  marginRight: 4
                }}>✔</span>
                <div>
                  <div style={{ fontWeight: 600 }}>7 días gratis</div>
                  <div style={{ fontSize: 13, color: '#666' }}>Sin costo inicial</div>
                </div>
              </div>
              <div
                className={`membresia-card${membresia === "3meses" ? " selected" : ""}`}
                style={{
                  border: membresia === "3meses" ? '2px solid #0097a9' : '1px solid #ccc',
                  background: membresia === "3meses" ? '#e6fafd' : '#fff',
                  borderRadius: 10,
                  padding: '16px 24px',
                  cursor: 'pointer',
                  minWidth: 200,
                  minHeight: 70,
                  position: 'relative',
                  boxShadow: membresia === "3meses" ? '0 2px 8px #0097a91a' : 'none',
                  transition: 'border 0.2s, background 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
                onClick={() => setMembresia("3meses")}
              >
                <span style={{
                  width: 22,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 18,
                  color: membresia === "3meses" ? '#0097a9' : 'transparent',
                  marginRight: 4
                }}>✔</span>
                <div>
                  <div style={{ fontWeight: 600 }}>3 meses con 70% dscto.</div>
                  <div style={{ fontSize: 13, color: '#666' }}>Ahorra en tu primer pago</div>
                </div>
              </div>
            </div>
          </div>
          {/* Terms and conditions */}
          <div className="terms-section">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, justifyContent: 'center' }}>
              <input type="checkbox" checked={aceptaTerminos} onChange={e => setAceptaTerminos(e.target.checked)} style={{ accentColor: '#0097a9' }} />
              <span className="terms-text">
                Acepto los <a href="#" className="terms-link">términos y condiciones</a> y <a href="#" className="terms-link">política de privacidad</a>
              </span>
            </label>
          </div>
          {/* Botón Volver y Terminar */}
          <div className="action-buttons">
            <button
              className="back-button"
              type="button"
              onClick={() => goTo && goTo("datos_propietario")}
            >
              Volver
            </button>
            <button
              className={`finish-button${isFormValid() ? " active" : ""}`}
              type="submit"
              disabled={!isFormValid()}
            >
              Terminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatosNegocio;
