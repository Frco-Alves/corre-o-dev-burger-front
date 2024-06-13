import React from "react";
import { SideMenuAdmin } from '../../components';
import ListProducts from './ListProducts';
import Orders from "./Orders";
import { Container, ContainerItems } from './styles';
import PropTypes from 'prop-types';
import paths from "../../constants/paths";
import NewProduct from "./NewProduct";
import EditProduct from './EditProduct';

export function Admin({ match: { path } }) {
    return (
        <Container>
            <SideMenuAdmin path={path}/>
            <ContainerItems>
                {path === paths.Order && <Orders />}
                {path === paths.Products && <ListProducts />}
                {path === paths.NewProduct && <NewProduct />}
                {path === paths.EditProducts && <EditProduct />}
            </ContainerItems>
        </Container>
    )
}

Admin.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string
    })
}