const express = require('express');
const router = express.Router();

const { isAuthenticatedUser } = require('../middlewares/auth');
const {
    getTodoList,
    postTodoList,
    putTodoList,
    deleteTodoList
} = require('../controllers/todolist_controller');

router.route('/todolist').get(isAuthenticatedUser, getTodoList);
router.route('/todolist').post(isAuthenticatedUser, postTodoList);
router.route('/todolist').put(isAuthenticatedUser, putTodoList);
router.route('/todolist').delete(isAuthenticatedUser, deleteTodoList);

module.exports = router;