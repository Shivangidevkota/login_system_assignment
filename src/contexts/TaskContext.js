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
            }
        } else {
            setTasks([]); // Clear tasks if no user is logged in
        }
    }, [username]);

    const addTask = (task) => {
        if (!username) return; // Prevent adding tasks if not logged in
        const newTasks = [...tasks, task];
        setTasks(newTasks);
        localStorage.setItem(`tasks_${username}`, JSON.stringify(newTasks));
    };

    const markAsCompleted = (index) => {
        if (!username) return; // Prevent marking tasks if not logged in
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
    };

    const updateTask = (index, title) => {
        if (!username) return; // Prevent updating tasks if not logged in
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, title } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
    };

    const deleteTask = (index) => {
        if (!username) return; // Prevent deleting tasks if not logged in
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