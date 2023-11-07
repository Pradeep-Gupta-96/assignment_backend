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
        Answer1_Entertainment_and_Media_Law,
        Answer2_Entertainment_and_Media_Law,
        Answer3_Entertainment_and_Media_Law,
        Answer1_Capital_Market_Securities,
        Answer1_Banking_Law,
        Answer2_Banking_Law,
        Answer3_Banking_Law,
        Answer1_Mediation_and_Conciliation,
        Answer2_Mediation_and_Conciliation,
        Answer3_Mediation_and_Conciliation,
        Answer1_Merger_Acquisition,
        Answer2_Merger_Acquisition,
        Answer3_Merger_Acquisition,
        Answer1_Sports_Law,
        Answer2_Sports_Law,
        Answer3_Sports_Law,
        Answer1_Intellectual_Property_Rights,
        Answer2_Intellectual_Property_Rights,
        Answer3_Intellectual_Property_Rights,
        Answer1_Labour_Laws,
        Answer2_Labour_Laws,
        Answer3_Labour_Laws,
        Answer1_International_Business_Law,
        Answer2_International_Business_Law,
        Answer3_International_Business_Law,
        Answer1_Startup_in_India_related_legal_Question,
        Answer2_Startup_in_India_related_legal_Question,
        Answer3_Startup_in_India_related_legal_Question,
        Answer1_Insurance_Law,
        Answer2_Insurance_Law,
        Answer3_Insurance_Law,
        Answer1_Joint_Venture_Public_private_partnership_and_MSME,
        Answer2_Joint_Venture_Public_private_partnership_and_MSME,
        Answer3_Joint_Venture_Public_private_partnership_and_MSME,
        Answer1_Tax_Law,
        Answer2_Tax_Law,
        Answer3_Tax_Law,
        Answer1_ARBITRATION,
        Answer2_ARBITRATION,
        Answer3_ARBITRATION,
        Answer4_ARBITRATION,
        Answer5_ARBITRATION,
        Answer1_IBC,
        Answer2_IBC,
        Answer3_IBC,
        Answer1_Competitive_and_Anti_Trust,
        Answer1_AVIATION_LAW,
        Answer2_AVIATION_LAW,
        Answer3_AVIATION_LAW,
        Answer4_AVIATION_LAW,
        Answer1_Environment,
        Answer2_Environment,
        Answer3_Environment,
        Answer4_Environment,
        Answer5_Environment,
        Answer1_Public_Policy,
        Answer2_Public_Policy,
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
            Answer1_Entertainment_and_Media_Law,
            Answer2_Entertainment_and_Media_Law,
            Answer3_Entertainment_and_Media_Law,
            Answer1_Capital_Market_Securities,
            Answer1_Banking_Law,
            Answer2_Banking_Law,
            Answer3_Banking_Law,
            Answer1_Mediation_and_Conciliation,
            Answer2_Mediation_and_Conciliation,
            Answer3_Mediation_and_Conciliation,
            Answer1_Merger_Acquisition,
            Answer2_Merger_Acquisition,
            Answer3_Merger_Acquisition,
            Answer1_Sports_Law,
            Answer2_Sports_Law,
            Answer3_Sports_Law,
            Answer1_Intellectual_Property_Rights,
            Answer2_Intellectual_Property_Rights,
            Answer3_Intellectual_Property_Rights,
            Answer1_Labour_Laws,
            Answer2_Labour_Laws,
            Answer3_Labour_Laws,
            Answer1_International_Business_Law,
            Answer2_International_Business_Law,
            Answer3_International_Business_Law,
            Answer1_Startup_in_India_related_legal_Question,
            Answer2_Startup_in_India_related_legal_Question,
            Answer3_Startup_in_India_related_legal_Question,
            Answer1_Insurance_Law,
            Answer2_Insurance_Law,
            Answer3_Insurance_Law,
            Answer1_Joint_Venture_Public_private_partnership_and_MSME,
            Answer2_Joint_Venture_Public_private_partnership_and_MSME,
            Answer3_Joint_Venture_Public_private_partnership_and_MSME,
            Answer1_Tax_Law,
            Answer2_Tax_Law,
            Answer3_Tax_Law,
            Answer1_ARBITRATION,
            Answer2_ARBITRATION,
            Answer3_ARBITRATION,
            Answer4_ARBITRATION,
            Answer5_ARBITRATION,
            Answer1_IBC,
            Answer2_IBC,
            Answer3_IBC,
            Answer1_Competitive_and_Anti_Trust,
            Answer1_AVIATION_LAW,
            Answer2_AVIATION_LAW,
            Answer3_AVIATION_LAW,
            Answer4_AVIATION_LAW,
            Answer1_Environment,
            Answer2_Environment,
            Answer3_Environment,
            Answer4_Environment,
            Answer5_Environment,
            Answer1_Public_Policy,
            Answer2_Public_Policy,
            id, // Pass the ID for the row to update
        ]);

        res.status(201).json({ message: "Final step data updated successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

