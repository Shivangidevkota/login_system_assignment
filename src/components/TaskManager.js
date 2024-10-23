import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import { useUser } from '../contexts/UserContext';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TaskManager = () => {
    const { tasks, addTask, markAsCompleted, updateTask, deleteTask } = useTask();
    const { username, logout } = useUser();
    const [taskTitle, setTaskTitle] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // Added filter state

    const handleAddTask = () => {
        if (!taskTitle.trim()) {
            setError('Task title is required.');
            return;
        }
        addTask({ title: taskTitle, completed: false });
        setTaskTitle('');
        setError('');
    };

    const handleUpdateTask = () => {
        if (editIndex === null || !taskTitle.trim()) {
            setError('Task title is required.');
            return;
        }
        updateTask(editIndex, taskTitle);
        setTaskTitle('');
        setEditIndex(null);
        setError('');
    };

    const startEditing = (index) => {
        setEditIndex(index);
        setTaskTitle(tasks[index].title);
    };

    // Filtering logic
    const filteredTasks = () => {
        if (filter === 'completed') {
            return tasks.filter(task => task.completed);
        }
        if (filter === 'incomplete') {
            return tasks.filter(task => !task.completed);
        }
        return tasks; // For 'all' tasks
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Task Management for {username}</Typography>
            <Button variant="outlined" onClick={logout}>Logout</Button>

            <Box sx={{ mt: 2 }}>
                <TextField
                    label="Task Title"
                    variant="outlined"
                    fullWidth
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                {editIndex !== null ? (
                    <Button variant="contained" onClick={handleUpdateTask} sx={{ mt: 2 }}>Update Task</Button>
                ) : (
                    <Button variant="contained" onClick={handleAddTask} sx={{ mt: 2 }}>Add Task</Button>
                )}
                {error && <Typography color="error">{error}</Typography>}
            </Box>

            {/* Filter Controls */}
            <Box sx={{ mt: 2 }}>
                <Button 
                    onClick={() => setFilter('all')} 
                    variant="outlined" 
                    sx={{ 
                        backgroundColor: filter === 'all' ? 'lightblue' : 'inherit', // Change color if active
                        color: filter === 'all' ? 'white' : 'black' // Change text color if active
                    }}
                >
                    All Tasks
                </Button>
                <Button 
                    onClick={() => setFilter('completed')} 
                    variant="outlined" 
                    sx={{ 
                        backgroundColor: filter === 'completed' ? 'lightblue' : 'inherit', 
                        color: filter === 'completed' ? 'white' : 'black' 
                    }}
                >
                    Completed Tasks
                </Button>
                <Button 
                    onClick={() => setFilter('incomplete')} 
                    variant="outlined" 
                    sx={{ 
                        backgroundColor: filter === 'incomplete' ? 'lightblue' : 'inherit', 
                        color: filter === 'incomplete' ? 'white' : 'black' 
                    }}
                >
                    Incomplete Tasks
                </Button>
            </Box>

            <List sx={{ mt: 4 }}>
                {filteredTasks().map((task, index) => (
                    <ListItem key={index} divider>
                        <ListItemText primary={task.title} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
                        <IconButton onClick={() => markAsCompleted(index)}>
                            <CheckCircleIcon style={{ color: task.completed ? 'green' : 'grey' }} />
                        </IconButton>
                        <IconButton onClick={() => deleteTask(index)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => startEditing(index)}>
                            <EditIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskManager;
