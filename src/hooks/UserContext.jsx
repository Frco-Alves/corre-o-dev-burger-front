import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const UserContext = createContext({})

export default UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

    const putUserData = async (userInfo) => {
        setUserData(userInfo)

        localStorage.setItem('codeburger:userData', JSON.stringify(userInfo))
    }

    const logout = async () => {
        localStorage.removeItem('codeburger:userData')
    }

    useEffect(() => {
        const loadUserData = async () => {
            const clientInfo = localStorage.getItem('codeburger:userData')

            if (clientInfo) {
                setUserData(JSON.parse(clientInfo))
            }
        }

        loadUserData()

    }, [])

    return (
        <UserContext.Provider value={{
            putUserData,
            userData,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )

   
}

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser must be used with UserContext')
    }

    return context
}

UserProvider.propTypes = {
    children: PropTypes.node
}

