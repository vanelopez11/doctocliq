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
  onSiguiente,
  siguienteDisabled = false, // Mantenemos el parámetro para compatibilidad pero lo ignoramos
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
    <button
      onClick={onSiguiente}
      className="nav-button nav-button--next"
    >
      Siguiente
    </button>
  </div>
);

export default StepHeader;
