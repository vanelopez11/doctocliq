import React from "react";
import "./StepHeader.css";

const steps = [
  { number: 1, label: "Cuenta" },
  { number: 2, label: "Verificación" },
  { number: 3, label: "Datos" },
  { number: 4, label: "Negocio" },
];

const StepHeader = ({
  currentStep,
  showSteps = false,
  onInicio,
  onAnterior, // Nuevo prop para retroceder
  onSiguiente,
  siguienteDisabled = false,
  anteriorDisabled = false, // Nuevo prop para deshabilitar el botón anterior
}) => (
  <div className="step-header-container">
    <button onClick={onInicio} className="nav-button nav-button--back">
      Inicio
    </button>
    {showSteps && (
      <div className="step-indicator">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className={`step-item${currentStep === step.number ? " active" : ""}`}>
              <div className="step-number">{step.number}</div>
              <div className="step-label">{step.label}</div>
            </div>
            {idx < steps.length - 1 && <div className="step-divider"></div>}
          </React.Fragment>
        ))}
      </div>
    )}
    {/* Agrupar Anterior y Siguiente a la derecha */}
    <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
      <button
        onClick={onAnterior}
        className="nav-button nav-button--anterior"
        disabled={anteriorDisabled}
      >
        Anterior
      </button>
      <button
        onClick={onSiguiente}
        className="nav-button nav-button--next"
        disabled={siguienteDisabled}
      >
        Siguiente
      </button>
    </div>
  </div>
);

export default StepHeader;
