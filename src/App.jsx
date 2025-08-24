import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Shared/menu_header';
import Footer from './Components/Shared/footer';
import Team from './Components/team';
import Proyectos from './Components/projects';
import Customs from './Components/customs';
import Store from './Components/store';
import Product_sheet from './Components/product_sheet';
import Login from './Components/Login/login';
import Home from './Components/home';
import Register from './Components/Login/register';
import AddressForm from './Components/Login/AddressForm';
import MisCompras from './Components/Client/MisCompras'
import MisPresupuestos from './Components/Client/MisPresupuestos';
import Produccion from './Components/Admin/Produccion';
import StockMateria from './Components/Admin/StockMateriaPrima';
import StockProductos from './Components/Admin/StockProductos';
import Presupuestos from './Components/SuperAdmin/Presupuestos';
import PresupuestoDetalle from './Components/SuperAdmin/PresupuestoDetalle';
import ProductDetail from './Components/ProductDetail';


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
            <Route path="/register" element={<Register />} />
            <Route path="/AddressForm" element={<AddressForm />} />
            <Route path="/mis-compras" element={<MisCompras />} />
            <Route path="/mis-presupuestos" element={<MisPresupuestos />} />
            <Route path="/produccion" element={<Produccion />} />
            <Route path="/stok-materia" element={<StockMateria />} />
            <Route path="/stock-productos" element={<StockProductos />} />
            <Route path="/presupuestos" element={<Presupuestos />} />
            <Route path="/detalle-presupuesto" element={<PresupuestoDetalle />} />
            <Route path="/detalle-presupuesto/:id" element={<PresupuestoDetalle />} />
            <Route path="/producto/:id" element={<ProductDetail />} />

          </Routes>
        </main>
        {/* <Footer /> */}

      </div>
    </Router>
  );
}

export default App;