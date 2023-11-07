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
    const id = req.params.id;
    const {
        name,
        email,
        phone,
        field_of_interest,
        linkedin_url,
        university,
        college,
        course_duration,
        course,
        publications,
        publications_link,
        class_10_education,
        class_10_percentage,
        class_10_year_of_passing,
        class_12_education,
        class_12_percentage,
        class_12_year_of_passing,
        masters_university,
        masters_percentage,
        masters_year_of_passing,
        last_internship_details,
        preferred_location,
        skills,
    } = req.body;

    const upload_resume = req.file ? `uploads/${req.file.filename}` : null;

    // //  Define an array of field names
    // const requiredFields = [
    //     'name',
    //     'email',
    //     'phone',
    //     'field_of_interest',
    //     'linkedin_url',
    //     'university',
    //     'college',
    //     'course_duration',
    //     'course',
    //     'publications',
    //     'class_10_education',
    //     'class_10_percentage',
    //     'class_10_year_of_passing',
    //     'class_12_education',
    //     'class_12_percentage',
    //     'class_12_year_of_passing',
    //     'masters_university',
    //     'masters_percentage',
    //     'masters_year_of_passing',
    //     'last_internship_details',
    //     'preferred_location',
    //     'skills',
    // ];

    // // Check if any of the fields are empty
    // const missingFields = requiredFields.filter((field) => !req.body[field]);

    // if (missingFields.length > 0) {
    //     const missingFieldNames = missingFields.join(', ');
    //     return res.status(400).json({ message: `Please fill in the following fields: ${missingFieldNames}` });
    // }

    try {
        const result = await pool.query(insertTodoQuery1, [
            id, // Pass the ID for the row to update
            name,
            email,
            phone,
            field_of_interest,
            linkedin_url,
            university,
            college,
            course_duration,
            course,
            publications,
            publications_link,
            class_10_education,
            class_10_percentage,
            class_10_year_of_passing,
            class_12_education,
            class_12_percentage,
            class_12_year_of_passing,
            masters_university,
            masters_percentage,
            masters_year_of_passing,
            last_internship_details,
            preferred_location,
            upload_resume,
            skills,
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
        Aptitude_answer1,
        Aptitude_answer2,
        Aptitude_answer3,
        Aptitude_answer4,
        Aptitude_answer5,
        Aptitude_answer6,
        Aptitude_answer7,
        Aptitude_answer8,
        Aptitude_answer9,
        Aptitude_answer10,
    } = req.body;


    try {
        const result = await pool.query(updateTodoQuery, [
            Aptitude_answer1,
            Aptitude_answer2,
            Aptitude_answer3,
            Aptitude_answer4,
            Aptitude_answer5,
            Aptitude_answer6,
            Aptitude_answer7,
            Aptitude_answer8,
            Aptitude_answer9,
            Aptitude_answer10,
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
        answer1_part_a,
        answer2_part_a,
        answer3_part_a,
        answer4_part_a,
        answer5_part_a,
        answer6_part_a,
        answer7_part_a,
        answer8_part_a,
        answer9_part_a,
        answer10_part_a,
        answer11_part_a,
        answer12_part_a,
        answer13_part_a,
        answer14_part_a,
        answer1_part_b,
        answer2_part_b,
        answer3_part_b,
        answer1_part_c,
        answer2_part_c,
        answer3_part_c,
        answer1_part_d,
        answer2_part_d,
        answer3_part_d,
        answer4_part_d,
        answer5_part_d,
        answer6_part_d,
        answer7_part_d,
        answer8_part_d,
        answer9_part_d,
        answer10_part_d,
        answer1_entertainment_and_media_law,
        answer2_entertainment_and_media_law,
        answer3_entertainment_and_media_law,
        answer1_capital_market_securities,
        answer1_banking_law,
        answer2_banking_law,
        answer3_banking_law,
        answer1_mediation_and_conciliation,
        answer2_mediation_and_conciliation,
        answer3_mediation_and_conciliation,
        answer1_merger_acquisition,
        answer2_merger_acquisition,
        answer3_merger_acquisition,
        answer1_sports_law,
        answer2_sports_law,
        answer3_sports_law,
        answer1_intellectual_property_rights,
        answer2_intellectual_property_rights,
        answer3_intellectual_property_rights,
        answer1_labour_laws,
        answer2_labour_laws,
        answer3_labour_laws,
        answer1_international_business_law,
        answer2_international_business_law,
        answer3_international_business_law,
        answer1_startup_in_india_related_legal_question,
        answer2_startup_in_india_related_legal_question,
        answer3_startup_in_india_related_legal_question,
        answer1_insurance_law,
        answer2_insurance_law,
        answer3_insurance_law,
        answer1_joint_venture_public_private_partnership_and_msme,
        answer2_joint_venture_public_private_partnership_and_msme,
        answer3_joint_venture_public_private_partnership_and_msme,
        answer1_tax_law,
        answer2_tax_law,
        answer3_tax_law,
        answer1_arbitration,
        answer2_arbitration,
        answer3_arbitration,
        answer4_arbitration,
        answer5_arbitration,
        answer1_ibc,
        answer2_ibc,
        answer3_ibc,
        answer1_competitive_and_anti_trust,
        answer1_aviation_law,
        answer2_aviation_law,
        answer3_aviation_law,
        answer4_aviation_law,
        answer1_environment,
        answer2_environment,
        answer3_environment,
        answer4_environment,
        answer5_environment,
        answer1_public_policy,
        answer2_public_policy,
    } = req.body;

    try {
        const result = await pool.query(insertLastRoundDataQuery, [
            answer1_part_a,
            answer2_part_a,
            answer3_part_a,
            answer4_part_a,
            answer5_part_a,
            answer6_part_a,
            answer7_part_a,
            answer8_part_a,
            answer9_part_a,
            answer10_part_a,
            answer11_part_a,
            answer12_part_a,
            answer13_part_a,
            answer14_part_a,
            answer1_part_b,
            answer2_part_b,
            answer3_part_b,
            answer1_part_c,
            answer2_part_c,
            answer3_part_c,
            answer1_part_d,
            answer2_part_d,
            answer3_part_d,
            answer4_part_d,
            answer5_part_d,
            answer6_part_d,
            answer7_part_d,
            answer8_part_d,
            answer9_part_d,
            answer10_part_d,
            answer1_entertainment_and_media_law,
            answer2_entertainment_and_media_law,
            answer3_entertainment_and_media_law,
            answer1_capital_market_securities,
            answer1_banking_law,
            answer2_banking_law,
            answer3_banking_law,
            answer1_mediation_and_conciliation,
            answer2_mediation_and_conciliation,
            answer3_mediation_and_conciliation,
            answer1_merger_acquisition,
            answer2_merger_acquisition,
            answer3_merger_acquisition,
            answer1_sports_law,
            answer2_sports_law,
            answer3_sports_law,
            answer1_intellectual_property_rights,
            answer2_intellectual_property_rights,
            answer3_intellectual_property_rights,
            answer1_labour_laws,
            answer2_labour_laws,
            answer3_labour_laws,
            answer1_international_business_law,
            answer2_international_business_law,
            answer3_international_business_law,
            answer1_startup_in_india_related_legal_question,
            answer2_startup_in_india_related_legal_question,
            answer3_startup_in_india_related_legal_question,
            answer1_insurance_law,
            answer2_insurance_law,
            answer3_insurance_law,
            answer1_joint_venture_public_private_partnership_and_msme,
            answer2_joint_venture_public_private_partnership_and_msme,
            answer3_joint_venture_public_private_partnership_and_msme,
            answer1_tax_law,
            answer2_tax_law,
            answer3_tax_law,
            answer1_arbitration,
            answer2_arbitration,
            answer3_arbitration,
            answer4_arbitration,
            answer5_arbitration,
            answer1_ibc,
            answer2_ibc,
            answer3_ibc,
            answer1_competitive_and_anti_trust,
            answer1_aviation_law,
            answer2_aviation_law,
            answer3_aviation_law,
            answer4_aviation_law,
            answer1_environment,
            answer2_environment,
            answer3_environment,
            answer4_environment,
            answer5_environment,
            answer1_public_policy,
            answer2_public_policy,
            id, // Pass the ID for the row to update
        ]);

        res.status(201).json({ message: "Final step data updated successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

