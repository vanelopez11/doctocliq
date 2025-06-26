import React, { useState, useEffect, useRef } from "react";
import "./ImportModal.css";

const ImportModal = ({
  isOpen,
  onClose,
  fileName = "pacientes.xlsx",
  totalRecords = 100,
}) => {
  const [progress, setProgress] = useState(0);
  const [validatedRecords, setValidatedRecords] = useState(0);
  const [isValidating, setIsValidating] = useState(true);
  const modalRef = useRef(null);
  const cancelButtonRef = useRef(null);

  // Simulate validation progress
  useEffect(() => {
    if (!isOpen || !isValidating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5;
        const recordsValidated = Math.floor((newProgress / 100) * totalRecords);
        setValidatedRecords(recordsValidated);

        if (newProgress >= 100) {
          setIsValidating(false);
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isOpen, isValidating, totalRecords]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the modal when it opens
      setTimeout(() => {
        cancelButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCancel = () => {
    setProgress(0);
    setValidatedRecords(0);
    setIsValidating(true);
    onClose();
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="import-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="import-modal" ref={modalRef} role="document">
        {/* Header */}
        <div className="import-modal-header">
          <h2 id="modal-title" className="import-modal-title">
            Importar datos de pacientes
          </h2>
          <button
            className="import-modal-close"
            onClick={handleCancel}
            aria-label="Cerrar modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="import-modal-content">
          {/* File Upload Indicator */}
          <div className="file-upload-section">
            <div className="file-upload-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect
                  x="8"
                  y="6"
                  width="32"
                  height="36"
                  rx="2"
                  fill="#E8F8FA"
                  stroke="#008BA1"
                  strokeWidth="2"
                />
                <path
                  d="M16 18H32M16 24H32M16 30H24"
                  stroke="#008BA1"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M28 28L32 32L36 28"
                  stroke="#008BA1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="file-upload-info">
              <h3 className="file-name">{fileName}</h3>
              <p className="file-status">Archivo Excel subido correctamente</p>
            </div>
            <div className="file-upload-success">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#22C55E" />
                <path
                  d="M6 10L8.5 12.5L14 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Validation Progress */}
          <div className="validation-section">
            <div className="validation-header">
              <h4 className="validation-title">
                {isValidating
                  ? "Validación en progreso"
                  : "Validación completada"}
              </h4>
              <span className="validation-count">
                {validatedRecords} de {totalRecords} registros
              </span>
            </div>

            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="progress-percentage">
                {Math.round(progress)}%
              </span>
            </div>

            <p className="validation-message">
              {isValidating
                ? `Validando ${totalRecords} registros de pacientes...`
                : `Se validaron exitosamente ${totalRecords} registros de pacientes`}
            </p>

            {!isValidating && (
              <div className="validation-results">
                <div className="result-item success">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#22C55E" />
                    <path
                      d="M5 8L7 10L11 6"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{totalRecords} registros válidos</span>
                </div>
                <div className="result-item info">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#008BA1" />
                    <path
                      d="M8 4V8M8 12H8.01"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>0 registros con advertencias</span>
                </div>
                <div className="result-item error">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#EF4444" />
                    <path
                      d="M8 4V8M8 12H8.01"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>0 registros con errores</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="import-modal-footer">
          <button
            ref={cancelButtonRef}
            className="cancel-button"
            onClick={handleCancel}
          >
            {isValidating ? "Cancelar validación" : "Cerrar"}
          </button>
          {!isValidating && (
            <button className="import-button">Importar pacientes</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
