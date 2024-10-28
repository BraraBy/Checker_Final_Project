import postgres from '../utils/db.js';

const insertStdList = async (attendanceData) => {
    const client = await postgres.connect();
    try {
        for (let record of attendanceData) {
            const { student_id,status } = record;

            // บันทึกข้อมูลเช็คชื่อในฐานข้อมูล
            await client.query(
                `INSERT INTO student_list (student_id, status , section_id)
                 VALUES ($1, $2 , 2);`,
                [student_id, status]
            );
        }
    } catch (err) {
        console.error('Error to Insert :', err);
        throw err;
    } finally {
        client.release();
    }
};

const updateStdList = async (id,student_id, section_id,active_date, status) => {
    const client = await postgres.connect();
    console.log(id,student_id,active_date,status);
    
    try {
        const result = await client.query(
            `UPDATE student_list
             SET status = $2
             WHERE id = $1 RETURNING *`,
            [id,status]
        ); 

        console.log(result);
        

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
        const result = await client.query(`SELECT student_list.id , student_list.student_id , student.first_name , student.last_name , student_list.section_id , student_list.status , student_list.active_date FROM student_list JOIN student on student.id = student_list.student_id ORDER BY id ASC  `);
        return result.rows;
    } catch (err) {
        console.error('Error fetching records:', err);
        throw err;
    } finally {
        client.release();
    }
};

const deleteStdList = async (id) => {
    const client = await postgres.connect();
    try {
      const result = await client.query(
        `DELETE FROM student_list WHERE id = $1 RETURNING *;`, [id]
      );
      return result.rows.length > 0 ? result.rows[0] : 'Not found';
    } catch (err) {
      console.error(`Error deleting Student at ID ${id}:`, err);
      throw err;
    } finally {
      client.release();
    }
  };

  const getTotalStdList = async () => {
    const client = await postgres.connect();
    try {
      const result = await client.query('select count(id) from student_list');
      return result.rows;
    } catch (err) {
      console.error('Error to get all Student_list :', err);
      throw err;
    } finally {
      client.release();
    }
  };


export default { 
    insertStdList, 
    updateStdList, 
    getStdList,
    deleteStdList,
    getTotalStdList

};
