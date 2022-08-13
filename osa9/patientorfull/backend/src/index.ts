import express from 'express';
const app = express();
app.use(express.json());

import diaryRouter from './routes/diaries';
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/patients', patientsRouter);
app.use('/api/diaries', diaryRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});