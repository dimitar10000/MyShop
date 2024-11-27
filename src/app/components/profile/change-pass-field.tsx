import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import {useState,useEffect} from 'react';
import {isType1ErrorFunction,isType2ErrorFunction} from '@/app/lib/definitions';

interface FieldProps {
    errorFunc: (value: string | null) => boolean | (() => boolean),
    fieldLabel: string,
    fieldName: string,
    autocompleteValue: string,
    helperTextFunc: () => string

}

export default function ChangePassField({errorFunc, fieldLabel, fieldName,
    autocompleteValue, helperTextFunc} : FieldProps) {

        const [passValue, setPassValue] = useState<string | null>(null);
        const [showPassword,setShowPassword] = useState<boolean>(false);
        const [textBoxLostFocus, setTextBoxLostFocus] = useState<boolean>(false);

        const normalBorderStyle = "solid 1px grey";
        const errorBorderStyle = "solid 1px red";

        const handleClickShowPassword = () => setShowPassword(!showPassword);
        const handleMouseDownPassword = () => setShowPassword(!showPassword);

        const errorResult = () => {
            if(isType1ErrorFunction(errorFunc)) {
                return errorFunc(passValue);
            }
            if(isType2ErrorFunction(errorFunc)){
                return errorFunc();
            }
        }

    return (
        <TextField
            error={errorResult()}
            label={fieldLabel}
            type='password'
            name={fieldName}
            autoComplete={autocompleteValue}
            helperText={helperTextFunc()}
            variant='outlined'
            value={passValue}
            onChange={(event) => { setPassValue(event.target.value) }}
            onBlur={(event) => setTextBoxLostFocus(true)}
            onFocus={(event) => setTextBoxLostFocus(false)}
            style={{
                border: errorResult() ? errorBorderStyle : normalBorderStyle
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