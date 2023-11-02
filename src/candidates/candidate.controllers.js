import { pool } from '../config/database.js'
import { createTodoTableQuery, deleteTodoByIdQuery, getAllTodoQuery, getTodoByIdQuery, insertLastRoundDataQuery, insertTodoQuery1, insertTodoQuery3, updateTodoQuery } from './candidate.queries.js';

// CREATE TABLE IF NOT EXISTS
export const createTodoTable = async (req, res) => {
    try {
        await pool.query(createTodoTableQuery);
        res.status(200).json({ message: "Table Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL
export const getAllTodo = async (req, res) => {
    try {
        const result = await pool.query(getAllTodoQuery);
        res.status(200).json({ message: "Fetched all todos", todos: result.rows });
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};


// Controller to get a todo by ID
export const getTodoById = async (req, res) => {
    const todoId = req.params.id; // Get the ID from the request parameters

    try {
        const result = await pool.query(getTodoByIdQuery, [todoId]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Todo not found" });
        } else {
            res.status(200).json({ message: "Fetched todo by ID", todo: result.rows[0] });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};


// Controller to delete a todo by ID
export const deleteTodoById = async (req, res) => {
    const todoId = req.params.id; // Get the ID from the request parameters

    try {
        const result = await pool.query(deleteTodoByIdQuery, [todoId]);
        if (result.rowCount === 0) {
            // If no rows were deleted, it means the todo with the given ID was not found.
            res.status(404).json({ message: "Todo not found" });
        } else {
            // If at least one row was deleted, it means the todo was deleted successfully.
            res.status(200).json({ message: "Todo deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred on the server side", error });
    }
};

// Step 1: Insert timming rest of null value 
// Controller to insert a new row with the current timestamp
export const insertTimestampOnly = async (req, res) => {
    try {
        const result = await pool.query("INSERT INTO todo (created_at) VALUES (NOW()) RETURNING *");

        res.status(201).json({ message: "Timestamp data created successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Step 2: Insert basic information
export const updateTodo1 = async (req, res) => {
    const id = req.params.id
    const {
        name,
        email,
        phone,
        university,
        college,
        course_duration,
        course,
        field_of_interest,
        skills,
        publications,
        publicationslink,
    } = req.body;


    try {
        const result = await pool.query(insertTodoQuery1, [
            id, // Pass the ID for the row to update
            name,
            email,
            phone,
            university,
            college,
            course_duration,
            course,
            field_of_interest,
            skills,
            publications,
            publicationslink,
        ]);

        res.status(201).json({ message: "Step 1 data created successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Step 3: Update education and resume
export const updateTodo2 = async (req, res) => {
    const id = req.params.id;
    const {
        Class10Education,
        Class10_percentage,
        Class10_year_of_passing,
        Class12Education,
        Class12_percentage,
        Class12_year_of_passing,
        graduation_university,
        graduation_percentage,
        graduation_year_of_passing,
        masters_university,
        masters_percentage,
        masters_year_of_passing,
        LastInternshipDetails,
        HaveYouParticipatedinMootCourt,
        PreferredLocation,
    } = req.body;
    const UploadResume = req.file ? `uploads/${req.file.filename}` : null;

    try {
        const result = await pool.query(updateTodoQuery, [
            Class10Education,
            Class10_percentage,
            Class10_year_of_passing,
            Class12Education,
            Class12_percentage,
            Class12_year_of_passing,
            graduation_university,
            graduation_percentage,
            graduation_year_of_passing,
            masters_university,
            masters_percentage,
            masters_year_of_passing,
            LastInternshipDetails,
            HaveYouParticipatedinMootCourt,
            PreferredLocation,
            UploadResume,
            id, // Pass the ID for the row to update
        ]);

        res.status(200).json({ message: "Step 2 data updated successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Step 4: Insert answers
export const updateTodo3 = async (req, res) => {
    const id = req.params.id;
    const {
        Answer1,
        Answer2,
        Answer3,
    } = req.body;

    try {
        const result = await pool.query(insertTodoQuery3, [
            Answer1,
            Answer2,
            Answer3,
            id, // Pass the ID for the row to update
        ]);

        res.status(201).json({ message: "Step 3 data created successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//final Round
export const lastround = async (req, res) => {
    const id = req.params.id;
    const {
        Answer1_PartA,
        Answer2_PartA,
        Answer3_PartA,
        Answer4_PartA,
        Answer5_PartA,
        Answer6_PartA,
        Answer7_PartA,
        Answer8_PartA,
        Answer9_PartA,
        Answer10_PartA,
        Answer11_PartA,
        Answer12_PartA,
        Answer13_PartA,
        Answer14_PartA,
        Answer1_PartB,
        Answer2_PartB,
        Answer3_PartB,
        Answer1_PartC,
        Answer2_PartC,
        Answer3_PartC,
        Answer1_PartD,
        Answer2_PartD,
        Answer3_PartD,
        Answer4_PartD,
        Answer5_PartD,
        Answer6_PartD,
        Answer7_PartD,
        Answer8_PartD,
        Answer9_PartD,
        Answer10_PartD,
    } = req.body;

    try {
        const result = await pool.query(insertLastRoundDataQuery, [
            Answer1_PartA,
            Answer2_PartA,
            Answer3_PartA,
            Answer4_PartA,
            Answer5_PartA,
            Answer6_PartA,
            Answer7_PartA,
            Answer8_PartA,
            Answer9_PartA,
            Answer10_PartA,
            Answer11_PartA,
            Answer12_PartA,
            Answer13_PartA,
            Answer14_PartA,
            Answer1_PartB,
            Answer2_PartB,
            Answer3_PartB,
            Answer1_PartC,
            Answer2_PartC,
            Answer3_PartC,
            Answer1_PartD,
            Answer2_PartD,
            Answer3_PartD,
            Answer4_PartD,
            Answer5_PartD,
            Answer6_PartD,
            Answer7_PartD,
            Answer8_PartD,
            Answer9_PartD,
            Answer10_PartD,
            id, // Pass the ID for the row to update
        ]);

        res.status(201).json({ message: "Final step data updated successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

