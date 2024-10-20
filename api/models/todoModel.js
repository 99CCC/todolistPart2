// Get dbServiceInstance
async function getDbServiceInstance() {
    try{
        const { dbServiceInstancePromise } = require("../index.js");
        const dbServiceInstance = await dbServiceInstancePromise;
        if (!dbServiceInstance) {
            throw new Error('Database service not initialized');
        }
        return dbServiceInstance;
    } catch (error){
        throw error;
    }
}

//Get all
async function getAllTodosModel(){
        try{
            const dbServiceInstance = await getDbServiceInstance();
            const query = 'SELECT * FROM public.todolist';
            const response = await dbServiceInstance.queryMethod(query);
            return response;
        } catch (error){
            throw error;
        }
}

//Add new
async function addTodoModel(newTodo){
    try{
        const dbServiceInstance = await getDbServiceInstance();
        const query = 'INSERT INTO public.todolist (title) VALUES ($1) RETURNING *';
        const params = [newTodo];
        const response = await dbServiceInstance.queryMethod(query, params);
        return response[0];
    }catch(error){
        throw error
    }
}

//Toggler
async function toggleTodoModel(id) {
    try{
        console.log("Model Called");
        const dbServiceInstance = await getDbServiceInstance();
        const selectQuery = 'SELECT completed FROM public.todolist WHERE todolist_id = $1';
        const selectParams = [id];
        console.log(selectParams);
        const selectResponse = await dbServiceInstance.queryMethod(selectQuery, selectParams);
        console.log(selectResponse);
        let check = selectResponse[0].completed;
        console.log("pre",check);
        if (check){check = false;}else{check = true};
        console.log("post",check);
        const updateQuery = 'UPDATE public.todolist SET completed = $1 WHERE todolist_id = $2 RETURNING *';
        const updateParams = [check, id];
        const updateResponse = await dbServiceInstance.queryMethod(updateQuery, updateParams);
        console.log(updateResponse);
        return updateResponse;
    }catch(error){
        throw error;
    }
}

//Remove
async function removeTodoModel(id){
    try{
        const dbServiceInstance = await getDbServiceInstance();
        const query = 'DELETE FROM public.todolist WHERE todolist_id = $1 RETURNING *';
        const params = [id.id];
        const response = await dbServiceInstance.queryMethod(query, params);
        return response;
    }catch(error){
        throw error;
    }
}

//Update Title
async function updateTodoModel(id, updatedFields){
    try{
        const dbServiceInstance = await getDbServiceInstance();
        const query = 'UPDATE public.todolist SET title = $2 WHERE todolist_id = $1 RETURNING *';
        const params = [id.id, updatedFields];
        const response = await dbServiceInstance.queryMethod(query,params);
        return response;
    }catch(error){
        throw error;
    }
}


module.exports = {
    getAllTodosModel,
    addTodoModel,
    toggleTodoModel,
    removeTodoModel,
    updateTodoModel
}