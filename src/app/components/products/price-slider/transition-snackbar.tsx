import Snackbar,{ SnackbarOrigin } from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import {useState} from 'react'
import Alert from '@mui/material/Alert';

interface State extends SnackbarOrigin {
    open: boolean;
}

export const useTransitionSnackbar = (customMessage: string) : [JSX.Element, () => void] => {
    const [state, setState] = useState<State>({open: false, vertical: 'top', horizontal: 'left'});
  
    const handleClick = () => {
        setState({...state, open: true});
    };
  
    const handleClose = () => {setState({...state,open: false});}

    const snackbar = <Snackbar
    open={state.open}
    onClose={handleClose}
    TransitionComponent={Fade}
    key={Fade.name}
    autoHideDuration={5000}>
        <Alert
        onClose={handleClose}
        severity='warning'
        variant='standard'
        sx={{ width: '100%'}}
    >
        {customMessage}
    </Alert>
    </Snackbar>

    return [snackbar, handleClick];
}