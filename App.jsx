import React, { useState } from 'react';
// import Routes from './src/routes';

import Login from './src/screens/login';
import Home from './src/screens/home';

export default function App() {
  const [user, setUser] = useState();

  return !user ? <Login setUser={setUser} /> : <Home />;
}
