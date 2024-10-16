import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/menu_header';
import Footer from './Components/footer';
import Team from './Components/team';
import Proyectos from './Components/projects';
import Customs from './Components/customs';
import Store from './Components/store';
import Product_sheet from './Components/product_sheet';
import Login from './Components/login';
import Home from './Components/home';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/team" element={<Team />} />
            <Route path="/projects" element={<Proyectos />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product_sheet" element={<Product_sheet />} />
            <Route path="/customs" element={<Customs />} />
            <Route path="/" element={<Home />} />
            {/* Puedes agregar otras rutas aquí */}
          </Routes>
        </main>
        {/* <Footer /> */}

      </div>
    </Router>
  );
}

export default App;