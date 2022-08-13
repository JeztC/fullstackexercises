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
    occupation: string,
    entries: Entry[]
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface SickLeave {
    startDate : string,
    endDate: string;
}

interface Discharge {
    date : string,
    criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type : "Hospital"
    discharge : Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare"
    employerName : string
    sickLeave? : SickLeave
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
export type NonSensitivePatients = Omit<PatientEntry, 'entries' | 'ssn'>;
export type NonSensitiveDiagnoses = DiagnoseEntry;
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;