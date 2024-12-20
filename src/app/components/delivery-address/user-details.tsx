import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import InputField from './input-field';

export default function UserDetails({ user }: { user: UserProfile | undefined }) {
    const [email, setEmail] = useState<string>("");
    const [typedEmail, setTypedEmail] = useState<boolean>(false);

    const [phone, setPhone] = useState<string>("");
    const [typedPhone, setTypedPhone] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [typedName, setTypedName] = useState<boolean>(false);

    const [surname, setSurname] = useState<string>("");
    const [typedSurname, setTypedSurname] = useState<boolean>(false);

    const [textBox1LostFocus, setTextBox1LostFocus] = useState<boolean>(false);
    const [textBox2LostFocus, setTextBox2LostFocus] = useState<boolean>(false);
    const [textBox3LostFocus, setTextBox3LostFocus] = useState<boolean>(false);
    const [textBox4LostFocus, setTextBox4LostFocus] = useState<boolean>(false);

    useEffect(() => {
        if (textBox1LostFocus && email === "") {
            setTypedEmail(false);
        };
    }, [textBox1LostFocus])

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const isValidPhone = (phone: string) => {
        return false;
    }

    const isEmptyValue = (value: string) => value === "";

    const errorCondEmail = isEmptyValue(email) && typedEmail ||
        email.length >= 5 ? !isValidEmail(email) : false;

    const errorCondPhone = isEmptyValue(phone) && typedPhone ||
        phone.length >= 5 ? !isValidPhone(phone) : false;

    const returnHelperText1 = () => {
        if (textBox1LostFocus) {
            return "";
        }
        else if (isEmptyValue(email) && typedEmail) {
            return 'This field cannot be empty.';
        }
        else if (email.length >= 5) {
            if (!isValidEmail(email)) {
                return 'The email must be in a correct format';
            }
        }

        return "";
    }

    const returnHelperText2 = () => {
        if (textBox2LostFocus) {
            return "";
        }
        else if (isEmptyValue(phone) && typedPhone) {
            return 'This field cannot be empty.';
        }
        else if (phone.length >= 5) {
            if (!isValidPhone(phone)) {
                return 'The phone must be in a correct format';
            }
        }

        return "";
    }

    return (
        <Box sx={{
            '& .MuiTextField-root': {
                '& label': { color: 'white' }, '& label.Mui-focused': { color: 'white' },
                '& fieldset': { border: 'none' }, width: "100%", mb: 2
            }
        }}>
            <InputField errorResult={errorCondEmail} fieldLabel={'Email'}
                fieldValue={email} setFieldValue={setEmail} autocompleteValue='email'
                textBoxLostFocus={textBox1LostFocus} setTextBoxLostFocus={setTextBox1LostFocus}
                helperTextFunc={returnHelperText1} setTyped={setTypedEmail} />

            <InputField errorResult={errorCondPhone} fieldLabel={'Phone'}
                fieldValue={phone} setFieldValue={setPhone} autocompleteValue='phone'
                textBoxLostFocus={textBox2LostFocus} setTextBoxLostFocus={setTextBox2LostFocus}
                helperTextFunc={returnHelperText2} setTyped={setTypedPhone} />
        </Box>
    )
}