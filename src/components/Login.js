// src/Login.js
import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { TextField, Button, Typography, Box } from '@mui/material';


const Login = () => {
    const { login, register, error } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            register(username, password);
        } else {
            login(username, password);
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    {isRegistering ? 'Register' : 'Login'}
                </Button>
                {error && <Typography color="error">{error}</Typography>}
            </form>
            <Button onClick={() => setIsRegistering(!isRegistering)} sx={{ mt: 2 }}>
                {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </Button>
        </Box>
    );
};

export default Login;
