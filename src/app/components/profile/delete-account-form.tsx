'use client'
import Button from '@mui/material/Button';
import { useFormStatus } from 'react-dom'
import { useState, useEffect,useActionState } from 'react';
import { useSnackbar } from '@/app/lib/snackbar';
import Box from '@mui/material/Box';
import WarningIcon from '@mui/icons-material/Warning';
import TextField from '@mui/material/TextField';
import { Nullable } from '@/app/lib/definitions';
import { deleteUserAccount } from '@/app/actions/profile';
import {useLogout} from '@/app/lib/logout-element';

function DeleteAccountButton({ notPendingEmitter, disabledCond }:
    { notPendingEmitter: () => void, disabledCond: boolean }) {
    const { pending } = useFormStatus();
    const [clicked, setClicked] = useState(false);
    const [disabled, setDisabled] = useState(disabledCond);

    useEffect(() => {
        if (clicked && !pending) {
            notPendingEmitter();
        }
    }, [pending]);

    useEffect(() => {
        if (disabledCond) {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [disabledCond])

    return (
        <>
            <Button
                type="submit"
                variant="contained"
                disabled={disabled}
                sx={{
                    height: '50px',
                    backgroundColor: 'grey.600',
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
                {pending ? 'Deleting...' : 'Delete'}

            </Button>
        </>
    )
}

export default function DeleteAccountForm({ loggedUsername }: { loggedUsername: Nullable<string> }) {
    const [state, action] = useActionState(deleteUserAccount, { errors: undefined });
    const [usernameValue, setUsernameValue] = useState<string>("");
    const { snackbar, clickHandler } = useSnackbar('Account deletion failed, try again later!', 'red', 2);
    const { snackbar: snackbar2, clickHandler: clickHandlerGreen } = useSnackbar('Account deleted successfully! You will be logged out shortly.', undefined, 1);
    const {logout, activate: triggerLogout} = useLogout();

    const notPendingHandler = () => {
        if (state?.errors) {
            (clickHandler({ vertical: 'bottom', horizontal: 'right' }))();
        }
        else {
            (clickHandlerGreen({ vertical: 'bottom', horizontal: 'right' }))();
            setTimeout(() => {
                triggerLogout(true);
            },5000);
        }
    }

    const normalBorderStyle = "solid 1px grey";
    const errorBorderStyle = "solid 1px red";
    const errorCond = usernameValue.length >= 6 && usernameValue !== loggedUsername;
    const disabledCond = usernameValue.length < 6 || errorCond;

    return (
        <div>
            {snackbar}
            {snackbar2}
            {logout}
            <Box
                action={action}
                component="form"
                sx={{
                    '& .MuiTextField-root': {
                        m: 1, width: '600px', border: normalBorderStyle,
                        '& fieldset': { border: 'none' }
                    },
                    "& .MuiInputBase-input": {
                        color: "white"
                    },
                    py: 2, border: normalBorderStyle
                }}
                noValidate
            >
                <div style={{ marginLeft: '10%', marginRight: '10%' }}>
                    <div className='flex flex-row justify-between items-center mb-5'>
                        <div className='self-start mt-2'>
                            <WarningIcon color='warning' sx={{ height: 80, width: 80, mr: 5 }} />
                        </div>

                        <div className='text-xl brightness-75' style={{ color: 'red' }}>
                            Keep in mind: deleting your account is a permanent action
                            and will erase all your data visible on the profile page
                            from our system. <br />
                            Your wishlist and shopping cart will be
                            emptied, and incomplete orders will be cancelled. <br />
                            <br />
                            If you wish to proceed, confirm your username in the textbox below:

                            <div className='flex flex-row items-center'>
                                <TextField
                                    error={errorCond}
                                    label={''}
                                    type='text'
                                    name={'username'}
                                    helperText={
                                        errorCond
                                            ? <div className='text-base'>Username doesn&apost match actual one</div>
                                            : ""
                                    }
                                    variant='outlined'
                                    value={usernameValue}
                                    onChange={(event) => { setUsernameValue(event.target.value) }}
                                    style={{
                                        border: errorCond ? errorBorderStyle : normalBorderStyle,
                                        marginTop: 20, height: '50px'
                                    }}
                                />
                                <div className='mt-3 ml-2'>
                                    <DeleteAccountButton notPendingEmitter={notPendingHandler} disabledCond={disabledCond} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Box>
        </div>
    );

}