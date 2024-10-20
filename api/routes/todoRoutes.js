const express = require('express');
const router = express.Router();
//import controllers
const {getTodosController,
    addTodoController,
    toggleTodoController,
    removeTodoController,
    updateTodoController} = require('../controllers/todoController');

//GET ALL
router.get('/', getTodosController);

//Create
router.post('/', addTodoController);

//toggle
router.put('/:id', toggleTodoController);

//delete
router.delete('/:id', removeTodoController);

//update Title
router.put('/updateTitle/:id', updateTodoController);

module.exports = router;