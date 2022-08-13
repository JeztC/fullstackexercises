import diagnoseEntries from "../data/diagnoseEntries";
import {DiagnoseEntry, NonSensitiveDiagnoses} from "../types/types";

const getEntries = (): DiagnoseEntry[] => {
    return diagnoseEntries;
}

const addDiagnose = () => {
    return null
}

const getNonSensitiveDiagnoses = (): NonSensitiveDiagnoses[] => {
    return diagnoseEntries.map(({code, name}) =>
        ({
            code,
            name
        }));
};

const findById = (id: string): DiagnoseEntry | undefined => {
    const entry = diagnoseEntries.find(d => d.code === id);
    return entry;
};

export default {
    getEntries,
    addDiagnose,
    getNonSensitiveDiagnoses,
    findById
}