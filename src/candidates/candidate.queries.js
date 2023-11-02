// SQL Queries
export const createTodoTableQuery = `
CREATE TABLE IF NOT EXISTS todo (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    university VARCHAR(255),
    college VARCHAR(255),
    course_duration VARCHAR(255),
    course VARCHAR(255),
    field_of_interest VARCHAR(255),
    skills VARCHAR(255),
    last_internship_details VARCHAR(255),
    publications TEXT,
    publicationslink VARCHAR(255),
    Class10Education VARCHAR(255),
    Class10_percentage VARCHAR(255),
    Class10_year_of_passing VARCHAR(255),
    Class12Education VARCHAR(255),
    Class12_percentage VARCHAR(255),
    Class12_year_of_passing VARCHAR(255),
    graduation_university VARCHAR(255),
    graduation_percentage VARCHAR(255),
    graduation_year_of_passing VARCHAR(255),
    masters_university VARCHAR(255),
    masters_percentage VARCHAR(255),
    masters_year_of_passing VARCHAR(255),
    LastInternshipDetails VARCHAR(255),
    HaveYouParticipatedinMootCourt VARCHAR(255),
    PreferredLocation VARCHAR(255),
    Answer1 TEXT,
    Answer2 TEXT,
    Answer3 TEXT,
    UploadResume VARCHAR(255),
    Answer1_PartA VARCHAR(255),
    Answer2_PartA VARCHAR(255),
    Answer3_PartA VARCHAR(255),
    Answer4_PartA VARCHAR(255),
    Answer5_PartA VARCHAR(255),
    Answer6_PartA VARCHAR(255),
    Answer7_PartA VARCHAR(255),
    Answer8_PartA VARCHAR(255),
    Answer9_PartA VARCHAR(255),
    Answer10_PartA VARCHAR(255),
    Answer11_PartA VARCHAR(255),
    Answer12_PartA VARCHAR(255),
    Answer13_PartA VARCHAR(255),
    Answer14_PartA VARCHAR(255),
    Answer1_PartB TEXT,
    Answer2_PartB TEXT,
    Answer3_PartB TEXT,
    Answer1_PartC TEXT,
    Answer2_PartC TEXT,
    Answer3_PartC TEXT,
    Answer1_PartD VARCHAR(255),
    Answer2_PartD VARCHAR(255),
    Answer3_PartD VARCHAR(255),
    Answer4_PartD VARCHAR(255),
    Answer5_PartD VARCHAR(255),
    Answer6_PartD VARCHAR(255),
    Answer7_PartD VARCHAR(255),
    Answer8_PartD VARCHAR(255),
    Answer9_PartD VARCHAR(255),
    Answer10_PartD VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const insertTodoQuery1 = `
UPDATE todo
SET
    name = $2,
    email = $3,
    phone = $4,
    university = $5,
    college = $6,
    course_duration = $7,
    course = $8,
    field_of_interest = $9,
    skills = $10,
    publications = $11,
    publicationslink =$12
WHERE
    id = $1
RETURNING *;
`;

export const updateTodoQuery = `
UPDATE todo
SET
    Class10Education = $1,
    Class10_percentage = $2,
    Class10_year_of_passing = $3,
    Class12Education = $4,
    Class12_percentage = $5,
    Class12_year_of_passing = $6,
    graduation_university = $7,
    graduation_percentage = $8,
    graduation_year_of_passing = $9,
    masters_university = $10,
    masters_percentage = $11,
    masters_year_of_passing = $12,
    LastInternshipDetails = $13,
    HaveYouParticipatedinMootCourt = $14,
    PreferredLocation = $15,
    UploadResume = $16
WHERE
    ID = $17
RETURNING *;
`;


export const insertTodoQuery3 = `
    UPDATE todo
    SET
        Answer1 = $1,
        Answer2 = $2,
        Answer3 = $3
    WHERE
        ID = $4
    RETURNING *;
`;

// Define the SQL query for inserting or updating all the fields
export const insertLastRoundDataQuery = `
    UPDATE todo
    SET
        Answer1_PartA=$1,
        Answer2_PartA=$2,
        Answer3_PartA=$3,
        Answer4_PartA=$4,
        Answer5_PartA=$5,
        Answer6_PartA=$6,
        Answer7_PartA=$7,
        Answer8_PartA=$8,
        Answer9_PartA=$9,
        Answer10_PartA=$10,
        Answer11_PartA=$11,
        Answer12_PartA=$12,
        Answer13_PartA=$13,
        Answer14_PartA=$14,
        Answer1_PartB=$15,
        Answer2_PartB=$16,
        Answer3_PartB=$17,
        Answer1_PartC=$18,
        Answer2_PartC=$19,
        Answer3_PartC=$20,
        Answer1_PartD=$21,
        Answer2_PartD=$22,
        Answer3_PartD=$23,
        Answer4_PartD=$24,
        Answer5_PartD=$25,
        Answer6_PartD=$26,
        Answer7_PartD=$27,
        Answer8_PartD=$28,
        Answer9_PartD=$29,
        Answer10_PartD=$30
    WHERE
        ID = $31
    RETURNING *;
`;


export const getAllTodoQuery = "SELECT * FROM todo";

export const getTodoByIdQuery = "SELECT * FROM todo WHERE id = $1;"

// SQL Query to delete a todo by ID
export const deleteTodoByIdQuery = "DELETE FROM todo WHERE id = $1";

