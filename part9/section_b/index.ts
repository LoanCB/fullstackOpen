import express from 'express';
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get('/hello', (_request, response) => {
    response.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    const {height, weight} = req.query;
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        const bmi = calculateBmi(Number(height), Number(weight));
        res.status(200).send(bmi);
    } else {
        res.status(400).send({error: 'malformatted parameters'});
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const daily_exercises = req.body.daily_exercises as number[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = req.body.target as number;

    if (!target || !daily_exercises)
        return res.status(400).json({error: "parameters missing"});
    if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || !daily_exercises.every((element) => !isNaN(Number(element))))
        return res.status(400).json({error: "mal formatted parameters"});

    const result = calculateExercises(target, daily_exercises);
    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
