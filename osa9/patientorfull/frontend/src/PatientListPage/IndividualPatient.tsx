import {useParams} from "react-router-dom";
import React from "react";
import axios from "axios";
import {Entry, Patient} from "../types";
import {apiBaseUrl} from "../constants";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import {Button} from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import {EntryFormValues} from "../AddEntryModal/AddEntryForm";

const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
};

const Entries = ({entry}: { entry: Entry }) => {
    switch (entry.type) {
        case "Hospital":
            return (
                <div style={style}>
                    <p>{entry.date} <CalendarMonthIcon/></p>
                    <p>{entry.description}</p>
                    <p>Diagnose by {entry.specialist}</p>
                    <FavoriteIcon sx={{ color: red[500] }}/>
                </div>
            );
        case "HealthCheck":
            return (
                <div style={style}>
                    <p>{entry.date} <CalendarMonthIcon/></p>
                    <p>{entry.description}</p>
                    <p>Diagnose by {entry.specialist}</p>
                    <FavoriteIcon sx={{ color: red[500] }}/>
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div style={style}>
                    <p>{entry.date} <CalendarMonthIcon/></p>
                    <p>{entry.description}</p>
                    <p>Diagnose by {entry.specialist}</p>
                    <FavoriteIcon sx={{ color: red[500] }}/>
                </div>
            );
    }
};

const IndividualPatient = () => {
    const {id} = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const {data: patientFromApi} = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id || ""}`
                );
                setPatient(patientFromApi);
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatient();
    }, []);

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id || ""}/entries`,
                values
            );
            const {data: patientFromApi} = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id || ""}`
            );
            setPatient(patientFromApi);
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
                setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
                console.log("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    return (
        <div>
            <h2>{patient?.name}</h2>
            <p>ssh: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <h3>Entries</h3>
            <ul>
                {patient?.entries.map(d =>
                    <Entries key = {d.id} entry={d}/>
                )}
            </ul>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};

export default IndividualPatient;