import express from "express";
import { createTodoTable, getAllTodo, getTodoById, updateTodo1, updateTodo3, updateTodo2, insertTimestampOnly, deleteTodoById, lastround } from "./candidate.controllers.js";
import multer from 'multer'

export const route = express.Router()


// Define a storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/candidates/uploads/'); // Specify the directory where you want to save the images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    },
});

// Create a multer instance with the defined storage engine
const upload = multer({ storage });

route.get('/createTodoTable', createTodoTable)
route.get('/getAllTodo', getAllTodo);
route.get('/todo/:id', getTodoById);
route.delete('/deletetodo/:id', deleteTodoById);

route.post('/insertTimestampOnly', insertTimestampOnly)
route.put('/updateTodo1/:id', upload.single('upload_resume'), updateTodo1)
route.put('/updateTodo2/:id', updateTodo2)
route.put('/updateTodo3/:id', updateTodo3)
route.put('/lastround/:id', lastround)




