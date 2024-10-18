import postgres from '../utils/db.js';

let result = '';

const getAllExample = async () => {
  const client = await postgres.connect();
  try {
    // result = await client.query('SELECT * FROM example;');
    return result.rows;
  } catch (err) {
    console.error('Error fetching all Examplees:', err);
    throw err;
  } finally {
    client.release();
  }
};

const getExampleById = async (id) => {
  const client = await postgres.connect();
  try {
    // result = await client.query('SELECT * FROM example WHERE id = $1;', [id]);
    return result.rows;
  } catch (err) {
    console.error(`Error fetching Example with ID ${id}:`, err);
    throw err;
  } finally {
    client.release();
  }
};

const createExample = async (data) => {
  const { name } = data;
  const client = await postgres.connect();
  try {
    // result = await client.query(
    //   `INSERT INTO example (name) VALUES ($1) RETURNING *;`, [name]
    // );
    return result.rows;
  } catch (err) {
    console.error(`Error creating new Example with name ${name}:`, err);
    throw err;
  } finally {
    client.release();
  }
};

const updateExample = async (id, data) => {
  const { name } = data;
  const client = await postgres.connect();
  try {
    // const result = await client.query(
    //   `UPDATE example SET name = $1 WHERE id = $2 RETURNING *;`, [name, id]
    // );
    return result.rows.length > 0 ? result.rows : 'Example not found';
  } catch (err) {
    console.error(`Error updating Example with ID ${id}:`, err);
    throw err;
  } finally {
    client.release();
  }
};

const forceDeleteExample = async (id) => {
  const client = await postgres.connect();
  try {
    // const result = await client.query(
    //   `DELETE FROM Example WHERE id = $1 RETURNING *;`, [id]
    // );
    return result.rows.length > 0 ? result.rows[0] : 'Example not found';
  } catch (err) {
    console.error(`Error force deleting Example with ID ${id}:`, err);
    throw err;
  } finally {
    client.release();
  }
};

export default {
  getAllExample,
  getExampleById,
  createExample,
  updateExample,
  forceDeleteExample,
};
