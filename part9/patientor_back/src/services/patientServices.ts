import patientData from '../../data/patients';
import {NewPatientEntry, Patient, PatientWithoutSsn} from "../types";
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): PatientWithoutSsn[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addEntry = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
    };

    patientData.push(newPatientEntry);
    return newPatientEntry;
};

export default { getEntries, addEntry };
