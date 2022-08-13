import patientEntries from "../data/patientEntries";
import {NewPatientEntry, NonSensitivePatients, PatientEntry} from "../types/types";
const { v1: uuid } = require('uuid')

const getEntries = (): PatientEntry[] => {
    return patientEntries;
};

const addPatient = ( entry : NewPatientEntry) : PatientEntry => {
    const newPatientEntry = {
        id : uuid(),
        ...entry
    };
    patientEntries.push(newPatientEntry)
    return newPatientEntry
};

const getNonSensitiveEntries = (): NonSensitivePatients[] => {
    return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) =>
        ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }));
};

export default {
    getEntries,
    addPatient,
    getNonSensitiveEntries
};