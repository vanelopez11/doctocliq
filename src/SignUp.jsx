import React from "react";

const SignUp = ({ goTo, goHome }) => (
  <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
    <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: 16, position: 'relative' }}>
      <button onClick={goHome} style={{ fontWeight: 'bold', position: 'absolute', left: 16 }}>Inicio</button>
      <button onClick={() => goTo('verify_mail')} style={{ fontWeight: 'bold', marginLeft: 'auto' }}>Siguiente</button>
    </header>
    <main style={{ flex: 1, width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></main>
  </div>
);

export default SignUp;
