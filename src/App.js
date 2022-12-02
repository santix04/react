import React from 'react'
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CartProvider from './components/Context/CartContext';
import FormularioCliente from "./components/Formulario/Formulario";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path='/' element= { <ItemListContainer /> } />
            <Route path='/categoria/:categoriaId' element= { <ItemListContainer /> } />
            <Route path='/cart' element= { <Cart/> } />
            <Route path='/detalle/:detalleId' element= { <ItemDetailContainer /> } />
            <Route path='/formularioCliente' element= { <FormularioCliente /> } />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
