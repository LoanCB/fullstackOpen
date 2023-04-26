import express from "express";
import patientServices from "../services/patientServices";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientServices.getEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientServices.getEntry(req.params.id);
    if (patient)
        res.json(patient);
    else
        res.sendStatus(404).end();
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientServices.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong. ';
        if (error instanceof Error)
            errorMessage += 'Error: ' + error.message;
        res.status(400).send(errorMessage);
    }
});

export default router;
