const { getAllTodosModel,
    addTodoModel,
    toggleTodoModel,
    removeTodoModel,
    updateTodoModel} = require('../models/todoModel');

async function getTodosController(req, res){
    try{
        const todos = getAllTodosModel();
        if(todos){
        res.json(todos)
    }else{
        res.status(404).json({message: "No todo objects found"});
    }
    }catch(error){
        res.status(500).json({message: "Error fetching todo objects", error});
    }
}

async function addTodoController(req, res){
    try{
        const newTodo = req.body;
        const addedTodo = addTodoModel(newTodo);
        res.status(201).json(addedTodo);
    }catch(error){
        res.status(500).json({message: 'Error adding todo', error});
    }
}

async function toggleTodoController(req, res){
    try{
        const id = req.params.id;
        const updatedTodo = toggleTodoModel(id);
        if (updatedTodo){
            res.json(updateTodo);
        }else{
            res.status(404).json({message: 'Todo not found' });
        }
    }catch (error){
        res.status(500).json({message: "Error toggling todo object", error})
    }
}

async function removeTodoController(req, res){
    try{
        const id = req.params.id;
        const removedTodo = removeTodoModel(id);
        if(removedTodo){
            res.json({message: 'Todo removed', removedTodo});
        }else{
            res.status(404).json({message: 'Todo not found'});
        }

    }catch(error){
        res.status(500).json({message: 'Error Removing todo object', error});
    }
}

async function updateTodoController(req,res){
    try{
        const id = req.params.id;
        const updateFields = req.body;

        const updateTodo =  updateTodoModel(id, updateFields);
        if(updateTodo){
            res.json({message: 'Updated Todo', updateTodo});
        }else{
            res.status(404).json({message: 'Todo not found'});
        }
    }catch (error){

    }
}

module.exports = {
    getTodosController,
    addTodoController,
    toggleTodoController,
    removeTodoController,
    updateTodoController
}