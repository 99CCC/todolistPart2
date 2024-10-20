let todos = [
    { id: 1, title: 'todo1', completed: false},
    { id: 2, title: 'todo2', completed: true}
];

//Get all
function getAllTodosModel(){
    return todos;
}

//Add new
function addTodoModel(newTodo){
    const id = todos.length + 1;
    const todo = {id, ...newTodo};
    todos.push(todo);
    return todo;    
}

//Toggler
function toggleTodoModel(id) {
    const todoIndex = todos.findIndex((todo) => todo.id == id);
    if (todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        return todos[todosIndex];
    }
    return null;
}

//Remove
function removeTodoModel(id){
    const todoIndex = todos.findIndex((todo) => todo.id == id);
    if (todoIndex > -1){
        const removedTodo = todos.splice(todoIndex, 1);
        return removedTodo[0];
    }
    return null;
}

//Update Title
function updateTodoModel(id, updatedFields){
    const todoIndex = todos.findIndex((todo) => todo.id == id);
    if (todoIndex > -1){
        const updatedTodo = {...todos[todoIndex], ...updatedFields};
        todos[todoIndex] = updatedTodo;
        return updatedTodo;
    }
    return null;
}


module.exports = {
    getAllTodosModel,
    addTodoModel,
    toggleTodoModel,
    removeTodoModel,
    updateTodoModel
}