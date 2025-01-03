'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useFormStatus } from 'react-dom'
import { useState, useEffect,useActionState } from 'react';
import { useSnackbar } from '@/app/lib/snackbar';
import { updateUserPassword} from '@/app/actions/profile';
import {useLogout} from '@/app/lib/logout-element';
import {ChangePassConstants} from '@/app/components/profile/change-pass-constants';
import ChangePassField from './change-pass-field';


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

    const [state, action] = useActionState(updateUserPassword, { errors: undefined });

    const { snackbar, clickHandler } = useSnackbar('Password updated successfully! You will be logged out shortly.', undefined, 1);
    const { snackbar: snackbar2, clickHandler: clickHandlerRed } = useSnackbar(ChangePassConstants.SHORT_PASS_MESSAGE, 'red', 2);
    const { snackbar: snackbar3, clickHandler: clickHandlerRed2 } = useSnackbar(ChangePassConstants.EMPTY_FIELDS, 'red', 3);
    const { snackbar: snackbar4, clickHandler: clickHandlerRed3 } = useSnackbar(ChangePassConstants.PASS_MISMATCH, 'red', 4);
    const { snackbar: snackbar5, clickHandler: clickHandlerRed4 } = useSnackbar(ChangePassConstants.OTHER_ERRORS, 'red', 5);
    const {logout, activate: triggerLogout} = useLogout();
    
    const normalBorderStyle = "solid 1px grey";

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

        return "";
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

        return "";
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

        return "";
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

                    <ChangePassField fieldLabel={"Current password"} fieldName={"current-password"}
                     passValue={currPassword} setPassValue={setCurrPassword}
                     autocompleteValue={"current-password"} textBoxLostFocus={textBox1LostFocus}
                     setTextBoxLostFocus={setTextBox1LostFocus}
                     helperTextFunc={returnHelperText1}
                     errorResult={isEmptyValue(currPassword)}
                    />

                    <ChangePassField fieldLabel={"New password"} fieldName={"new-password"}
                    passValue={newPassword} setPassValue={setNewPassword}
                    textBoxLostFocus={textBox2LostFocus} setTextBoxLostFocus={setTextBox2LostFocus}
                    helperTextFunc={returnHelperText2}
                    errorResult={isEmptyValue(newPassword) || newPassSameAsOld()}/>

                    <ChangePassField fieldLabel={"Repeat new password"} fieldName={'new-password-repeat'}
                    passValue={newPasswordRepeat} setPassValue={setNewPasswordRepeat}
                    textBoxLostFocus={textBox3LostFocus} setTextBoxLostFocus={setTextBox3LostFocus}
                    helperTextFunc={returnHelperText3}
                    errorResult={isEmptyValue(newPasswordRepeat) || repeatPassWrong()}/>

                    <ChangePassButton notPendingEmitter={notPendingHandler} />
                </div>
            </Box>
        </div>
    )
}