import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState({})

    const putProductInCart = async (product) => {
        const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)

        let newCartProducts = []
        if (cartIndex >= 0) {
            const newCartProducts = cartProducts

            newCartProducts[cartIndex].quantity =
                newCartProducts[cartIndex].quantity + 1
            setCartProducts(newCartProducts)
        }
        else {
            product.quantity = 1
            newCartProducts = [...cartProducts, product]
            setCartProducts(newCartProducts)
        }

        localStorage.setItem(
            'codeburger:cartInfo',
            JSON.stringify(newCartProducts)
        )
    }

    const increaseProducts = async (productId) => {
        const newCart = cartProducts.map(product => {
            return product.id == productId ?
                { ...product, quantity: product.quantity + 1 } :
                product
        })

        setCartProducts(newCart)

        localStorage.setItem(
            'codeburger:cartInfo',
            JSON.stringify(newCart)
        )
    }

    useEffect(() => {
        const loadUserData = async () => {
            const clientCartData = localStorage.getItem('codeburger:cartInfo')

            if (clientCartData) {
                setCartProducts(JSON.parse(clientCartData))
            }
        }
        loadUserData()
    }, [])

    return (
        <CartContext.Provider value=
        {{ putProductInCart, cartProducts, increaseProducts }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used with CartContext')
    }

    return context
}

CartProvider.propTypes = {
    children: PropTypes.node
}

