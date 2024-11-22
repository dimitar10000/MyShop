'use client'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormStatus, useFormState } from 'react-dom'
import { useState, useEffect } from 'react';

export default function ChangePassForm() {
    const [currPassword,setCurrPassword] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string | null>(null);
    const [newPasswordRepeat,setNewPasswordRepeat] = useState<string | null>(null);
    const [textBox1LostFocus,setTextBox1LostFocus] = useState<boolean>(false);
    const [textBox2LostFocus,setTextBox2LostFocus] = useState<boolean>(false);
    const [textBox3LostFocus,setTextBox3LostFocus] = useState<boolean>(false);



    useEffect(() => {
        if(textBox1LostFocus && currPassword === "") {
            setCurrPassword(null);
        };
    },[textBox1LostFocus])

    useEffect(() => {
        if(textBox2LostFocus && newPassword === "") {
            setNewPassword(null);
        };
    },[textBox2LostFocus])

    useEffect(() => {
        if(textBox3LostFocus && newPasswordRepeat === "") {
            setNewPasswordRepeat(null);
        };
    },[textBox3LostFocus])

    const isEmptyValue = (value: string | null) => value === "";

    const newPassSameAsOld = () => currPassword === newPassword;

    const repeatPassWrong = () => !!newPassword && !!newPasswordRepeat && 
    newPasswordRepeat.length >= 5 && newPasswordRepeat !== newPassword;

    const returnHelperText1 = () => {
        if(textBox1LostFocus) {
            return "";
        }
        else if(isEmptyValue(currPassword)) {
            return 'This field cannot be empty.';
        }
        
        return "";
    }

    const returnHelperText2 = () => {
        if(textBox2LostFocus) {
            return "";
        }
        else if(isEmptyValue(newPassword)) {
            return 'This field cannot be empty.';
        }
        
        return "";
    }

    const returnHelperText3 = () => {
        if(textBox3LostFocus) {
            return "";
        }
        else if(isEmptyValue(newPasswordRepeat)) {
            return 'This field cannot be empty.';
        }
        else if(newPassSameAsOld()) {
            return 'The new password must be different from the old one.'
        }
        else if(repeatPassWrong()) {
            return 'Passwords must match, check for typos.'
        }
        
        return "";
    }

    return (
        <Box
            action={""}
            component="form"
            sx={{
                '& .MuiTextField-root': {
                    m: 1, width: '600px', border: 'solid 1px grey',
                    '& label': { color: 'white' }, '& label.Mui-focused': { color: 'white' },
                    '& fieldset': { border: 'none' }
                },
                border: 'solid 1px grey', py: 2
            }}
            noValidate
        >
            <div className='flex flex-col justify-center items-center'>
                    <TextField
                        error={isEmptyValue(currPassword)}
                        label="Current password"
                        type='password'
                        name='current-password'
                        autoComplete='current-password'
                        helperText={returnHelperText1()}
                        variant='outlined'
                        value={currPassword}
                        onChange={(event) => {setCurrPassword(event.target.value)}}
                        onBlur={(event) => setTextBox1LostFocus(true)}
                        onFocus={(event) => setTextBox1LostFocus(false)}
                    />

                    <TextField
                        error={isEmptyValue(newPassword)}
                        label="New password"
                        type='password'
                        name='new-password'
                        helperText={returnHelperText2()}
                        variant='outlined'
                        value={newPassword}
                        onChange={(event) => {setNewPassword(event.target.value)}}
                        onBlur={(event) => setTextBox2LostFocus(true)}
                        onFocus={(event) => setTextBox2LostFocus(false)}
                    />

                    <TextField
                        error={isEmptyValue(newPasswordRepeat) || newPassSameAsOld()
                            || repeatPassWrong()}
                        label="Repeat new password"
                        type='password'
                        name='new-password-repeat'
                        helperText={returnHelperText3()}
                        variant='outlined'
                        value={newPasswordRepeat}
                        onChange={(event) => {setNewPasswordRepeat(event.target.value)}}
                        onBlur={(event) => setTextBox3LostFocus(true)}
                        onFocus={(event) => setTextBox3LostFocus(false)}
                    />

            </div>
        </Box>
    )
}