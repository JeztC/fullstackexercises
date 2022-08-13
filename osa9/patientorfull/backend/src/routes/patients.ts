import express from 'express';
import patientService from "../services/patientService";
import {toNewPatientEntry} from "../utils/utils";

const router = express.Router();

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry)
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = req.body;
        const patient = patientService.findById(req.params.id);
        if (patient) {
            const addedEntry = patientService.addEntry(newEntry, patient);
            res.json(addedEntry);
        } else {
            res.sendStatus(404);
        }
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

export default router;