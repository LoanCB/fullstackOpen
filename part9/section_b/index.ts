import express from 'express';
import {calculateBmi} from "./bmiCalculator";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
