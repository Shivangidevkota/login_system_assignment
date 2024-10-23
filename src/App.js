// src/App.js
import React from 'react';
import { UserProvider, useUser } from './contexts/UserContext'; // Import useUser here
import { TaskProvider } from './contexts/TaskContext';
import Login from './components/Login';
import TaskManager from './components/TaskManager';
import { CssBaseline, Container, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
                <TaskProvider>
                    <Main />
                </TaskProvider>
            </UserProvider>
        </ThemeProvider>
    );
};

const Main = () => {
    const { username } = useUser(); // Use useUser here

    return (
        <Container maxWidth="sm">
            {username ? <TaskManager /> : <Login />}
        </Container>
    );
};

export default App;
