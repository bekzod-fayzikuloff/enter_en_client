import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import {loginUrl, refreshTokenUrl} from "../constants/endpoints.ts";
import {sendData} from "../utils.ts";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() =>
        localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null
    );

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (username, password, success, fail) => {
        const response = await sendData(
            loginUrl,
            {
                username: username,
                password: password
            })
        const responseData = await response.json();
        if (response.status === 200) {
            setAuthToken(responseData);
            setUser(jwt_decode(responseData.access));

            localStorage.setItem('authToken', JSON.stringify(responseData));
            success();
        } else {
            fail();
        }
    };

    const logoutUser = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const updateToken = async () => {
        const response = await sendData(refreshTokenUrl, {
            refresh: authToken?.refresh
        })

        const responseData = await response.json();
        if (response.status === 200) {
            setAuthToken(responseData);
            setUser(jwt_decode(responseData.access));
            const prevToken = JSON.parse(localStorage.getItem("authToken"))
            prevToken.access = responseData.access
            localStorage.setItem('authToken', JSON.stringify(prevToken));
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            updateToken().then();
        }
        const intervalDelay = 1000 * (60 * 5);
        const interval = setInterval(() => {
            if (authToken) {
                updateToken().then();
            }
        }, intervalDelay);
        return () => clearInterval(interval);
    }, [authToken, loading, updateToken]);

    const contextData = {
        user,
        authToken,
        loginUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
    );
};

export { AuthContext };
export { AuthProvider };