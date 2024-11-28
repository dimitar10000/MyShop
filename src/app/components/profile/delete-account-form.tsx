import Button from '@mui/material/Button';
import { useFormStatus, useFormState } from 'react-dom'
import { useState, useEffect } from 'react';
import { useSnackbar } from '@/app/lib/snackbar';
import Box from '@mui/material/Box';

function DeleteAccountButton({ notPendingEmitter }: { notPendingEmitter: () => void }) {
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
                {pending ? 'Deleting...' : 'Delete'}

            </Button>
        </>
    )
}

export default function DeleteAccountForm() {
    //const [state, action] = useFormState(updateUserPassword, { errors: undefined });
    const { snackbar, clickHandler } = useSnackbar('Account deletion failed, try again later!', 'red');

    const notPendingHandler = () => {
        /*if (state?.errors) {
            (clickHandler({ vertical: 'bottom', horizontal: 'right' }))();
        }*/
    }

    const normalBorderStyle = "solid 1px grey";

    return (
        <div>
            {snackbar}
            <Box
                action={''}
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

                </div>

            </Box>
        </div>
    );

}