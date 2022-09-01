import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from 'features/home/home';
import { useSelector } from 'react-redux';
import Login from 'features/login/login';
import { RootState } from './app/store'
import Register from 'features/register';
import { Cart } from 'features/cart/cart';
import { Directions } from 'features/directions/directions';
import { AddressForm } from 'features/directions/addressForm';
import { OrdersPage } from 'features/orders';
import { OrderDetail } from 'features/orders/OrderDetail';


function App() {
  const user = useSelector( (state:RootState) => state.user);
  console.log(user)
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            {!user.username ? (
              <React.Fragment>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route
                  path="*"
                  element={
                    <Navigate to="/login" />
                  }
                />
              </React.Fragment>
            ) : (
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path='cart' element={<Cart />} />
                  <Route path='directions' element={<Directions />} />
                  <Route path='newAddress' element={<AddressForm />} />
                  <Route path='orders' element={<OrdersPage />} />
                  <Route path='orders/page/:pageNum' element={<OrdersPage />} />
                  <Route path='orders/:pk' element={<OrderDetail />} />
                </Route>
            )}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
