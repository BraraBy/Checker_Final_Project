import express from 'express'; // Library HTTP request
import dotenv from 'dotenv'; 
import cors from 'cors'; // โหลด Middleware
dotenv.config({ path: 'setting.env' });  // โหลดไฟล์ setting 

const app = express();
const port = process.env.WEB_PORT;
const projectName = process.env.PROJECT_NAME;

import alive from './utils/alive.js';
import prefixRoutes from './routes/prefixRoutes.js'
// import exampleRoutes from './routes/exampleRoutes.js'

app.use(cors());  // ไว้เปิดช่องให้สามารถดึง api จากฝั่งหน้าบ้านได้
app.use(express.json());  // Middleware ให้ระบบรองรับ การรับค่าเข้ามาได้โดยใช้ไฟล์ JSON
app.use(express.urlencoded({ extended: true }));  // Middleware ให้ระบบรองรับ การรับค่าเข้ามาได้โดยใช้ไฟล์ urlencoded
 
// Use student routes
app.use('/api/prefixs', prefixRoutes);            // localhost:4200/api/prefixs/
// app.use('/api/example', exampleRoutes);        // localhost:4200/api/example/

// Base route
app.get('/', (req, res) => {
  res.send(alive);
});

// Start the server
app.listen(port, () => {
  console.log(`Compiled successfully!`);
  console.log(`You can now view ${projectName} in the postman or browser.`);
  console.log(`  `);
  console.log(`  Local: http://localhost:${port}`);
  console.log(`  `);
});

