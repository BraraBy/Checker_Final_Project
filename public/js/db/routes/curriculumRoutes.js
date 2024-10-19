import express from "express";
import Controller from "../controllers/curriculumController.js";

const router = express.Router();

// Get all curriculums (GET /api/curriculums/)
router.get('/', async (req, res) => {
    try {
        const data = await Controller.getAllCurriculum();
        res.status(200).json({ status: '200', result: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: '500', result: 'Server Error' });
    }
});

// Get curriculums by ID (GET /api/curriculums/:id)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ status: '400', result: 'ID is required.' });
    }
    try {
        const data = await Controller.getCurriculumById(id);
        if (data != null) {
            res.status(200).json({ status: '200', result: data });
        }else {
            res.status(400).json({ code: '400', description: 'not found' });
        }
    } catch (err) {
        res.status(500).json({ status: '500', result: 'Server Error' });
    }
});

// Create a new curriculums (POST /api/curriculums/)
router.post('/', async (req, res) => {
    const info = {
        curr_name_th: req.body.curr_name_th,
        curr_name_en: req.body.curr_name_en,
        short_name_th: req.body.short_name_th,
        short_name_en: req.body.short_name_en
    };

    if (!req.body.curr_name_th || !req.body.curr_name_en || !req.body.short_name_th || !req.body.short_name_en) {
        return res.status(400).json({ status: '400', result: 'All fields are required.' });
    }

    try {
        const checkFullNameTH = await Controller.checkCurriculum(info.curr_name_th, 'curr_name_th');
        const checkFullNameEN = await Controller.checkCurriculum(info.curr_name_en, 'curr_name_en');
        const checkShortNameTH = await Controller.checkCurriculum(info.short_name_th, 'short_name_th');
        const checkShortNameEN = await Controller.checkCurriculum(info.short_name_en, 'short_name_en');
        if (!checkFullNameTH && !checkFullNameEN && !checkShortNameTH && !checkShortNameEN) {
            const data = await Controller.createCurriculum(info);
            return res.status(201).json({ status: 201, result: data });
        } else {
            return res.status(400).json({ status: '400', result: 'Error' });
        }
    } catch (err) {
        console.error("Error : ", err);
        return res.status(500).json({ status: 500, message: 'Server Error' });
    }
});

// Update a curriculums by ID (UPDATE /api/curriculums/:id)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const info = {
        curr_name_th: req.body.curr_name_th,
        curr_name_en: req.body.curr_name_en,
        short_name_th: req.body.short_name_th,
        short_name_en: req.body.short_name_en
    };

    if (!id) {
        res.status(400).json({status:'400',result: 'Need input'});
    }
    try{
        const checkFullNameTH = await Controller.checkCurriculum(info.curr_name_th, 'curr_name_th', id);
        const checkFullNameEN = await Controller.checkCurriculum(info.curr_name_en, 'curr_name_en', id);
        const checkShortNameTH = await Controller.checkCurriculum(info.short_name_th, 'short_name_th', id);
        const checkShortNameEN = await Controller.checkCurriculum(info.short_name_en, 'short_name_en', id);

        if (!checkFullNameTH && !checkFullNameEN && !checkShortNameTH && !checkShortNameEN) {
            const data = await Controller.updateCurriculum(id, info);
            res.status(201).json({ status: '201', result: data });
        }
        else{
            res.status(400).json({ status: '400', result: 'Error' });
        }

    }catch(err){
        res.status(500).json({ status: '500', result: 'Server Error' });
    }
})

// delete curriculums from database
router.delete('/:id',async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ status:'400', result: 'ID is requires.'})
    }
    try{
        const data = await Controller.deleteCurriculum(id);
        res.status(200).json({ status: '200', result: data , desc: 'Deleted completed'});
    } catch (err){
        res.status(500).json({ status: '500', result: 'Server Error'});
    }
})



export default router;