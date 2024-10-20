import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./todolist.css"

import { fetchTodosFromAPI, addTodoAPI, toggleTodoAPI, removeTodoFromAPI, updateTodoFromAPI } from "./apiHelper";


function TodoList(){
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState("");
const [editingTodoId, setEditingTodoId] = useState(null);
const [editTitle, setEditTitle] = useState("");


async function loadTodos(){
    const todosFromAPI = await fetchTodosFromAPI();
    setTodos(todosFromAPI);
}

useEffect(() => {
    loadTodos();
}, []);

async function handleAddTodo(){
    if(newTodo.trim() === "") return;
    const newTodoItem = {title: newTodo, completed: false};
    const addedTodo = await addTodoAPI(newTodoItem);
    if (addedTodo){
        setTodos([...todos, addedTodo]);
        setNewTodo("");
    }
}

async function handleToggleTodo(todoId){
    const updatedTodo = await toggleTodoAPI(todoId);
    if(updatedTodo) {
        setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    }
}

async function handleRemoveTodo(todoId){
    const isRemoved = await removeTodoFromAPI(todoId);
    if(isRemoved){
        setTodos(todos.filter((t) => t.id !== todoId));
    }
}

async function handleEdit(todo){
    setEditingTodoId(todo.id);
    setEditTitle(todo.title);
}

async function handleConfirmUpdate(todoId){
    const updatedTodo = await updateTodoFromAPI(todoId, editTitle);
    if(updatedTodo){
        setEditingTodoId(null);
        await loadTodos();
    }
}

function handleCancelUpdate(){
    setEditingTodoId(null);
    setEditTitle("");
}

    return(
        <>
        <div className="containr mt-4">
            <h1 className="text-center mb-4">Todo List App</h1>
            <div className="input-group mb-3">
                <input 
                type="text"
                className="form-control"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
                />
                <button className="btn btn-primary" onClick={handleAddTodo}>Add Item</button>
            </div>

            <ul className="list-group">
            {todos.map((todo) => (
                <li
                key={todo.id}
                className="list-group-item d-flex justify-content-between align-items-center">
                    {editingTodoId === todo.id ?(
                        <>
                        <input
                            type="text"
                            className="form-control me-2"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}/>

                        <div className="d-flex">
                            <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleConfirmUpdate(todo.id)}>Confirm Update</button>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={handleCancelUpdate}>
                                Cancel Update
                            </button>
                        </div>
                        </>
                    ):(
                        <>
                        <span
                        className={`flex-grow-1 todo-title ${todo.completed ? "text-decoration-linethrough" : ""}`}
                        onClick={() => handleToggleTodo(todo)}
                        style={{cursor: "pointer"}}
                        >
                            {todo.title}
                            </span>
                        <div className="d-flex">
                            <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(todo)}>
                                Edit
                            </button>
                            <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveTodo(todo.id)}>
                                Delete
                            </button>
                        </div>
                        </>
                )}
                </li> 
            ))}
            </ul>
        </div>
        </>
    )
}

export default TodoList;