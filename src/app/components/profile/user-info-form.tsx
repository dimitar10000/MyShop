import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormStatus } from 'react-dom'
import { useState, useEffect, useActionState,SetStateAction,Dispatch } from 'react';
import { saveUserInfo } from '@/app/actions/profile';
import { User, Nullable,coerceToUserType } from '@/app/lib/definitions';
import { useSnackbar } from '@/app/lib/snackbar';
import {getUser} from '@/app/actions/user';

function SaveInfoButton({ notPendingEmitter }: { notPendingEmitter: () => Promise<void> }) {
    const { pending } = useFormStatus();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const updateFunc = async () => {
            if (clicked && !pending) {
                await notPendingEmitter();
            }
        }

        updateFunc();
    }, [pending, clicked]);

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
                disabled={pending}
                onClick={() => {
                    setClicked(true);
                }}
            >
                {pending ? 'Saving...' : 'Save'}

            </Button>
        </>
    )
}

export default function UserInfoForm({ user,updateUser }: { user: Nullable<User>,
    updateUser: Dispatch<SetStateAction<Nullable<User>>>
 }) {
    const [state, action] = useActionState(saveUserInfo, { errors: undefined });
    const { snackbar, clickHandler } = useSnackbar('Profile updated successfully', undefined, 1);
    const { snackbar: snackbar2, clickHandler: clickHandlerRed } = useSnackbar(`Profile couldn't be updated... Please try again later.`, 'red', 2);

    const notPendingHandler = async () => {
        if (state?.errors?.error) {
            (clickHandlerRed({ vertical: 'bottom', horizontal: 'right' }))();
        }
        else if (!state?.errors) {
            (clickHandler({ vertical: 'bottom', horizontal: 'right' }))();
            const newUser = await getUser(user?.email);
            console.log("new user",newUser);
            updateUser(coerceToUserType(newUser));
        }
    }

    return (
        <div>
            {snackbar}
            {snackbar2}
            <Box
                action={action}
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
                autoComplete="on"
            >
                <div className='flex flex-col justify-center items-center'>
                    <TextField
                        label="First name"
                        name='first-name'
                        variant='outlined'
                        defaultValue={user?.givenName}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Last name"
                        name='last-name'
                        variant='outlined'
                        defaultValue={user?.familyName}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        disabled
                        label="Email"
                        name='email'
                        variant='outlined'
                        sx={{
                            backdropFilter: 'brightness(90%)',
                        }}
                        defaultValue={user?.email}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Phone"
                        name='phone'
                        variant='outlined'
                        type='tel'
                        placeholder='+359123456789'
                        inputProps={{
                            sx: { '&::placeholder': { color: 'white', opacity: 0.65 } }
                        }}
                        defaultValue={user?.phone}
                        InputLabelProps={{ shrink: true }}
                    />

                    <SaveInfoButton notPendingEmitter={notPendingHandler} />
                </div>
            </Box>
        </div>
    )
}