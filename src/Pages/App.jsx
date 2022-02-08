import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Login from './Login';
import Main from './Main';
import {db, firebaseApp} from '../Config/firebase.config'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

export default function App() {

  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if(usuarioFirebase){
      //Codigo en caso de que haya sesión iniciada
      setUsuarioGlobal(usuarioFirebase);
    }else{
      //Codigo en caso de que no haya sesión iniciada
      setUsuarioGlobal(null);
    }
  })


  return (
  <Router>
    <Routes>
        <Route path="/" element={usuarioGlobal ? <Main /> : <Login />} />
    </Routes>
  </Router>

  );
}
