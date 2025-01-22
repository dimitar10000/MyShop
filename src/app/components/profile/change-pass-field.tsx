import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';

interface FieldProps {
    errorResult: boolean,
    passValue: string | null,
    passValueReset: boolean,
    setPassValue: Dispatch<SetStateAction<string>>,
    setPassValueReset: Dispatch<SetStateAction<boolean>>,
    fieldLabel: string,
    fieldName: string,
    autocompleteValue?: string,
    textBoxLostFocus: boolean,
    setTextBoxLostFocus: Dispatch<SetStateAction<boolean>>,
    helperTextFunc: () => string

}

export default function ChangePassField({ errorResult, fieldLabel, fieldName,
    passValue, setPassValue, autocompleteValue, textBoxLostFocus, setTextBoxLostFocus,
    helperTextFunc, passValueReset, setPassValueReset }: FieldProps) {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [hoveredIcon, setHoveredIcon] = useState<boolean>(false);

    useEffect(() => {
        if (textBoxLostFocus && passValue === ""
            && passValueReset) {
            setPassValue("");
            setPassValueReset(false);
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
            onChange={(event) => {
                setPassValue(event.target.value);
                if (event.target.value !== "") {
                    setPassValueReset(true);
                }
            }}
            onBlur={() => setTextBoxLostFocus(true)}
            onFocus={() => setTextBoxLostFocus(false)}
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
                            {showPassword
                                ? <div onMouseOver={() => { setHoveredIcon(true) }}
                                    onMouseLeave={() => { setHoveredIcon(false) }}>
                                    {hoveredIcon
                                        ? <VisibilityOff />
                                        : <Visibility />
                                    }
                                </div>
                                : <div onMouseOver={() => { setHoveredIcon(true) }}
                                    onMouseLeave={() => { setHoveredIcon(false) }}>
                                    {hoveredIcon
                                        ? <Visibility />
                                        : <VisibilityOff />
                                    }
                                </div>
                            }
                        </IconButton>
                    </InputAdornment>)
            }}
        />
    )
}