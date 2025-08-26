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
import MisCompras from './Components/Client/MisCompras';
import MisPresupuestos from './Components/Client/MisPresupuestos';
import Produccion from './Components/Admin/Produccion';
import StockMateria from './Components/Admin/StockMateriaPrima';
import StockProductos from './Components/Admin/StockProductos';
import Presupuestos from './Components/SuperAdmin/Presupuestos';
import PresupuestoDetalle from './Components/SuperAdmin/PresupuestoDetalle';
import ProductDetail from './Components/ProductDetail';
import Cart from './Components/Cart';
import CartSuccess from './Components/CartSuccess';
import PrivateLayout from './Components/Shared/PrivateLayout';
import Sidebar from './Components/Shared/Sidebar';
import Profile from './Components/Login/profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/AddressForm" element={<AddressForm />} />
            <Route path="/team" element={<Team />} />
            <Route path="/projects" element={<Proyectos />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product_sheet" element={<Product_sheet />} />
            <Route path="/customs" element={<Customs />} />
            <Route
              path="/mis-compras"
              element={
                <PrivateLayout>
                  <MisCompras />
                </PrivateLayout>
              }
            />
            <Route
              path="/mis-presupuestos"
              element={
                <PrivateLayout>
                  <MisPresupuestos />
                </PrivateLayout>
              }
            />
            <Route
              path="/produccion"
              element={
                <PrivateLayout>
                  <Produccion />
                </PrivateLayout>
              }
            />
            <Route
              path="/stok-materia"
              element={
                <PrivateLayout>
                  <StockMateria />
                </PrivateLayout>
              }
            />
            <Route
              path="/stock-productos"
              element={
                <PrivateLayout>
                  <StockProductos />
                </PrivateLayout>
              }
            />
            <Route
              path="/presupuestos"
              element={
                <PrivateLayout>
                  <Presupuestos />
                </PrivateLayout>
              }
            />
            <Route
              path="/detalle-presupuesto"
              element={
                <PrivateLayout>
                  <PresupuestoDetalle />
                </PrivateLayout>
              }
            />
            <Route
              path="/detalle-presupuesto/:id"
              element={
                <PrivateLayout>
                  <PresupuestoDetalle />
                </PrivateLayout>
              }
            />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart-success" element={<CartSuccess />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;