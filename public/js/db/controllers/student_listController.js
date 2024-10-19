import postgres from '../../utils/db.js';  // Assuming you have your Postgres client set up

// Function to mark attendance in student_list
const markStudentList = async ({ student_id, section_id, attendance_date , status}) => {
    const client = await postgres.connect();
    try {
        const result = await client.query(
            `INSERT INTO student_list (student_id, section_id, subject_id, attendance_date, status)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *;`,
            [student_id, section_id, subject_id, attendance_date, status]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error marking student_list:', err);
        throw err;
    } finally {
        client.release();
    }
};

// Function to update attendance within 2-hour window
const updateStudentList = async ({student_id, section_id, subject_id, attendance_date, status }) => {
    const client = await postgres.connect();

    try {
        const studentListResult = await client.query(
            `SELECT createdat FROM student_list
             WHERE student_id = $1 AND section_id = $2 AND attendance_date = $3`,
            [student_id, section_id, attendance_date]
        );

        if (studentListResult.rows.length === 0) {
            return { error: 'Record not found' };
        }

        const createdAt = studentListResult.rows[0].createdat;
        const now = new Date();
        const timeDifference = Math.abs(now - new Date(createdAt)) / (1000 * 60 * 60);

        if (timeDifference > 2) {
            return { error: 'You can only update attendance within 2 hours of creation.' };
        }

        const result = await client.query(
            `UPDATE student_list
             SET status = $1, updatedat = CURRENT_TIMESTAMP
             WHERE student_id = $2 AND section_id = $3 AND  attendance_date = $4
             RETURNING *`,
            [status,  student_id, section_id, attendance_date]
        );

        return result.rows[0];
    } catch (err) {
        console.error('Error updating :', err);
        throw err;
    } finally {
        client.release();
    }
};

// Function to retrieve all attendance records
const getStudentList = async () => {
    const client = await postgres.connect();
    try {
        const result = await client.query(`SELECT * FROM student_list ORDER BY attendance_date DESC`);
        return result.rows;
    } catch (err) {
        console.error('Error fetching records:', err);
        throw err;
    } finally {
        client.release();
    }
};

export default { markStudentList, updateStudentList, getStudentList };