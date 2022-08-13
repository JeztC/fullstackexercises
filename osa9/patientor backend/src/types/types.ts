export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export interface DiagnoseEntry {
    code : string,
    name : string,
    latin?: string;
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
export type NonSensitivePatients = Omit<PatientEntry, 'ssn'>;
export type NonSensitiveDiagnoses = DiagnoseEntry;
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;