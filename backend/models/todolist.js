const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title.'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    note: {
        type: String,
        required: [true, 'Please enter note.'],
        trim: true,
        maxLength: [100, 'Note cannot exceed 100 characters.']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('TodoList', todoListSchema);