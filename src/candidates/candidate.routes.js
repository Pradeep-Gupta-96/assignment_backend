import express from "express";
import { createTodoTable, getAllTodo, insertTodo1,  insertTodo3, updateTodo } from "./candidate.controllers.js";
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
route.post('/insertTodo1', insertTodo1)
route.put('/updateTodo/:id', upload.single('UploadResume'), updateTodo)
route.put('/insertTodo3/:id', insertTodo3)