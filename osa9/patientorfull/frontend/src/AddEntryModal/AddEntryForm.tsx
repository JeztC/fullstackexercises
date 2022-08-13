import {Entry, HealthCheckRating} from "../types";
import {Field, Form, Formik} from "formik";
import {Button, DialogTitle, Grid} from "@material-ui/core";
import React from "react";
import {EntryType, SelectField, TextField} from "../FormField";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const entryOptions: EntryType[] = [
    { value: 'Hospital', label: "Hospital" },
    { value: 'OccupationalHealthcare', label: "OccupationalHealthcare" },
    { value: 'HealthCheck', label: "HealthCheck" }
];

export type HealthType = {
    value: number;
    label: string;
};

const healthCheckRatings: HealthType[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                type : "Hospital",
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, values }) => {
                console.log(values);
                if (values.type === "Hospital") {
                    return (
                        <Form className="form ui">
                            <Field
                                label="Description"
                                placeholder="Description"
                                name="description"
                                component={TextField}
                            />
                            <Field
                                label="Date"
                                placeholder="Date"
                                name="date"
                                component={TextField}
                            />
                            <Field
                                label="Specialist"
                                placeholder="Specialist"
                                name="specialist"
                                component={TextField}
                            />
                            <DialogTitle>Discharge</DialogTitle>
                            <Field
                                label="Date"
                                placeholder="Date"
                                name={"discharge.date"}
                                component={TextField}
                            />
                            <Field
                                label="Criteria"
                                placeholder="Criteria"
                                name="discharge.criteria"
                                component={TextField}
                            />
                            <DialogTitle>Type</DialogTitle>
                            <SelectField label="Type" name="type" options={entryOptions} />
                            <Grid>
                                <Grid item>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        style={{ float: "left" }}
                                        type="button"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        style={{
                                            float: "right",
                                        }}
                                        type="submit"
                                        variant="contained"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                } else if (values.type === "OccupationalHealthcare") {
                    return (
                        <Form className="form ui">
                            <Field
                                label="Description"
                                placeholder="Description"
                                name="description"
                                component={TextField}
                                validate={false}
                            />
                            <Field
                                label="Date"
                                placeholder="Date"
                                name="date"
                                component={TextField}
                            />
                            <Field
                                label="Specialist"
                                placeholder="Specialist"
                                name="specialist"
                                component={TextField}
                            />
                            <Field
                                label="EmployerName"
                                placeholder="EmployerName"
                                name="employerName"
                                component={TextField}
                            />
                            <DialogTitle>Sick Leave</DialogTitle>
                            <Field
                                label="StartDate"
                                placeholder="StartDate"
                                name="sickLeave.StartDate"
                                component={TextField}
                            />
                            <Field
                                label="EndDate"
                                placeholder="EndDate"
                                name="sickLeave.endDate"
                                component={TextField}
                            />
                            <SelectField label="Type" name="type" options={entryOptions} />
                            <Grid>
                                <Grid item>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        style={{ float: "left" }}
                                        type="button"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        style={{
                                            float: "right",
                                        }}
                                        type="submit"
                                        variant="contained"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                } else if (values.type === "HealthCheck") {
                    return (
                        <Form className="form ui">
                            <Field
                                label="Description"
                                placeholder="Description"
                                name="description"
                                component={TextField}
                                validate={false}
                            />
                            <Field
                                label="Date"
                                placeholder="Date"
                                name="date"
                                component={TextField}
                            />
                            <Field
                                label="Specialist"
                                placeholder="Specialist"
                                name="specialist"
                                component={TextField}
                            />
                            <SelectField label="Health Rating" name="healthCheckRating" options={healthCheckRatings} />
                            <SelectField label="Type" name="type" options={entryOptions} />
                            <Grid>
                                <Grid item>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        style={{ float: "left" }}
                                        type="button"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        style={{
                                            float: "right",
                                        }}
                                        type="submit"
                                        variant="contained"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }
            }}
        </Formik>
    );
};