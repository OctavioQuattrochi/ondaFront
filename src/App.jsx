// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/menu_header';
import Footer from './Components/footer';
import Team from './Components/team';
import Login from './Components/login';
import Projects from './Components/projects';
import Store from './Components/store';
import Customs from './Components/customs';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Team />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/store" element={<Store />} />
            <Route path="/customs" element={<Customs />} />
            {/* Puedes agregar otras rutas aquí */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
