import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import {useState,Dispatch,SetStateAction,useEffect} from 'react';

interface FieldProps {
    errorResult: boolean,
    passValue: string | null,
    setPassValue: Dispatch<SetStateAction<string | null>>,
    fieldLabel: string,
    fieldName: string,
    autocompleteValue?: string,
    textBoxLostFocus: boolean,
    setTextBoxLostFocus: Dispatch<SetStateAction<boolean>>,
    helperTextFunc: () => string

}

export default function ChangePassField({errorResult, fieldLabel, fieldName,
    passValue, setPassValue, autocompleteValue, textBoxLostFocus, setTextBoxLostFocus,
    helperTextFunc} : FieldProps) {

        const [showPassword,setShowPassword] = useState<boolean>(false);

        useEffect(() => {
            if (textBoxLostFocus && passValue === "") {
                setPassValue(null);
            };
        }, [textBoxLostFocus])

        const normalBorderStyle = "solid 1px grey";
        const errorBorderStyle = "solid 1px red";

        const handleClickShowPassword = () => setShowPassword(!showPassword);
        const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <TextField
            error={errorResult}
            label={fieldLabel}
            type={showPassword ? 'text' : 'password'}
            name={fieldName}
            autoComplete={autocompleteValue}
            helperText={helperTextFunc()}
            variant='outlined'
            value={passValue}
            onChange={(event) => { setPassValue(event.target.value) }}
            onBlur={(event) => setTextBoxLostFocus(true)}
            onFocus={(event) => setTextBoxLostFocus(false)}
            style={{
                border: errorResult ? errorBorderStyle : normalBorderStyle
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>)
            }}
        />
    )
}