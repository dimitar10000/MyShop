'use client'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormStatus } from 'react-dom'
import {useState,useEffect,useActionState} from 'react';
import {useRouter} from 'next/navigation';
import { saveUserInfo } from '@/app/actions/profile';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useSnackbar } from '@/app/lib/snackbar';

function SaveInfoButton({notPendingEmitter} : {notPendingEmitter: () => void}) {
    const { pending} = useFormStatus();
    const [clicked, setClicked] = useState(false);
    
    useEffect(() => {
        if(clicked && !pending) {
            notPendingEmitter();
        }
    },[pending]);

    return (
        <>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 5, mb: 2, backgroundColor: 'grey.700',
                    textTransform: 'none', fontSize: 16,
                ':hover': {
                    backgroundColor: 'grey.800'
                } }}
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

export default function UserInfoForm({ user }: { user: UserProfile }) {
    const [state, action] = useActionState(saveUserInfo, {errors: undefined});
    const { snackbar, clickHandler } = useSnackbar('Profile updated successfully',undefined,1);
    const {snackbar: snackbar2, clickHandler:clickHandlerRed} = useSnackbar(`Profile couldn't be updated... Please try again later.`,'red',2);
    const router = useRouter();

    const notPendingHandler = () => {
        if(state?.errors?.error) {
            (clickHandlerRed({vertical: 'bottom', horizontal: 'right'}))();
        }
        if(!state?.errors) {
            (clickHandler({vertical: 'bottom', horizontal: 'right'}))();
            router.refresh();
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
                        defaultValue={user.given_name}
                    />

                    <TextField
                        label="Last name"
                        name='last-name'
                        variant='outlined'
                        defaultValue={user.family_name}
                    />

                    <TextField
                        disabled
                        label="Email"
                        name='email'
                        variant='outlined'
                        sx={{
                            backdropFilter: 'brightness(90%)',
                        }}
                        defaultValue={user.email}
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
                        defaultValue={user.phone_number}
                    />

                    <SaveInfoButton notPendingEmitter={notPendingHandler}/>
                </div>
            </Box>
        </div>
    )
}