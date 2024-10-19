import express from 'express';
import PrefixController from '../controllers/prefixController.js';

const router = express.Router();

// เช่น localhost:4200/api/prefixs/ ปรับ postman เป็น GET
// Get all prefixs (GET /api/prefixs/)
router.get('/', async (req, res) => {
  try {
    const data = await PrefixController.getAllPrefix();
    res.status(200).json({ status: '200', result: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: '500', result: 'Server Error' });
  }
});

// params เติมเลขหลังลิงก์ เช่น localhost:4200/api/prefixs/1 ปรับ postman เป็น GET
// Get prefixs by ID (GET /api/prefixs/:id)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ status: '400', result: 'ID is required.' });
  }
  try {
    const data = await PrefixController.getPrefixById(id);
    if (data != null) {
      res.status(200).json({ status: '200', result: data });
    } else {
      res.status(400).json({ code: '400', description: 'not found' });
    }
  } catch (err) {
    res.status(500).json({ status: '500', result: 'Server Error' });
  }
});

// เช่น localhost:4200/api/prefixs/ ปรับ postman เป็น CREATE
// Create a new prefixs (POST /api/prefixs/)
router.post('/', async (req, res) => {
  const prefixData = {
    name: req.body.name,
  };
  if (!req.body.name) {
    res.status(400).json({ status: '400', result: 'name is required.' });
  }
  try {
    const checkName = await PrefixController.CheckPrefixName(prefixData)
    if (!checkName) {
      const data = await PrefixController.createPrefix(prefixData);
      res.status(200).json({ status: 200, result: data });
    } else {
      res.status(400).json({ status: '400', result: 'Error' });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Server Error' });
  }
});

// เช่น localhost:4200/api/prefixs/1 ปรับ postman เป็น UPDATE หรือ PATCH
// Update a prefix by ID (UPDATE /api/prefixs/:id)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const prefixData = {
    name: req.body.name,
  };

  if (!id) {
    res.status(400).json({ status: '400', result: 'Need input' });
  }
  try {
    const checkName = await PrefixController.CheckPrefixName(prefixData)
    if (!checkName) {
      const data = await PrefixController.updatePrefix(id, prefixData);
      res.status(201).json({ status: '201', result: data });
    }
    else {
      res.status(400).json({ status: '400', result: 'Error' });
    }

  } catch (err) {
    res.status(500).json({ status: '500', result: 'Server Error' });
  }
})

// เช่น localhost:4200/api/prefixs/1 ปรับ postman เป็น DELETE
// Force delete prefix from database (DELETE /api/prefixs/1)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ status: '400', result: 'ID is requires.' })
  }
  try {
    const data = await PrefixController.DeletePrefix(id);
    res.status(200).json({ status: '200', result: data, desc: 'Deleted completed' });
  } catch (err) {
    res.status(500).json({ status: '500', result: 'Server Error' });
  }
})

export default router;
