// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CharacterCreate from './components/CharacterCreate';
import CharacterSummary from './components/CharacterSummary';
import Shop from './components/Shop';
import Exchange from './components/Exchange';
import Ranking from './components/Ranking';
import News from './components/News';
import { EquippedItemProvider } from './components/EquippedItemContext';
import { PointProvider } from './components/PointContext';

function App() {
  return (
    <Router>
      <PointProvider> {/* PointProvider가 최상단에 위치 */}
        <EquippedItemProvider> {/* EquippedItemProvider가 그 안에 위치 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-character" element={<CharacterCreate />} />
            <Route path="/summary" element={<CharacterSummary />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </EquippedItemProvider>
      </PointProvider>
    </Router>
  );
}

export default App;
