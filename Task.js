const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
    },
    taskName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    // Add more task fields as needed
});

module.exports = mongoose.model('Task', taskSchema);