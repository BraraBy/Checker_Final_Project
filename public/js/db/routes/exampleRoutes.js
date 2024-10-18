import express from 'express';
import ExampleController from '../controllers/exampleController.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await ExampleController.getAllExample();
    res.status(200).json({ status: '200', result: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: '500', result: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await ExampleController.getExampleById(id);
    res.status(200).json({ status: '200', result: data });
  } catch (err) {
    res.status(500).json({ status: '500', result: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const ExampleData = {
    name: req.body.name,
  };

  try {
    const data = await ExampleController.createExample(ExampleData);
    res.status(201).json({ status: 201, result: data });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Error creating Example' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const ExampleData = {
    name: req.body.name,
  };

  try {
    const data = await ExampleController.updateExample(id, ExampleData);
    res.status(201).json({ status: '201', result: data });
  } catch (err) {
    res.status(500).json({ status: '500', result: 'Internal Server Error' });
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const data = await ExampleController.forceDeleteExample(id);
    res.status(201).json({ status: '201', result: data, desc: 'Forces deleted completed.' });
  } catch (err) {
    res.status(500).json({ status: '500', result: 'Internal Server Error' });
  }
})

export default router;
