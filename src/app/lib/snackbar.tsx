'use client'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

interface State extends SnackbarOrigin {
    open: boolean;
}

// takes message to print, returns snackbar element and click event handler
// parameters of handler determine message position
export function useSnackbar(message: string, color?: string, keyIndex?: number) {
    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'left'
    });
    const { open, vertical, horizontal } = state;

    console.log("snackbar open state = ", open);

    const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
        console.log("on close handler triggered");
    }

    let alertColor: 'success' | 'error' | 'warning' | 'info' | "custom";

    switch(color) {
        case 'green':
            alertColor = 'success';
            break;
        case 'red':
            alertColor = 'error';
            break;
        case 'orange':
            alertColor = 'warning';
            break;
        case 'blue':
            alertColor = 'info';
            break;
        case undefined:
            alertColor = 'success';
            break;
        default:
            alertColor = 'custom';
    }

    const snackbar = <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        disableWindowBlurListener
        key={vertical + horizontal + (keyIndex ? keyIndex : '')}
    >
        <Alert
            onClose={handleClose}
            severity= {alertColor !== "custom" ? alertColor : undefined }
            variant="filled"
            sx={{ width: '100%', backgroundColor: alertColor === "custom" ? color : undefined }}
        >
            {message}
        </Alert>
    </Snackbar>

    return { snackbar: snackbar, clickHandler: handleClick };
}