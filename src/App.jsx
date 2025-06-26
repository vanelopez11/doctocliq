import { useState, useEffect } from "react";
import Home from "./Home";
import SignUp from "./SignUp";
import VerifyMail from "./VerifyMail";
import OtpCode from "./OtpCode";
import DatosPropietario from "./DatosPropietario";
import DatosNegocio from "./DatosNegocio";
import ImportModal from "./ImportModal";
import ImportSummaryModal from "./ImportSummaryModal";

const COMPONENTS = {
  sign_up: SignUp,
  verify_mail: VerifyMail,
  otp_code: OtpCode,
  datos_propietario: DatosPropietario,
  datos_negocio: DatosNegocio,
};

const ROUTES = {
  home: "/",
  sign_up: "/signup",
  verify_mail: "/verify-mail",
  otp_code: "/otp-code",
  datos_propietario: "/datos-propietario",
  datos_negocio: "/datos-negocio",
};

function getScreenFromPath(path) {
  switch (path) {
    case "/signup":
      return "sign_up";
    case "/verify-mail":
      return "verify_mail";
    case "/otp-code":
      return "otp_code";
    case "/datos-propietario":
      return "datos_propietario";
    case "/datos-negocio":
      return "datos_negocio";
    default:
      return "home";
  }
}

function App() {
  const [screen, setScreen] = useState(() =>
    getScreenFromPath(window.location.pathname),
  );
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  useEffect(() => {
    window.history.replaceState({}, "", ROUTES[screen] || "/");
  }, [screen]);

  const goTo = (name) => setScreen(name);
  const goHome = () => setScreen("home");

  // Demo functionality - add button to show modals
  const handleShowImportModal = () => setShowImportModal(true);
  const handleCloseImportModal = () => setShowImportModal(false);
  const handleShowSummaryModal = () => setShowSummaryModal(true);
  const handleCloseSummaryModal = () => setShowSummaryModal(false);

  // Summary modal actions
  const handleImportValid = () => {
    console.log("Importing valid records...");
    handleCloseSummaryModal();
  };

  const handleReviewErrors = () => {
    console.log("Reviewing errors...");
    handleCloseSummaryModal();
  };

  const handleDownloadReport = () => {
    console.log("Downloading error report...");
  };

  if (screen === "home") {
    return (
      <>
        <Home goTo={goTo} />
        {/* Demo buttons to show modals */}
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <button
            onClick={handleShowImportModal}
            style={{
              background: "#008BA1",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontFamily: "Nunito, sans-serif",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            Importar Pacientes
          </button>
          <button
            onClick={handleShowSummaryModal}
            style={{
              background: "#22C55E",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontFamily: "Nunito, sans-serif",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            Ver Resumen
          </button>
        </div>
        <ImportModal
          isOpen={showImportModal}
          onClose={handleCloseImportModal}
          fileName="pacientes_enero_2024.xlsx"
          totalRecords={150}
        />
        <ImportSummaryModal
          isOpen={showSummaryModal}
          onClose={handleCloseSummaryModal}
          onImportValid={handleImportValid}
          onReviewErrors={handleReviewErrors}
          onDownloadReport={handleDownloadReport}
          validRecords={80}
          totalRecords={100}
          duplicateRecords={8}
          invalidFields={6}
          existingDifferent={6}
        />
      </>
    );
  }
  const Current = COMPONENTS[screen] || Home;
  return (
    <>
      <Current goTo={goTo} goHome={goHome} />
      <ImportModal
        isOpen={showImportModal}
        onClose={handleCloseImportModal}
        fileName="pacientes_enero_2024.xlsx"
        totalRecords={150}
      />
      <ImportSummaryModal
        isOpen={showSummaryModal}
        onClose={handleCloseSummaryModal}
        onImportValid={handleImportValid}
        onReviewErrors={handleReviewErrors}
        onDownloadReport={handleDownloadReport}
        validRecords={80}
        totalRecords={100}
        duplicateRecords={8}
        invalidFields={6}
        existingDifferent={6}
      />
    </>
  );
}

export default App;
