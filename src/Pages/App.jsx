import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Login from './Login';
import Main from './Main';
export default function App() {
  return (

  <Router>
    <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/login/" element={<Login></Login>} />
    </Routes>
  </Router>

  );
}
