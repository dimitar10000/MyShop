import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';
import InputField from './input-field';

export default function AddressSection() {
    const [street, setStreet] = useState<string>("");
    const [typedStreet, setTypedStreet] = useState<boolean>(false);

    const [streetNum, setStreetNum] = useState<string>("");
    const [typedStreetNum, setTypedStreetNum] = useState<boolean>(false);

    const [city, setCity] = useState<string>("");
    const [typedCity, setTypedCity] = useState<boolean>(false);

    const [postalCode, setPostalCode] = useState<string>("");
    const [typedPostalCode, setTypedPostalCode] = useState<boolean>(false);

    const [textBox1LostFocus, setTextBox1LostFocus] = useState<boolean>(false);
    const [textBox2LostFocus, setTextBox2LostFocus] = useState<boolean>(false);
    const [textBox3LostFocus, setTextBox3LostFocus] = useState<boolean>(false);
    const [textBox4LostFocus, setTextBox4LostFocus] = useState<boolean>(false);

    const isValidStreet = (street: string) => {
        return /^[a-zA-Z]+(\.[a-zA-Z]+)*[\.A-Za-z]?$/.test(street);
    }

    const isValidStreetNum = (num: string) => {
        return /^[1-9][0-9]*$/.test(num);
    }

    const isValidCity = (city: string) => {
        return /^[A-Za-z]+$/.test(city);
    }

    const isValidPostalCode = (code: string) => {
        return /^[1-9][0-9]{3}$/.test(code);
    }

    const isEmptyValue = (value: string) => value === "";

    const errorCondStreet = isEmptyValue(street) && typedStreet ||
        street.length >= 2 ? !isValidStreet(street) : false;

    const errorCondStreetNum = isEmptyValue(streetNum) && typedStreetNum ||
        streetNum.length >= 1 ? !isValidStreetNum(streetNum) : false;

    const errorCondCity = isEmptyValue(city) && typedCity ||
        city.length >= 1 ? !isValidCity(city) : false;

    const errorCondPostalCode = isEmptyValue(postalCode) && typedPostalCode ||
        postalCode.length >= 1 ? !isValidPostalCode(postalCode) : false;

    const returnHelperText1 = () => {
        if (textBox1LostFocus) {
            return "";
        }
        else if (isEmptyValue(street) && typedStreet) {
            return 'This field cannot be empty.';
        }
        else if (street.length >= 2) {
            if (!isValidStreet(street)) {
                return 'The street name must be in a correct format.';
            }
        }

        return "";
    }

    const returnHelperText2 = () => {
        if (textBox2LostFocus) {
            return "";
        }
        else if (isEmptyValue(streetNum) && typedStreetNum) {
            return 'This field cannot be empty.';
        }
        else if (streetNum.length >= 1) {
            if (!isValidStreetNum(streetNum)) {
                return 'The street number must be in a correct format.';
            }
        }

        return "";
    }

    const returnHelperText3 = () => {
        if (textBox3LostFocus) {
            return "";
        }
        else if (isEmptyValue(city) && typedCity) {
            return 'This field cannot be empty.';
        }
        else if (city.length >= 1) {
            if (!isValidCity(city)) {
                return 'Only letters are allowed in the name.';
            }
        }

        return "";
    }

    const returnHelperText4 = () => {
        if (textBox4LostFocus) {
            return "";
        }
        else if (isEmptyValue(postalCode) && typedPostalCode) {
            return 'This field cannot be empty.';
        }
        else if (postalCode.length >= 1) {
            if (!isValidPostalCode(postalCode)) {
                return 'Only numbers are allowed in the code.';
            }
        }

        return "";
    }

    return (
        <Box sx={{
            '& .MuiTextField-root': {
                '& label': { color: 'white' }, '& label.Mui-focused': { color: 'white' },
                '& fieldset': { border: 'none' }
            },
            width: '100%'
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'row',
                width: '100%', mb: 2,
            }}>
                <Box sx={{
                    '& .MuiFormHelperText-root': {
                        position: 'absolute', bottom: 0
                    },
                    mr: 1, width: '75%'
                }}>
                    <InputField errorResult={errorCondStreet} fieldLabel={'Street'}
                        fieldValue={street} setFieldValue={setStreet} autocompleteValue='address'
                        textBoxLostFocus={textBox1LostFocus} setTextBoxLostFocus={setTextBox1LostFocus}
                        helperTextFunc={returnHelperText1} setTyped={setTypedStreet} />
                </Box>

                <Box sx={{
                    width: '50%',
                    '& .MuiFormHelperText-root': {
                        position: 'relative', top: -60, left: 150
                    }
                }}>
                    <InputField errorResult={errorCondStreetNum} fieldLabel={'Number'}
                        fieldValue={streetNum} setFieldValue={setStreetNum} autocompleteValue='address'
                        textBoxLostFocus={textBox2LostFocus} setTextBoxLostFocus={setTextBox2LostFocus}
                        helperTextFunc={returnHelperText2} setTyped={setTypedStreetNum} />
                </Box>
            </Box>

            <Box sx={{
                display: 'flex', flexDirection: 'row',
                width: '100%'
            }}>
                <Box sx={{
                    '& .MuiFormHelperText-root': {
                        position: 'absolute', bottom: 0
                    },
                    mr: 1, width: '75%'
                }}>
                    <InputField errorResult={errorCondCity} fieldLabel={'City'}
                        fieldValue={city} setFieldValue={setCity} autocompleteValue='address-level2'
                        textBoxLostFocus={textBox3LostFocus} setTextBoxLostFocus={setTextBox3LostFocus}
                        helperTextFunc={returnHelperText3} setTyped={setTypedCity} />
                </Box>

                <Box sx={{
                    width: '50%',
                    '& .MuiFormHelperText-root': {
                        position: 'relative', top: -60, left: 150
                    }
                }}>
                    <InputField errorResult={errorCondPostalCode} fieldLabel={'Postal code'}
                        fieldValue={postalCode} setFieldValue={setPostalCode} autocompleteValue='postal-code'
                        textBoxLostFocus={textBox4LostFocus} setTextBoxLostFocus={setTextBox4LostFocus}
                        helperTextFunc={returnHelperText4} setTyped={setTypedPostalCode} />
                </Box>
            </Box>
        </Box>
    );
}