import {Gender, NewDiaryEntry, NewPatientEntry, Visibility, Weather} from "../types/types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !hasGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
}

const hasGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};

const isWeather = (param: any): param is Weather => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Weather).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}

const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing comment');
    }

    return string;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    };
    return newEntry;
};

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
    const newEntry: NewDiaryEntry = {
        comment: parseString(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility)
    };

    return newEntry;
};

export {toNewPatientEntry, toNewDiaryEntry};