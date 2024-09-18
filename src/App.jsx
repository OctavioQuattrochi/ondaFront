import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/menu_header';
import Footer from './Components/footer';
import Team from './Components/team';
import Proyectos from './Components/projects';
import Login from './Components/login';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Team />} />
            <Route path="/projects" element={<Proyectos />} />


            {/* Puedes agregar otras rutas aquí */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;