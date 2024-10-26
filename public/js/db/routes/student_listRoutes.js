import express from 'express';
import Controller from '../controllers/student_listController.js';

const rt = express.Router();


// GET route to retrieve all attendance records
rt.get('/', async (req, res) => {
    try {
        const stdlist = await Controller.getStdList();
        return res.status(200).json({ status: '200', result: stdlist });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        return res.status(500).json({ status: '500', result: 'Server Error '});
    }
});

rt.post('/', async (req, res) => {
    try {
        // ตรวจสอบว่ามีข้อมูลที่ถูกส่งมา
        const attendanceData = req.body.attendanceData; // แก้ไขที่นี่
        console.log("Received attendance data:", attendanceData);
        
        if (!attendanceData) {
            return res.status(400).json({ status: '400', message: 'No attendance data provided' });
        }

        // ตรวจสอบว่าข้อมูลที่รับมาเป็น array
        if (!Array.isArray(attendanceData)) {
            return res.status(400).json({ status: '400', message: 'Attendance data must be an array' });
        }

        await Controller.insertStdList(attendanceData);

        return res.status(200).json({ status: '200', message: 'Attendance recorded successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ status: '500', message: 'Server Error' });
    }
});



rt.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { student_id, section_id, status ,active_date} = req.body;

        const result = await Controller.updateStdList(id,student_id, section_id,active_date, status);

        if (!student_id || !section_id || !status || !active_date) {
            return res.status(400).json({ status: '400', message: 'Missing required fields' });
        }
        

        if (result.error) {
            return res.status(400).json({ status: '400', message: result.error });
        }

        return res.status(200).json({ status: '200', result });
    } catch (error) {
        console.error('Error to updating :', error);
        return res.status(500).json({ status: '500', message: 'Error to updating ' });
    }
});

rt.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ status:'400', result: 'ID is requires.'})
    }
    try{
        const data = await Controller.deleteStdList(id);
        res.status(200).json({ status: '200', result: data, desc: 'Deleted completed' });
    } catch (err){
        res.status(500).json({ status: '500', result: 'Server Error'});
    }
});




export default rt;
