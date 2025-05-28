  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Home from "./components/Home";
  import Login from "./components/Login";
  import Register from "./components/Register";
  import CharacterCreate from './components/CharacterCreate';

  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-character" element={<CharacterCreate />} />
        </Routes>
      </Router>
    );
  }

  export default App;
