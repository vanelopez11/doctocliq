import React, { useEffect, useRef } from "react";
import "./ImportSummaryModal.css";

const ImportSummaryModal = ({
  isOpen,
  onClose,
  onImportValid,
  onReviewErrors,
  onDownloadReport,
  validRecords = 80,
  totalRecords = 100,
  duplicateRecords = 8,
  invalidFields = 6,
  existingDifferent = 6,
}) => {
  const modalRef = useRef(null);
  const importButtonRef = useRef(null);

  const problemRecords = totalRecords - validRecords;

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the import button when modal opens
      setTimeout(() => {
        importButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

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

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="import-summary-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-modal-title"
    >
      <div className="import-summary-modal" ref={modalRef} role="document">
        {/* Header */}
        <div className="import-summary-header">
          <h2 id="summary-modal-title" className="import-summary-title">
            Resumen de importación
          </h2>
          <button
            className="import-summary-close"
            onClick={onClose}
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
        <div className="import-summary-content">
          {/* Summary Stats */}
          <div className="summary-stats">
            <div className="stat-card total">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect
                    x="4"
                    y="4"
                    width="24"
                    height="24"
                    rx="2"
                    fill="#E8F8FA"
                    stroke="#008BA1"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 16H22M10 12H22M10 20H18"
                    stroke="#008BA1"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-number">{totalRecords}</span>
                <span className="stat-label">Pacientes procesados</span>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-card success">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="#DCFCE7"
                    stroke="#22C55E"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 16L14 20L22 12"
                    stroke="#22C55E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-number">{validRecords}</span>
                <span className="stat-label">Registros válidos</span>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-card error">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="#FEF2F2"
                    stroke="#EF4444"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 12L20 20M20 12L12 20"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-number">{problemRecords}</span>
                <span className="stat-label">Con problemas</span>
              </div>
            </div>
          </div>

          {/* Problems Breakdown */}
          <div className="problems-section">
            <h3 className="problems-title">Desglose de problemas</h3>
            <div className="problems-list">
              <div className="problem-item">
                <div className="problem-icon duplicate">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="10"
                      height="10"
                      rx="1"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="7"
                      y="7"
                      width="10"
                      height="10"
                      rx="1"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="problem-details">
                  <span className="problem-count">{duplicateRecords}</span>
                  <span className="problem-description">
                    registros duplicados
                  </span>
                </div>
              </div>

              <div className="problem-item">
                <div className="problem-icon invalid">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 6V10M10 14H10.01"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="problem-details">
                  <span className="problem-count">{invalidFields}</span>
                  <span className="problem-description">
                    con campos inválidos o faltantes
                  </span>
                </div>
              </div>

              <div className="problem-item">
                <div className="problem-icon existing">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 10L9 12L13 8"
                      stroke="#8B5CF6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 14L16 16"
                      stroke="#8B5CF6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="problem-details">
                  <span className="problem-count">{existingDifferent}</span>
                  <span className="problem-description">
                    que ya existen con datos diferentes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="import-summary-actions">
          <button
            ref={importButtonRef}
            className="action-button primary"
            onClick={onImportValid}
          >
            <div className="button-content">
              <div className="button-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2V18M18 10H2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="button-text">
                <span className="button-title">
                  Importar {validRecords} registros válidos
                </span>
                <span className="button-subtitle">
                  Agregar pacientes sin problemas
                </span>
              </div>
            </div>
          </button>

          <button className="action-button secondary" onClick={onReviewErrors}>
            <div className="button-content">
              <div className="button-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M2 3H5L7 13H17L19 5H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9"
                    cy="17"
                    r="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="15"
                    cy="17"
                    r="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="button-text">
                <span className="button-title">Revisar y corregir errores</span>
                <span className="button-subtitle">
                  {problemRecords} registros requieren atención
                </span>
              </div>
            </div>
          </button>

          <button className="action-button tertiary" onClick={onDownloadReport}>
            <div className="button-content">
              <div className="button-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 12V2M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 16V17C2 17.5304 2.21071 18.0391 2.58579 18.4142C2.96086 18.7893 3.46957 19 4 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="button-text">
                <span className="button-title">
                  Descargar reporte de errores
                </span>
                <span className="button-subtitle">
                  Archivo Excel con detalles de problemas
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportSummaryModal;
