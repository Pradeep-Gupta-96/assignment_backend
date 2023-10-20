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
    last_internship_details = $11,
    publications = $12
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


export const getAllTodoQuery = "SELECT * FROM todo";

export const getTodoByIdQuery = "SELECT * FROM todo WHERE id = $1;"

// SQL Query to delete a todo by ID
export const deleteTodoByIdQuery = "DELETE FROM todo WHERE id = $1";

