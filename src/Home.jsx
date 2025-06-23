import React from "react";

const Home = ({ goTo }) => (
  <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <main style={{ flex: 1, width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>Proceso de registro Doctocliq</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          marginTop: 32,
          width: '100vw',
          maxWidth: '900px',
        }}
      >
        <button style={{ minWidth: 120 }} onClick={() => goTo('sign_up')}>Sign Up</button>
        <button style={{ minWidth: 120 }} onClick={() => goTo('otp_code')}>OTP Code</button>
        <button style={{ minWidth: 120 }} onClick={() => goTo('verify_mail')}>Verify Mail</button>
        <button style={{ minWidth: 120 }} onClick={() => goTo('datos_propietario')}>Datos Propietario</button>
        <button style={{ minWidth: 120 }} onClick={() => goTo('datos_negocio')}>Datos Negocio</button>
      </div>
    </main>
  </div>
);

export default Home;
