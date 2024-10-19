import postgres from '../../utils/db.js';

let result = '';

const getAllSection = async () => {
    const client = await postgres.connect();
    try {
        result = await client.query('SELECT * FROM section ;');
        return result.rows;
    } catch (err) {
        console.error('Error fetching all sections :', err);
        throw err;
    } finally {
        client.release();
    }
};

const getSectionById = async (id) => {
    const client = await postgres.connect();
    try {
        result = await client.query('SELECT * FROM section WHERE id = $1;', [id]);
        console.log(result);
        return result.rows;
    } catch (err) {
        console.error(`Error fetching section at ID ${id} :`, err);
        throw err;
    } finally {
        client.release();
    }
};

const getSectionByName = async (data) => {
    const client = await postgres.connect();
    const { name } = data;
    try {
        result = await client.query('SELECT * FROM section WHERE section = $1 and isdelete = FALSE;', [name]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error(`Error fetching section with name ${name}:`, err);
        throw err;
    } finally {
        client.release();
    }
};

const CheckSection = async (data) => {
    const client = await postgres.connect();
    const { name } = data;
    try {
        const result = await client.query(
            'SELECT * FROM section WHERE section = $1',
            [name]
        );
        return result.rows.length > 0;
    } catch (err) {
        console.error('Error checking Section :', err);
        throw err;
    } finally {
        client.release();
    }
};

const createSection = async (data) => {
    const { name } = data;
    const client = await postgres.connect();

    try {
        const result = await client.query(
            `INSERT INTO section (section, isdelete)
             VALUES ($1, $2)
             RETURNING *;`,
            [name, false ]
        );
        return result.rows;
    } catch (err) {
        console.error(`Error creating new Section at ${name} :`, err);
        throw err;
    } finally {
        client.release();
    }
};

const updateSection = async (id, data) => {
    const { name } = data;
    const client = await postgres.connect();
    try {
        const result = await client.query(
            `UPDATE section
             SET section = $1
             WHERE id = $2
             RETURNING *;`,
            [name, id]
        );
        return result.rows.length > 0 ? result.rows : 'Section not found';
    } catch (err) {
        console.error(`Error updating Section at ID ${id}:`, err);
        throw err;
    } finally {
        client.release();
    }
};

const DeleteSection = async (id) => {
    const client = await postgres.connect();
    try {
        const result = await client.query(
            `DELETE FROM section WHERE id = $1 RETURNING *;`, [id]
        );
        return result.rows.length > 0 ? result.rows[0] : 'Section not found';
    } catch (err) {
        console.error(`Error deleting Section at ID ${id}:`, err);
        throw err;
    } finally {
        client.release();
    }
};

export default {
    getAllSection,
    getSectionById,
    createSection,
    updateSection,
    getSectionByName,
    CheckSection,
    DeleteSection
};