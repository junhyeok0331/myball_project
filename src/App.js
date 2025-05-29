  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Home from "./components/Home";
  import Login from "./components/Login";
  import Register from "./components/Register";
  import CharacterCreate from './components/CharacterCreate';
  import CharacterSummary from './components/CharacterSummary';

// 새 페이지들 import
import Shop from './components/Shop';
import Exchange from './components/Exchange';
import Ranking from './components/Ranking';
import News from './components/News';


  function App() {
    return (
      <Router>
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
      </Router>
    );
  }

  export default App;
