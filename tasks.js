const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Route to get tasks for a specific course
router.get('/:courseId/tasks', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const tasks = await Task.find({ courseId });

        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for the specified course.' });
        }

        res.json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to add a task for a specific course
router.post('/:courseId/tasks', async (req, res) => {
    try {
        const { taskName, description, dueDate } = req.body;
        const courseId = req.params.courseId;

        // Validate request body
        if (!taskName || !description || !courseId || !dueDate) {
            return res.status(400).json({ message: 'taskName, description, courseId, and dueDate are required.' });
        }

        // Create a new task
        const newTask = new Task({
            courseId,
            taskName,
            description,
            dueDate,
            // Add more task fields as needed
        });

        // Save the task to the database
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to update a task by ID
router.put('/tasks/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { taskName, description, dueDate } = req.body;

        // Validate request body
        if (!taskName || !description || !dueDate) {
            return res.status(400).json({ message: 'taskName, description, and dueDate are required for the update.' });
        }

        // Find and update the task
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { taskName, description, dueDate },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found for the specified ID.' });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to delete a task by ID
router.delete('/tasks/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;

        // Find and delete the task
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found for the specified ID.' });
        }

        res.json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;