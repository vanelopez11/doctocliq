import React, { useState } from "react";

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
  const [nombreComercial, setNombreComercial] = useState("Dra. Vanessa Lopez");
  const [tipoNegocio, setTipoNegocio] = useState(tiposNegocio[0]);
  const [numDoctores, setNumDoctores] = useState(doctoresPrincipales[1]);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f7fafd"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        padding: 32,
        minWidth: 350,
        maxWidth: 400,
        width: "100%",
        position: "relative"
      }}>
        {/* Header con botones */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}>
          <button
            onClick={goHome}
            style={{
              background: "none",
              border: "none",
              color: "#0097a9",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            Inicio
          </button>
          <button
            onClick={() => goTo && goTo("home")}
            style={{
              background: "none",
              border: "none",
              color: "transparent",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "default"
            }}
            tabIndex={-1}
            aria-hidden="true"
          >
            {/* Espacio para alinear */}
            Siguiente
          </button>
        </header>

        {/* Bloques de oferta y ayuda */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <div style={{ flex: 1, background: '#e0f7fa', color: '#0097a9', borderRadius: 8, padding: 12, fontWeight: 600, textAlign: 'center', fontSize: 15 }}>
            Oferta 70% dscto x lanzamiento
          </div>
          <div style={{ flex: 1, background: '#f3e5f5', color: '#7c4dff', borderRadius: 8, padding: 12, fontWeight: 600, textAlign: 'center', fontSize: 15 }}>
            ¿Necesitas ayuda?
          </div>
        </div>

        {/* Progreso */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}>
          <span style={{
            color: "#0097a9",
            fontWeight: "bold",
            fontSize: 18,
            marginRight: 8,
          }}>✓</span>
          <span style={{
            color: "#0097a9",
            fontWeight: "bold",
            fontSize: 16,
          }}>Datos del propietario</span>
          <span style={{
            margin: "0 8px",
            color: "#bdbdbd",
            fontWeight: "bold",
            fontSize: 18,
          }}>——</span>
          <span style={{
            color: "#0097a9",
            fontWeight: "bold",
            fontSize: 16,
            borderBottom: "2px solid #0097a9"
          }}>2 Datos del negocio</span>
        </div>

        {/* Título */}
        <h2 style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 22,
          marginBottom: 24,
          color: "#222"
        }}>
          ¡Personalicemos tu cuenta Doctocliq!
        </h2>

        {/* Formulario */}
        <form style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <label style={{ fontWeight: 500, color: "#222" }}>
            Nombre comercial <span style={{ color: "#e74c3c" }}>*</span>
            <input
              type="text"
              value={nombreComercial}
              onChange={e => setNombreComercial(e.target.value)}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "10px 14px",
                border: "2px solid #0097a9",
                borderRadius: 8,
                fontSize: 16,
                outline: "none",
                marginBottom: 8,
              }}
              required
            />
          </label>
          <label style={{ fontWeight: 500, color: "#222" }}>
            Tipo de negocio <span style={{ color: "#e74c3c" }}>*</span>
            <select
              value={tipoNegocio}
              onChange={e => setTipoNegocio(e.target.value)}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "10px 14px",
                border: "2px solid #e0e0e0",
                borderRadius: 8,
                fontSize: 16,
                outline: "none",
                marginBottom: 8,
                background: "#f7fafd"
              }}
              required
            >
              {tiposNegocio.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </label>
          <label style={{ fontWeight: 500, color: "#222" }}>
            Nº doctores principales (DP) <span style={{ color: "#e74c3c" }}>*</span>
            <select
              value={numDoctores}
              onChange={e => setNumDoctores(e.target.value)}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "10px 14px",
                border: "2px solid #e0e0e0",
                borderRadius: 8,
                fontSize: 16,
                outline: "none",
                marginBottom: 8,
                background: "#f7fafd"
              }}
              required
            >
              {doctoresPrincipales.map(op => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </label>
        </form>

        {/* Checkbox y términos */}
        <div style={{ marginTop: 18, fontSize: 14, color: "#888", textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
            <input type="checkbox" checked={aceptaTerminos} onChange={e => setAceptaTerminos(e.target.checked)} style={{ accentColor: '#0097a9' }} />
            Acepto los <a href="#" style={{ color: "#0097a9", textDecoration: "underline" }}>términos y condiciones</a> y <a href="#" style={{ color: "#0097a9", textDecoration: "underline" }}>política de privacidad</a>
          </label>
        </div>

        {/* Botón Terminar */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
        }}>
          <button
            type="button"
            onClick={() => goTo && goTo("home")}
            style={{
              background: aceptaTerminos ? "#0097a9" : "#bdbdbd",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 48px",
              fontSize: 18,
              fontWeight: "bold",
              cursor: aceptaTerminos ? "pointer" : "not-allowed",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
            disabled={!aceptaTerminos}
          >
            Terminar
          </button>
        </div>
      </div>
      {/* Botón siguiente en la esquina superior derecha */}
      <button
        onClick={() => goTo && goTo("home")}
        style={{
          position: "fixed",
          top: 24,
          right: 32,
          background: "#0097a9",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: 16,
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        Siguiente
      </button>
    </div>
  );
};

export default DatosNegocio;
