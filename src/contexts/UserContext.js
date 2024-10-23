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

    const login = (user, password) => {
        const storedPassword = localStorage.getItem(`password_${user}`);
        if (storedPassword === password) {
            localStorage.setItem('loggedInUser', user);
            setUsername(user);
            setError(''); // Reset error on successful login
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    const register = (user, password) => {
        // Check if user already exists
        const existingUser = localStorage.getItem(`tasks_${user}`);
        if (existingUser) {
            setError('User already exists.');
            return;
        }

        localStorage.setItem('loggedInUser', user);
        localStorage.setItem(`tasks_${user}`, JSON.stringify([])); // Initialize tasks for new user
        localStorage.setItem(`password_${user}`, password); // Store password
        setUsername(user);
        setError(''); // Reset error on successful registration
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
