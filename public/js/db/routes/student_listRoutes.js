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

// POST route for marking attendance in student_list
// rt.post('/', async (req, res) => {
//     try {
//         const { student_id, section_id, status} = req.body;
//         const result = await Controller.insertStdList({
//             student_id,
//             section_id,
//             status
//         });

//         return res.status(200).json({ status: '200', result });
//     } catch (error) {
//         console.error('Error :', error);
//         return res.status(500).json({ status: '500', message: 'Server Error' });
//     }
// });

rt.post('/', async (req, res) => {
    try {
        const attendanceDataRaw = req.body.attendanceData;

        // ตรวจสอบว่ามีข้อมูลที่ถูกส่งมา
        if (!attendanceDataRaw) {
            return res.status(400).json({ status: '400', message: 'No attendance data provided' });
        }

        // แปลง JSON เป็น object
        let attendanceData;
        try {
            attendanceData = JSON.parse(attendanceDataRaw);
        } catch (parseError) {
            return res.status(400).json({ status: '400', message: 'Invalid JSON format' });
        }
        
        await Controller.insertStdList(attendanceData);

        return res.status(200).json({ status: '200', message: 'Attendance recorded successfully' });
    } catch (error) {
        console.error('Error :', error);
        return res.status(500).json({ status: '500', message: 'Server Error' });
    }
});




rt.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { student_id, section_id, status ,active_date} = req.body;

        const result = await Controller.updateStdList(id,student_id, section_id,active_date, status);

        if (result.error) {
            return res.status(400).json({ status: '400', message: result.error });
        }

        return res.status(200).json({ status: '200', result });
    } catch (error) {
        console.error('Error to updating :', error);
        return res.status(500).json({ status: '500', message: 'Error to updating ' });
    }
});




export default rt;
