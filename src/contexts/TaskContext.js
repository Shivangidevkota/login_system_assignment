// src/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

const TaskContext = createContext();

export const useTask = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
    const { username } = useUser();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (username) {
            const storedTasks = localStorage.getItem(`tasks_${username}`);
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            } else {
                setTasks([]); // Ensure tasks are initialized to empty
            }
        }
    }, [username]);

    const addTask = (task) => {
        const newTasks = [...tasks, task];
        setTasks(newTasks);
        localStorage.setItem(`tasks_${username}`, JSON.stringify(newTasks));
    };

    const markAsCompleted = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
    };

    const updateTask = (index, title) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, title } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, markAsCompleted, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
