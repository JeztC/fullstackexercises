import patientEntries from "../data/patientEntries";
import {Entry, NewPatientEntry, NonSensitivePatients, PatientEntry} from "../types/types";
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

const addEntry = (entry: Entry, patient : PatientEntry): PatientEntry => {
    const newPatient = {...patient};
    newPatient.entries.push(entry);
    patientEntries.map(a => a.id === patient.id ? newPatient : a);
    return newPatient
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

const findById = (id: string): PatientEntry | undefined => {
    const entry = patientEntries.find(d => d.id === id);
    return entry;
};

export default {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    findById,
    addEntry
};