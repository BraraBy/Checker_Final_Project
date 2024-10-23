import postgres from '../utils/db.js';

const insertStdList = async ({ student_id, section_id, status}) => {
    const client = await postgres.connect();
    try {
        const result = await client.query(
            `INSERT INTO student_list (student_id, section_id,status)
             VALUES ($1, $2, $3)
             RETURNING *;`,
            [student_id, section_id, status]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error to Insert :', err);
        throw err;
    } finally {
        client.release();
    }
};

const updateStdList = async (id,student_id, section_id,active_date, status) => {
    const client = await postgres.connect();

    try {
        const result = await client.query(
            `UPDATE student_list
             SET status = $5
             WHERE id = $1 AND student_id = $2 AND section_id = $3 AND active_date = $4 RETURNING *`,
            [id,student_id, section_id,active_date, status]
        );

        if (result.rows.length === 0) {
            return { error: 'No matching record found.' };
        }

        return result.rows[0];
    } catch (err) {
        console.error('Error updating :', err);
        throw err;
    } finally {
        client.release();
    }
};

// Function to retrieve all attendance records
const getStdList = async () => {
    const client = await postgres.connect();
    try {
        const result = await client.query(`SELECT student_list.id , student_list.student_id , student.first_name , student.last_name , student_list.section_id , student_list.status , student_list.active_date FROM student_list JOIN student on student.id = student_list.student_id `);
        return result.rows;
    } catch (err) {
        console.error('Error fetching records:', err);
        throw err;
    } finally {
        client.release();
    }
};

export default { 
    insertStdList, 
    updateStdList, 
    getStdList 
};
