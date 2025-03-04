import { State } from "./state";
import {Diagnosis, Patient} from "../types";

export type Action =
    | {
  type: "SET_PATIENT_LIST";
  payload: Patient[];
}
    | {
  type: "SET_DIAGNOSIS_LIST";
  payload: Diagnosis[];
}
    | {
  type: "ADD_PATIENT";
  payload: Patient;
};

export const setPatients = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const setDiagnoses = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosis
  };
};

export const createPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
              (memo, patient) => ({ ...memo, [patient.id]: patient }),
              {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
