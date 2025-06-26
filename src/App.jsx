import { useState, useEffect } from "react";
import Home from "./Home";
import SignUp from "./SignUp";
import VerifyMail from "./VerifyMail";
import OtpCode from "./OtpCode";
import DatosPropietario from "./DatosPropietario";
import DatosNegocio from "./DatosNegocio";
import ImportModal from "./ImportModal";

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

  useEffect(() => {
    window.history.replaceState({}, "", ROUTES[screen] || "/");
  }, [screen]);

  const goTo = (name) => setScreen(name);
  const goHome = () => setScreen("home");

  // Demo functionality - add button to show modal
  const handleShowImportModal = () => setShowImportModal(true);
  const handleCloseImportModal = () => setShowImportModal(false);

  if (screen === "home") {
    return (
      <>
        <Home goTo={goTo} />
        {/* Demo button to show import modal */}
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 999,
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
        </div>
        <ImportModal
          isOpen={showImportModal}
          onClose={handleCloseImportModal}
          fileName="pacientes_enero_2024.xlsx"
          totalRecords={150}
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
    </>
  );
}

export default App;
