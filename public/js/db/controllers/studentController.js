import postgres from '../utils/db.js';

let result = '';

const getAllStd = async () => {
  const client = await postgres.connect();
  try {
    result = await client.query('SELECT student.id , prefix.name ,student.first_name , student.last_name ,student.date_of_birth, curriculum.short_name_th , student.sex , student.previous_school , student.address , student.telephone , student.email , student.line_id , student.status FROM student JOIN prefix ON student.prefix_id = prefix.id JOIN curriculum ON student.curriculum_id = curriculum.id');
    return result.rows;
  } catch (err) {
    console.error('Error to get all Students :', err);
    throw err;
  } finally {
    client.release();
  }
};

const getTotal = async () => {
  const client = await postgres.connect();
  try {
    result = await client.query('select count(id) from student');
    return result.rows;
  } catch (err) {
    console.error('Error to get all Students :', err);
    throw err;
  } finally {
    client.release();
  }
};

const getStdById = async (id) => {
  const client = await postgres.connect();
  try {
    result = await client.query('SELECT * FROM student WHERE id = $1;', [id]);
    return result.rows;
  } catch (err) {
    console.error(`Error to get Student ID ${id}:`, err);
    throw err;
  } finally {
    client.release();
  }
};

// Get Prefix by Name. Only returns prefix where isDelete is false.
const getStdByName = async (data) => {
  const client = await postgres.connect();
  const { name } = data;
  try {
    result = await client.query('SELECT * FROM student WHERE name = $1;', [name]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (err) {
    console.error(`Error to get Student name ${name}:`, err);
    throw err;
  } finally {
    client.release();
  }
};

const checkStdName = async (data) => {
  const client = await postgres.connect();
  const { name } = data;
  try {
    const result = await client.query(
      'SELECT * FROM student WHERE id = $1 ;',
      [name]
    );
    return result.rows.length > 0;
  } catch (err) {
    console.error('Error checking for duplicate student name:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Create new Prefix record.
// Create new Student
const createStd = async (data) => {
    const { id, prefix_id, first_name, last_name, date_of_birth, sex, curriculum_id, previous_school, address, telephone, email, line_id, status } = data;
    const client = await postgres.connect();
    try {
      const result = await client.query(
          `INSERT INTO student ( id, prefix_id, first_name, last_name, date_of_birth, sex, curriculum_id, previous_school, address, telephone, email, line_id, status)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
               RETURNING *;`,
          [id,prefix_id, first_name, last_name, date_of_birth, sex, curriculum_id, previous_school, address, telephone, email, line_id, status]
      );
      return result.rows;
    } catch (err) {
      console.error('Error creating new Student:', err);
      throw err;
    } finally {
      client.release();
    }
  };

// Update Student
const updateStd = async (id, data) => {
    const { prefix_name, first_name, last_name, date_of_birth, sex, curriculum_name, previous_school, address, telephone, email, line_id, status } = data;
    const client = await postgres.connect();
    try {
      const curriculum = await client.query(
        `SELECT id FROM curriculum WHERE short_name_th = $1 LIMIT 1;`,
        [curriculum_name]
      );

      const prefix = await client.query(
        `SELECT id FROM prefix WHERE name = $1 LIMIT 1;`,
        [prefix_name]
      );

      let curriculum_id = curriculum.rows[0].id;
      
      let prefix_id = prefix.rows[0].id;
      
      const result = await client.query(
          `UPDATE student
               SET prefix_id = $1, first_name = $2, last_name = $3, date_of_birth = $4, sex = $5, curriculum_id = $6, previous_school = $7, address = $8, telephone = $9, email = $10, line_id = $11, status = $12
               WHERE student.id = $13
               RETURNING *;`,
          [prefix_id, first_name, last_name, date_of_birth, sex, curriculum_id, previous_school, address, telephone, email, line_id, status, id]
      );
      
      return result.rows;
    } catch (err) {
      console.error(`Error updating Student at ID ${id}:`, err);
      throw err;
    } finally {
      client.release();
    }
  };


// Force Delete Prefix record.
const deleteStd = async (id) => {
  const client = await postgres.connect();
  try {
    const result = await client.query(
      `DELETE FROM student WHERE id = $1 RETURNING *;`, [id]
    );
    return result.rows.length > 0 ? result.rows[0] : 'Not found';
  } catch (err) {
    console.error(`Error deleting Student at ID ${id}:`, err);
    throw err;
  } finally {
    client.release();
  }
};


export default {
  getAllStd,
  getStdById,
  getStdByName,
  checkStdName,
  createStd,
  updateStd,
  deleteStd,
  getTotal
};
