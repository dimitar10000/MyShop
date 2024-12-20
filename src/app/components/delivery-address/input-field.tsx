import TextField from '@mui/material/TextField';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';

interface FieldProps {
    errorResult: boolean,
    fieldValue: string,
    setFieldValue: Dispatch<SetStateAction<string>>,
    setTyped: Dispatch<SetStateAction<boolean>>
    fieldLabel: string,
    autocompleteValue?: string,
    textBoxLostFocus: boolean,
    setTextBoxLostFocus: Dispatch<SetStateAction<boolean>>,
    helperTextFunc: () => string

}

export default function InputField({ errorResult, fieldLabel, fieldValue,
    setFieldValue, autocompleteValue, textBoxLostFocus, setTextBoxLostFocus,
    helperTextFunc, setTyped }: FieldProps) {

    useEffect(() => {
        if (textBoxLostFocus && fieldValue === "") {
            setTyped(false);
        };
    }, [textBoxLostFocus])

    const normalBorderStyle = "solid 1px grey";
    const errorBorderStyle = "solid 1px red";

    return (
        <TextField
            error={errorResult}
            label={fieldLabel}
            type={'text'}
            autoComplete={autocompleteValue}
            helperText={helperTextFunc()}
            variant='outlined'
            value={fieldValue}
            onChange={(event) => {
                setFieldValue(event.target.value);
                if (event.target.value !== "") {
                    setTyped(true);
                }
            }}
            onBlur={(event) => setTextBoxLostFocus(true)}
            onFocus={(event) => setTextBoxLostFocus(false)}
            style={{
                border: errorResult ? errorBorderStyle : normalBorderStyle,
                height: 50
            }}
        />);
}