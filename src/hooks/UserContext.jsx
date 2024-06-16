import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const UseContext = createContext({})

  export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});

    const putUserData = async (userInfo) => {
        setUserData(userInfo);
        localStorage.setItem('codeburger:userData', JSON.stringify(userInfo));
    };

    const logout = async () => {
        localStorage.removeItem('codeburger:userData');
        setUserData({});
    };

    useEffect(() => {
        const loadUserData = async () => {
            const clientInfo = localStorage.getItem('codeburger:userData');
            if (clientInfo) {
                setUserData(JSON.parse(clientInfo));
            }
        };

        loadUserData();
    }, []);

    return (
        <UseContext.Provider value={{ putUserData, userData, logout }}>
            {children}
        </UseContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(useContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};

