import express from "express";
import patientServices from "../services/patientServices";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientServices.getEntries());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedEntry = patientServices.addEntry({name, dateOfBirth, ssn, gender, occupation});
    res.json(addedEntry);
});

export default router;
