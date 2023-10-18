import { pool } from '../config/database.js'
import { createTodoTableQuery, getAllTodoQuery,  insertTodoQuery1, insertTodoQuery3, updateTodoQuery } from './candidate.queries.js';

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

// Step 1: Insert basic information
export const insertTodo1 = async (req, res) => {
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
        last_internship_details,
        publications,
    } = req.body;

    try {
        const result = await pool.query(insertTodoQuery1, [
            name,
            email,
            phone,
            university,
            college,
            course_duration,
            course,
            field_of_interest,
            skills,
            last_internship_details,
            publications,
        ]);

        res.status(201).json({ message: "Step 1 data created successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Step 3: Update education and resume
export const updateTodo = async (req, res) => {
    const id = req.params.id;
    const {
        Class10Education ,
        Class10_percentage ,
        Class10_year_of_passing ,
        Class12Education ,
        Class12_percentage ,
        Class12_year_of_passing ,
        graduation_university ,
        graduation_percentage ,
        graduation_year_of_passing ,
        masters_university ,
        masters_percentage ,
        masters_year_of_passing ,
        LastInternshipDetails ,
        HaveYouParticipatedinMootCourt ,
        PreferredLocation ,
    } = req.body;
    const UploadResume = req.file ? `uploads/${req.file.filename}` : null;

    try {
        const result = await pool.query(updateTodoQuery, [
            Class10Education ,
            Class10_percentage ,
            Class10_year_of_passing ,
            Class12Education ,
            Class12_percentage ,
            Class12_year_of_passing ,
            graduation_university ,
            graduation_percentage ,
            graduation_year_of_passing ,
            masters_university ,
            masters_percentage ,
            masters_year_of_passing ,
            LastInternshipDetails ,
            HaveYouParticipatedinMootCourt ,
            PreferredLocation ,
            UploadResume,
            id, // Pass the ID for the row to update
        ]);

        res.status(200).json({ message: "Step 2 data updated successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Step 3: Insert answers
export const insertTodo3 = async (req, res) => {
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
