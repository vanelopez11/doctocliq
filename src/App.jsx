import { useState, useEffect } from 'react';
import Home from './Home';
import SignUp from './SignUp';
import VerifyMail from './VerifyMail';
import OtpCode from './OtpCode';
import DatosPropietario from './DatosPropietario';
import DatosNegocio from './DatosNegocio';

const COMPONENTS = {
  sign_up: SignUp,
  verify_mail: OtpCode,
  otp_code: VerifyMail,
  datos_propietario: DatosPropietario,
  datos_negocio: DatosNegocio,
};

const ROUTES = {
  home: '/',
  sign_up: '/signup',
  verify_mail: '/verify-mail',
  otp_code: '/otp-code',
  datos_propietario: '/datos-propietario',
  datos_negocio: '/datos-negocio',
};

function getScreenFromPath(path) {
  switch (path) {
    case '/signup': return 'sign_up';
    case '/verify-mail': return 'verify_mail';
    case '/otp-code': return 'otp_code';
    case '/datos-propietario': return 'datos_propietario';
    case '/datos-negocio': return 'datos_negocio';
    default: return 'home';
  }
}

function App() {
  const [screen, setScreen] = useState(() => getScreenFromPath(window.location.pathname));

  useEffect(() => {
    window.history.replaceState({}, '', ROUTES[screen] || '/');
  }, [screen]);

  const goTo = (name) => setScreen(name);
  const goHome = () => setScreen('home');

  if (screen === 'home') {
    return <Home goTo={goTo} />;
  }
  const Current = COMPONENTS[screen] || Home;
  return <Current goTo={goTo} goHome={goHome} />;
}

export default App;
