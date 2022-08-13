import express from 'express';
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";
const app = express();
app.use(express.json())

app.post('/exercises', (req, res) => {
    const { target, exercises } = req.body;

    if (!target || !exercises) {
        return res.status(400).send({ error: 'parameters missing'});
    }
    const values = exercises.map((a : string) => Number(a));
    if (isNaN(Number(target)) || values.includes(NaN)) {
        return res.status(400).send({ error: 'malformatted parameters'});
    }
    const result = calculateExercises(Number(target), values);
    return res.send(result);
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!isNaN(height) && !isNaN(weight)) {
        res.json(calculateBmi(height, weight));
    } else {
        res.json({error: "malformatted parameters"});
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});