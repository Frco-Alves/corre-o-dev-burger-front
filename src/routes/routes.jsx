import React from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import {Home, Products, Register, Login, Cart} from "../containers";
import PrivateRoute from './private-route';

function Routess(){
  return (
    <Router>
        <Routes>
            <Route Component={Login} path="/login" />
            <Route Component={Register} path="/cadastro" />
            <Route Component={Home} path="/" />
            <Route Component={Products} path="/produtos" />
            <Route Component={Cart} path="/carrinho" /> 
        </Routes>
    </Router>
  )
}

export default Routess;