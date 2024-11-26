'use client'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormStatus, useFormState } from 'react-dom'
import { useState, useEffect } from 'react';
import { useSnackbar } from '@/app/lib/snackbar';
import { updateUserPassword} from '@/app/actions/profile';
import {useLogout} from '@/app/lib/logout-element';
import {ChangePassConstants} from '@/app/components/profile/change-pass-constants';

function ChangePassButton({ notPendingEmitter }: { notPendingEmitter: () => void }) {
    const { pending } = useFormStatus();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (clicked && !pending) {
            notPendingEmitter();
        }
    }, [pending]);

    return (
        <>
            <Button
                type="submit"
                variant="contained"
                sx={{
                    mt: 5, mb: 2, backgroundColor: 'grey.700',
                    textTransform: 'none', fontSize: 16,
                    ':hover': {
                        backgroundColor: 'grey.800'
                    }
                }}
                aria-disabled={pending}
                onClick={() => {
                    setClicked(true);
                }}
            >
                {pending ? 'Saving...' : 'Save'}

            </Button>
        </>
    )
}

export default function ChangePassForm() {
    const [currPassword, setCurrPassword] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState<string | null>(null);
    const [newPasswordRepeat, setNewPasswordRepeat] = useState<string | null>(null);
    const [textBox1LostFocus, setTextBox1LostFocus] = useState<boolean>(false);
    const [textBox2LostFocus, setTextBox2LostFocus] = useState<boolean>(false);
    const [textBox3LostFocus, setTextBox3LostFocus] = useState<boolean>(false);

    const [state, action] = useFormState(updateUserPassword, { errors: undefined });

    useEffect(() => {
        if (textBox1LostFocus && currPassword === "") {
            setCurrPassword(null);
        };
    }, [textBox1LostFocus])

    useEffect(() => {
        if (textBox2LostFocus && newPassword === "") {
            setNewPassword(null);
        };
    }, [textBox2LostFocus])

    useEffect(() => {
        if (textBox3LostFocus && newPasswordRepeat === "") {
            setNewPasswordRepeat(null);
        };
    }, [textBox3LostFocus])

    const { snackbar, clickHandler } = useSnackbar('Password updated successfully! You will be logged out shortly.', undefined, 1);
    const { snackbar: snackbar2, clickHandler: clickHandlerRed } = useSnackbar(ChangePassConstants.SHORT_PASS_MESSAGE, 'red', 2);
    const { snackbar: snackbar3, clickHandler: clickHandlerRed2 } = useSnackbar(ChangePassConstants.EMPTY_FIELDS, 'red', 3);
    const { snackbar: snackbar4, clickHandler: clickHandlerRed3 } = useSnackbar(ChangePassConstants.PASS_MISMATCH, 'red', 4);
    const { snackbar: snackbar5, clickHandler: clickHandlerRed4 } = useSnackbar(ChangePassConstants.OTHER_ERRORS, 'red', 5);
    const {logout, activate: triggerLogout} = useLogout();
    
    const notPendingHandler = () => {

        if (!state?.errors) {
            (clickHandler({ vertical: 'bottom', horizontal: 'right' }))();
            setTimeout(() => {
                triggerLogout(true);
            },5000);
        }
        else if (state?.errors?.error === ChangePassConstants.SHORT_PASS_MESSAGE) {
            (clickHandlerRed({ vertical: 'bottom', horizontal: 'right' }))();
        }
        else if(state?.errors?.error === ChangePassConstants.EMPTY_FIELDS) {
            (clickHandlerRed2({ vertical: 'bottom', horizontal: 'right' }))();
        }
        else if(state?.errors?.error === ChangePassConstants.PASS_MISMATCH) {
            (clickHandlerRed3({ vertical: 'bottom', horizontal: 'right' }))();
        }
        else {
            (clickHandlerRed4({ vertical: 'bottom', horizontal: 'right' }))();
        }
    }

    const normalBorderStyle = "solid 1px grey";
    const errorBorderStyle = "solid 1px red";

    const isEmptyValue = (value: string | null) => value === "";

    const newPassSameAsOld = () => !!currPassword && currPassword === newPassword;

    const repeatPassWrong = () => !!newPassword && !!newPasswordRepeat &&
        newPasswordRepeat.length >= ChangePassConstants.MIN_PASSWORD_LENGTH &&
        newPasswordRepeat !== newPassword;

    const returnHelperText1 = () => {
        if (textBox1LostFocus) {
            return "";
        }
        else if (isEmptyValue(currPassword)) {
            return 'This field cannot be empty.';
        }
    }

    const returnHelperText2 = () => {
        if (textBox2LostFocus) {
            return "";
        }
        else if (isEmptyValue(newPassword)) {
            return 'This field cannot be empty.';
        }
        else if (newPassSameAsOld()) {
            return 'The new password must be different from the old one.'
        }
    }

    const returnHelperText3 = () => {
        if (textBox3LostFocus) {
            return "";
        }
        else if (isEmptyValue(newPasswordRepeat)) {
            return 'This field cannot be empty.';
        }
        else if (repeatPassWrong()) {
            return 'Passwords must match, check for typos.'
        }
    }

    return (
        <div>
            {snackbar}
            {snackbar2}
            {snackbar3}
            {snackbar4}
            {snackbar5}
            {logout}
            <Box
                action={action}
                component="form"
                sx={{
                    '& .MuiTextField-root': {
                        m: 1, width: '600px', border: normalBorderStyle,
                        '& label': { color: 'white' }, '& label.Mui-focused': { color: 'white' },
                        '& fieldset': { border: 'none' }
                    },
                    py: 2, border: 'solid 1px grey'
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
                        onChange={(event) => { setCurrPassword(event.target.value) }}
                        onBlur={(event) => setTextBox1LostFocus(true)}
                        onFocus={(event) => setTextBox1LostFocus(false)}
                        style={{
                            border: isEmptyValue(currPassword) ? errorBorderStyle : normalBorderStyle
                        }}
                    />

                    <TextField
                        error={isEmptyValue(newPassword) || newPassSameAsOld()}
                        label="New password"
                        type='password'
                        name='new-password'
                        helperText={returnHelperText2()}
                        variant='outlined'
                        value={newPassword}
                        onChange={(event) => { setNewPassword(event.target.value) }}
                        onBlur={(event) => setTextBox2LostFocus(true)}
                        onFocus={(event) => setTextBox2LostFocus(false)}
                        style={{
                            border: isEmptyValue(newPassword) || newPassSameAsOld()
                                ? errorBorderStyle
                                : normalBorderStyle
                        }}
                    />

                    <TextField
                        error={isEmptyValue(newPasswordRepeat)
                            || repeatPassWrong()}
                        label="Repeat new password"
                        type='password'
                        name='new-password-repeat'
                        helperText={returnHelperText3()}
                        variant='outlined'
                        value={newPasswordRepeat}
                        onChange={(event) => { setNewPasswordRepeat(event.target.value) }}
                        onBlur={(event) => setTextBox3LostFocus(true)}
                        onFocus={(event) => setTextBox3LostFocus(false)}
                        style={{
                            border: isEmptyValue(newPasswordRepeat) || repeatPassWrong()
                                ? errorBorderStyle
                                : normalBorderStyle
                        }}
                    />

                    <ChangePassButton notPendingEmitter={notPendingHandler} />
                </div>
            </Box>
        </div>
    )
}