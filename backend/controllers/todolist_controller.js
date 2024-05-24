const TodoList = require('../models/todolist');

const catchAsyncErrors = require('../middlewares/catch_async_errors');

exports.getTodoList = catchAsyncErrors(async (req, res, next) => {
    result = await TodoList.find({ user: req.user._id });
    console.log(result);
    res.status(200).json({
        success: true,
        result
    });
});

exports.postTodoList = catchAsyncErrors(async (req, res, next) => {
    result = await TodoList.create({
        title: req.body.title,
        note: req.body.note,
        user: req.user._id
    });
    res.status(200).json({
        success: true,
        result
    });
});

exports.putTodoList = catchAsyncErrors(async (req, res, next) => {
    result = await TodoList.updateOne({
        _id: req.body._id, user: req.user._id
    }, {
        title: req.body.title,
        note: req.body.note
    });
    res.status(200).json({
        success: true,
        result
    });
});

exports.deleteTodoList = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    result = await TodoList.deleteOne({ _id: req.body._id, user: req.user._id });
    res.status(200).json({
        success: true,
        result
    });
});