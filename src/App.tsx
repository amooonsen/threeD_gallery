// src/App.tsx
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
// import Room1Page from './pages/Room1Page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room1" element={<Room1Page />} />
      </Routes>
    </Router>
  );
};

export default App;
