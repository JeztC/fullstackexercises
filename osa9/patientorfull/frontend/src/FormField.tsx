// structure of a single option
import {ErrorMessage, Field, FieldProps} from "formik";
import {InputLabel, MenuItem, Select, TextField as TextFieldMUI, Typography} from "@material-ui/core";
import React from "react";

export type EntryType = {
    value: string | number;
    label: string;
};

// props for select field component
type SelectFieldProps = {
    name: string;
    label: string;
    options: EntryType[];
};

interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
}

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
    <>
        <InputLabel>{label}</InputLabel>
        <Field
            fullWidth
            style={{ marginBottom: "0.5em" }}
            label={label}
            component={FormikSelect}
            name={name}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label || option.value}
                </MenuItem>
            ))}
        </Field>
    </>
);

export const TextField = ({ field, label, placeholder }: TextProps) => (
    <div style={{ marginBottom: "1em" }}>
        <TextFieldMUI
            fullWidth
            label={label}
            placeholder={placeholder}
            {...field}
        />
        <Typography variant="subtitle2" style={{ color: "red" }}>
            <ErrorMessage name={field.name} />
        </Typography>
    </div>
);