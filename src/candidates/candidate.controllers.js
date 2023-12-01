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

    //  Define an array of field names
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

    // Initialize count
    let totalCount = 0;

    // Check each answer and increment count if it matches
    if (Aptitude_answer1 === "D. A’s son") totalCount++;
    if (Aptitude_answer2 === "C. India seriously commended the achievements of Russia, i.e., hundred percent literacy and rapid industrialization.") totalCount++;
    if (Aptitude_answer3 === "B. Applauding") totalCount++;
    if (Aptitude_answer4 === "B. Rapid growth of nuclear weapons in Russia") totalCount++;
    if (Aptitude_answer5 === "D. Analytical") totalCount++;
    if (Aptitude_answer6 === "A. LEPEHATN") totalCount++;
    if (Aptitude_answer7 === "A. 50") totalCount++;
    if (Aptitude_answer8 === "B. 2 Only") totalCount++;
    if (Aptitude_answer9 === "B. Unemployment must be seen as a function of rising education and aspirations of young Indians.") totalCount++;
    if (Aptitude_answer10 === "B. It is not desirable to have Governments managed by empirical statesmen unless well mixed with others who are grounded in learning and reflect wisdom.") totalCount++;

    console.log("Step 2:-", totalCount)
    const total_marks = totalCount

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
            total_marks,
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

    const checkWords = [
        "Cultural competence",
        "Negotiation and mediation",
        "Strong communication skills",
        "Time management",
        "Problem-solving ability",
        "Legal current affairs",
        "Legal evidence",
        "Ethics",
        "Legal procedure",
        "Legal technology",
        "Case analysis",
        "Logical reasoning",
        "Contract law",
        "Torts",
        "Constitutional law",
        "Legal history",
        "International law",
        "Legal procedure",
        "Problem-solving ability",
        "Communication skills",
        "Negotiation",
        "Mediation",
        "Equity and diversion",
        "Professional responsibility",
        "Integrity"
    ];

    // Function to count matching words
    const countMatchingWords = (answer, wordsToCheck) => {
        const matchingWords = wordsToCheck.filter(word => answer.includes(word));
        return matchingWords.length;
    };

    // Process each answer asynchronously
    const matchingWordsCount1 = countMatchingWords(Answer1, checkWords);
    const count1 = matchingWordsCount1 >= 4 && matchingWordsCount1 <= 6 ? 2 : (matchingWordsCount1 > 6 ? 3 : 0);

    const matchingWordsCount2 = countMatchingWords(Answer2, checkWords);
    const count2 = matchingWordsCount2 >= 4 && matchingWordsCount2 <= 6 ? 2 : (matchingWordsCount2 > 6 ? 3 : 0);

    const matchingWordsCount3 = countMatchingWords(Answer3, checkWords);
    const count3 = matchingWordsCount3 >= 4 && matchingWordsCount3 <= 6 ? 2 : (matchingWordsCount3 > 6 ? 3 : 0);

    // Calculate total count
    const totalCount = count1 + count2 + count3;

    console.log("Step 3:-", totalCount)

    try {

        // Retrieve the current total_marks from the database
        const currentData = await pool.query(`SELECT total_marks FROM todo WHERE ID = $1`, [id]);
        const currentTotalMarks = currentData.rows[0].total_marks || 0; // Get the current total_marks

        const newTotalMarks = currentTotalMarks + totalCount; // Add the new totalCount to the current total_marks

        const result = await pool.query(insertTodoQuery3, [
            Answer1,
            Answer2,
            Answer3,
            newTotalMarks, // Use the updated total_marks value
            id, // Pass the ID for the row to update
        ]);

        res.status(201).json({ message: "Step 3 data created successfully", todo: result.rows[0], totalCount });
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

    // Initialize count
    let totalCountPartA = 0;
    // Check each answer and increment count if it matches
    if (answer1_part_a === "1") totalCountPartA++;
    if (answer2_part_a === "2") totalCountPartA++;
    if (answer3_part_a === "3") totalCountPartA++;
    if (answer4_part_a === "1") totalCountPartA++;
    if (answer5_part_a === "4") totalCountPartA++;
    if (answer6_part_a === "3") totalCountPartA++;
    if (answer7_part_a === "5") totalCountPartA++;
    if (answer8_part_a === "8") totalCountPartA++;
    if (answer9_part_a === "2") totalCountPartA++;
    if (answer10_part_a === "1") totalCountPartA++;
    if (answer11_part_a === "1") totalCountPartA++;
    if (answer12_part_a === "1") totalCountPartA++;
    if (answer13_part_a === "4") totalCountPartA++;
    if (answer14_part_a === "1") totalCountPartA++;

    // Initialize count
    let totalCountPartD = 0;
    // Check each answer and increment count if it matches
    if (answer1_part_d === "2") totalCountPartD++;
    if (answer2_part_d === "4") totalCountPartD++;
    if (answer3_part_d === "1") totalCountPartD++;
    if (answer4_part_d === "2") totalCountPartD++;
    if (answer5_part_d === "4") totalCountPartD++;
    if (answer6_part_d === "1") totalCountPartD++;
    if (answer7_part_d === "2") totalCountPartD++;
    if (answer8_part_d === "2") totalCountPartD++;
    if (answer9_part_d === "1") totalCountPartD++;
    if (answer10_part_d === "1") totalCountPartD++;

    // Initialize count
    let totalCountInterestbased = 0;

    // Check each answer and increment count if it matches
    if (answer1_entertainment_and_media_law === "2") totalCountInterestbased++;
    if (answer2_entertainment_and_media_law === "1") totalCountInterestbased++;
    if (answer3_entertainment_and_media_law === "3") totalCountInterestbased++;
    if (answer1_capital_market_securities === "5") totalCountInterestbased++;
    if (answer1_banking_law === "1") totalCountInterestbased++;
    if (answer2_banking_law === "2") totalCountInterestbased++;
    if (answer3_banking_law === "4") totalCountInterestbased++;
    if (answer1_mediation_and_conciliation === "4") totalCountInterestbased++;
    if (answer2_mediation_and_conciliation === "4") totalCountInterestbased++;
    if (answer3_mediation_and_conciliation === "4") totalCountInterestbased++;
    if (answer1_merger_acquisition === "1") totalCountInterestbased++;
    if (answer2_merger_acquisition === "4") totalCountInterestbased++;
    if (answer3_merger_acquisition === "4") totalCountInterestbased++;
    if (answer1_sports_law === "4") totalCountInterestbased++;
    if (answer2_sports_law === "4") totalCountInterestbased++;
    if (answer3_sports_law === "2") totalCountInterestbased++;
    if (answer1_intellectual_property_rights === "1") totalCountInterestbased++;
    if (answer2_intellectual_property_rights === "2") totalCountInterestbased++;
    if (answer3_intellectual_property_rights === "2") totalCountInterestbased++;
    if (answer1_labour_laws === "4") totalCountInterestbased++;
    if (answer2_labour_laws === "4") totalCountInterestbased++;
    if (answer3_labour_laws === "4") totalCountInterestbased++;
    if (answer1_international_business_law === "4") totalCountInterestbased++;
    if (answer2_international_business_law === "3") totalCountInterestbased++;
    if (answer3_international_business_law === "4") totalCountInterestbased++;
    if (answer1_startup_in_india_related_legal_question === "4") totalCountInterestbased++;
    if (answer2_startup_in_india_related_legal_question === "4") totalCountInterestbased++;
    if (answer3_startup_in_india_related_legal_question === "4") totalCountInterestbased++;
    if (answer1_insurance_law === "4") totalCountInterestbased++;
    if (answer2_insurance_law === "3") totalCountInterestbased++;
    if (answer3_insurance_law === "4") totalCountInterestbased++;
    if (answer1_joint_venture_public_private_partnership_and_msme === "4") totalCountInterestbased++;
    if (answer2_joint_venture_public_private_partnership_and_msme === "3") totalCountInterestbased++;
    if (answer3_joint_venture_public_private_partnership_and_msme === "4") totalCountInterestbased++;
    if (answer1_tax_law === "4") totalCountInterestbased++;
    if (answer2_tax_law === "2") totalCountInterestbased++;
    if (answer3_tax_law === "2") totalCountInterestbased++;
    if (answer1_arbitration === "4") totalCountInterestbased++;
    if (answer2_arbitration === "2") totalCountInterestbased++;
    if (answer3_arbitration === "1") totalCountInterestbased++;
    if (answer4_arbitration === "2") totalCountInterestbased++;
    if (answer5_arbitration === "1") totalCountInterestbased++;
    if (answer1_ibc === "4") totalCountInterestbased++;
    if (answer2_ibc === "4") totalCountInterestbased++;
    if (answer3_ibc === "3") totalCountInterestbased++;
    if (answer1_competitive_and_anti_trust === "2") totalCountInterestbased++;
    if (answer1_aviation_law === "1") totalCountInterestbased++;
    if (answer2_aviation_law === "1") totalCountInterestbased++;
    if (answer3_aviation_law === "4") totalCountInterestbased++;
    if (answer4_aviation_law === "4") totalCountInterestbased++;
    if (answer1_environment === "4") totalCountInterestbased++;
    if (answer2_environment === "4") totalCountInterestbased++;
    if (answer3_environment === "4") totalCountInterestbased++;
    if (answer4_environment === "3") totalCountInterestbased++;
    if (answer5_environment === "1") totalCountInterestbased++;
    if (answer1_public_policy === "2") totalCountInterestbased++;
    if (answer2_public_policy === "3") totalCountInterestbased++;


    const checkWords_answer1_part_b = [
        "Cultural competence",
        "Negotiation and mediation",
        "Strong communication skills",
        "Time management",
        "Problem-solving ability",
        "Legal current affairs",
        "Legal evidence",
        "Ethics",
        "Legal procedure",
        "Legal technology",
        "Case analysis",
        "Logical reasoning",
        "Contract law",
        "Torts",
        "Constitutional law",
        "Legal history",
        "International law",
        "Legal procedure",
        "Problem-solving ability",
        "Communication skills",
        "Negotiation",
        "Mediation",
        "Equity and diversion",
        "Professional responsibility",
        "Integrity"
    ];

    const checkWords_answer2_part_b = [
        "Article 14",
        "Financial creditor",
        "Operational creditor",
        "Case laws",
        "Intelligible differentia",
        "Constitution of India",
        "Discriminatory",
        "Classification",
        "Relevant case laws"
        // Add more relevant keywords as needed
    ];

    const checkWords_answer3_part_b = [
        "Resolution Professional",
        "Insolvency and Bankruptcy Code",
        "Corporate Debtor",
        "Corporate Insolvency Resolution Process",
        "CIRP operations",
        "Revival",
        "Statutorily required conduct",
        // Add more relevant keywords as needed
    ];


    // Function to count matching words
    const countMatchingWords = (answer, wordsToCheck) => {
        const matchingWords = wordsToCheck.filter(word => answer.includes(word));
        return matchingWords.length;
    };

    // Process each answer asynchronously part b
    const matchingWordsCountb1 = countMatchingWords(answer1_part_b, checkWords_answer1_part_b);
    const countb1 = matchingWordsCountb1 >= 4 && matchingWordsCountb1 <= 6 ? 2 : (matchingWordsCountb1 > 6 ? 3 : 0);

    const matchingWordsCountb2 = countMatchingWords(answer2_part_b, checkWords_answer2_part_b);
    const countb2 = matchingWordsCountb2 >= 4 && matchingWordsCountb2 <= 6 ? 2 : (matchingWordsCountb2 > 6 ? 3 : 0);

    const matchingWordsCountb3 = countMatchingWords(answer3_part_b, checkWords_answer3_part_b);
    const countb3 = matchingWordsCountb3 >= 4 && matchingWordsCountb3 <= 6 ? 2 : (matchingWordsCountb3 > 6 ? 3 : 0);

    // Calculate total count b
    const totalCountPartB = countb1 + countb2 + countb3;

    const checkWords_answer1_part_c = [
        "Article 32 of the Constitution",
        "Writ Petition",
        "Fundamental rights",
        "Infringement",
        "Chief Justice of India",
        "Bonded labour system",
        "Prevalence",
        "Disney Land",
        "Factory units",
        "Inhuman conditions",
        "Investigation",
        "Legal aspects",
    ];

    const checkWords_answer2_part_c = [
        "Patent protection",
        "Biotechnology",
        "Gene formation",
        "Life expectancy",
        "Anti-aging",
        "Disease",
        "De novo gene formation",
        "State-of-the-art technology",
        "India",
        "Legal experts",
        "Invent",
        "Technology",
    ];

    const checkWords_answer3_part_c = [
        "Companies Act, 2013",
        "Toon town",
        "Amusement park",
        "Shareholders",
        "Promoters",
        "Directors",
        "Liabilities",
        "Legal actions",
        "Mortgages",
        "Property",
        "Incorporate",
        "Company",
    ];


    // Process each answer asynchronously part c
    const matchingWordsCountc1 = countMatchingWords(answer1_part_c, checkWords_answer1_part_c);
    const countc1 = matchingWordsCountc1 >= 4 && matchingWordsCountc1 <= 6 ? 2 : (matchingWordsCountc1 > 6 ? 3 : 0);

    const matchingWordsCountc2 = countMatchingWords(answer2_part_c, checkWords_answer2_part_c);
    const countc2 = matchingWordsCountc2 >= 4 && matchingWordsCountc2 <= 6 ? 2 : (matchingWordsCountc2 > 6 ? 3 : 0);

    const matchingWordsCountc3 = countMatchingWords(answer3_part_c, checkWords_answer3_part_c);
    const countc3 = matchingWordsCountc3 >= 4 && matchingWordsCountc3 <= 6 ? 2 : (matchingWordsCountc3 > 6 ? 3 : 0);

    // Calculate total count c
    const totalCountPartC = countc1 + countc2 + countc3;

    console.log("Text Area:-", totalCountPartB + totalCountPartC)
    console.log("Ckeck Box:-", totalCountPartA + totalCountPartD + totalCountInterestbased)
    const totalCount = totalCountPartB + totalCountPartC + totalCountPartA + totalCountPartD + totalCountInterestbased
    
    try {
        // Retrieve the current total_marks from the database
        const currentData = await pool.query(`SELECT total_marks FROM todo WHERE ID = $1`, [id]);
        const currentTotalMarks = currentData.rows[0].total_marks || 0; // Get the current total_marks

        const newTotalMarks = currentTotalMarks + totalCount; // Add the new totalCount to the current total_marks

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
            newTotalMarks,
            id, // Pass the ID for the row to update
        ]);

        res.status(201).json({ message: "Final step data updated successfully", todo: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

