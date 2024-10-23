// src/Login.js
import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
    const { login, register, error } = useUser();
    const [username, setUsername] = useState('');  // Ensure this is empty by default
    const [password, setPassword] = useState('');  // Ensure this is empty by default
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            return; // Handle empty fields as needed
        }
        if (isRegistering) {
            register(username, password); // Register with username and password
        } else {
            login(username, password); // Login with username and password
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4">{isRegistering ? 'Register' : 'Login'}</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username} // Value comes from state, so it starts empty
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password} // Value comes from state, so it starts empty
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" type="submit" fullWidth>
                    {isRegistering ? 'Register' : 'Login'}
                </Button>
                <Button variant="text" onClick={() => setIsRegistering(!isRegistering)} fullWidth>
                    {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                </Button>
                {error && <Typography color="error">{error}</Typography>}
            </form>
        </Box>
    );
};

export default Login;
