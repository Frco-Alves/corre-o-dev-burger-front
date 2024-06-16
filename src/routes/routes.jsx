import React from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import {Home, Products, Register, Login, Cart, Admin} from "../containers";
import paths from '../constants/paths';
import PrivateRoute from './private-route';

function Routes(){
  return (
    
    <Router>
        <Switch>
            <Route Component={Login} path="/login" />
            <Route Component={Register} path="/cadastro" />

            <PrivateRoute Component exact ={Home} path="/" />
            <PrivateRoute Component={Products} path="/produtos" />
            <PrivateRoute Component={Cart} path="/carrinho" /> 

            <PrivateRoute Component={Admin} path={paths.Order} isAdmin/> 
            <PrivateRoute Component={Admin} path={paths.Products} isAdmin/> 
            <PrivateRoute Component={Admin} path={paths.NewProduct} isAdmin/>
            <PrivateRoute Component={Admin} path={paths.EditProduct} isAdmin/>
        </Switch>
        
    </Router>
    
  )
}

export default Routes;