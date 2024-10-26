import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/' , (req , res)=>{
    res.render('login');
});

app.get('/index' , async (req , res)=>{
    const total = await getTotal();
    res.render('index', {total});
});

app.get('/buttons' , (req , res)=>{
    res.render('buttons');
});

app.get('/checker' , (req , res)=>{
    res.render('checker');
});
 
app.get('/register' , (req , res)=>{
    res.render('register');
});

app.get('/tables' , (req , res)=>{
    res.render('tables');
});

async function getTotal() {
    try {
        const response = await fetch('http://localhost:3100/api/student/total');
        const data = await response.json();
        return data.result[0].count; 
    } catch (error) {
        console.error('Error fetching total:', error);
        return 0;  
    }
}



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});