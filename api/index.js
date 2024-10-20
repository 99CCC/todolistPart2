const express = require('express');
const cors = require('cors');
const app = express()
const port = 3001;

app.use(express.json());

app.use(cors());

const todoRoutes = require('./routes/todoRoutes');

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
    console.log("Server is running on http://localhost:"+port.toString());
})