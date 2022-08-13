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

export default {
    getEntries,
    addDiagnose,
    getNonSensitiveDiagnoses
}