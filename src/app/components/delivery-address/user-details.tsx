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
        return /^[0-9]{10}$/.test(phone);
    }

    const isValidName = (name: string) => {
        return /^[A-Za-z]+$/.test(name);
    }

    const isEmptyValue = (value: string) => value === "";

    const errorCondEmail = isEmptyValue(email) && typedEmail ||
        email.length >= 5 ? !isValidEmail(email) : false;

    const errorCondPhone = isEmptyValue(phone) && typedPhone ||
        phone.length >= 5 ? !isValidPhone(phone) : false;

    const errorCondName = isEmptyValue(name) && typedName ||
        name.length >= 1 ? !isValidName(name) : false;

    const errorCondSurname = isEmptyValue(surname) && typedSurname ||
        surname.length >= 1 ? !isValidName(surname) : false;

    const returnHelperText1 = () => {
        if (textBox1LostFocus) {
            return "";
        }
        else if (isEmptyValue(email) && typedEmail) {
            return 'This field cannot be empty.';
        }
        else if (email.length >= 5) {
            if (!isValidEmail(email)) {
                return 'The email must be in a correct format.';
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
                return 'The phone must be in a correct format.';
            }
        }

        return "";
    }

    const returnHelperText3 = () => {
        if (textBox3LostFocus) {
            return "";
        }
        else if (isEmptyValue(name) && typedName) {
            return 'This field cannot be empty.';
        }
        else if (name.length >= 1) {
            if (!isValidName(name)) {
                return 'Only letters are allowed in the name.';
            }
        }

        return "";
    }

    const returnHelperText4 = () => {
        if (textBox4LostFocus) {
            return "";
        }
        else if (isEmptyValue(surname) && typedSurname) {
            return 'This field cannot be empty.';
        }
        else if (surname.length >= 1) {
            if (!isValidName(surname)) {
                return 'Only letters are allowed in the name.';
            }
        }

        return "";
    }

    return (
        <Box sx={{
            '& .MuiTextField-root': {
                '& label': { color: 'white' }, '& label.Mui-focused': { color: 'white' },
                '& fieldset': { border: 'none' }, width: "100%", mb: 2
            },
            '& .MuiFormHelperText-root': {
                position: 'absolute', bottom: 0
            }
        }}>
            <div className='text-sm mb-3'>
                Already have an account? Log in
                <span className='underline ml-1 mr-1 text-blue-900 hover:brightness-110 hover:cursor-pointer'>
                    here
                </span>
                to fill out the details automatically!
                <br/>
                No account yet? Register
                <span className='underline ml-1 mr-1 text-blue-900 hover:brightness-110 hover:cursor-pointer'>
                    here
                </span>
                to not have to fill this out next time!
            </div>

            <InputField errorResult={errorCondEmail} fieldLabel={'Email'}
                fieldValue={email} setFieldValue={setEmail} autocompleteValue='email'
                textBoxLostFocus={textBox1LostFocus} setTextBoxLostFocus={setTextBox1LostFocus}
                helperTextFunc={returnHelperText1} setTyped={setTypedEmail} />

            <InputField errorResult={errorCondPhone} fieldLabel={'Phone'}
                fieldValue={phone} setFieldValue={setPhone} autocompleteValue='phone'
                textBoxLostFocus={textBox2LostFocus} setTextBoxLostFocus={setTextBox2LostFocus}
                helperTextFunc={returnHelperText2} setTyped={setTypedPhone} />

            <InputField errorResult={errorCondName} fieldLabel={'First name'}
                fieldValue={name} setFieldValue={setName} autocompleteValue='first-name'
                textBoxLostFocus={textBox3LostFocus} setTextBoxLostFocus={setTextBox3LostFocus}
                helperTextFunc={returnHelperText3} setTyped={setTypedName} />

            <InputField errorResult={errorCondSurname} fieldLabel={'Last name'}
                fieldValue={surname} setFieldValue={setSurname} autocompleteValue='last-name'
                textBoxLostFocus={textBox4LostFocus} setTextBoxLostFocus={setTextBox4LostFocus}
                helperTextFunc={returnHelperText4} setTyped={setTypedSurname} />

        </Box>
    )
}