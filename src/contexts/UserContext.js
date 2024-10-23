// src/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUsername(loggedInUser);
        }
    }, []);

    const login = (user) => {
        localStorage.setItem('loggedInUser', user);
        setUsername(user);
    };

    const register = (user) => {
        // Check if user already exists (mock check for simplicity)
        const existingUser = localStorage.getItem(`tasks_${user}`);
        if (existingUser) {
            setError('User already exists.');
            return;
        }
        
        localStorage.setItem('loggedInUser', user);
        localStorage.setItem(`tasks_${user}`, JSON.stringify([])); // Initialize tasks for new user
        setUsername(user);
    };

    const logout = () => {
        localStorage.removeItem('loggedInUser');
        setUsername('');
    };

    return (
        <UserContext.Provider value={{ username, login, register, logout, error }}>
            {children}
        </UserContext.Provider>
    );
};
