import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import { useState, Dispatch, SetStateAction } from 'react';
import blue from '@mui/material/colors/blue';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

export default function PaymentBox({ paymentPriceUpdater }: {
    paymentPriceUpdater: Dispatch<SetStateAction<number>>
}) {
    const theme = useTheme();
    const themeBorderColor = theme.palette.primary.light;
    const option1Text = "Payment option 1 - card";
    const option2Text = "Payment option 2 - online service";
    const option3Text = "Payment option 3 - online service";
    const option4Text = "Payment on delivery";
    const [selectedValue, setSelectedValue] = useState<string>(option1Text);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);

        if(event.target.value === option4Text) {
            paymentPriceUpdater(3.99);
        }
        else {
            paymentPriceUpdater(0);
        }
    }

    const getItemStyle = (optionText: string) => {
        return {
            borderColor: selectedValue === optionText ? blue[600] : 'transparent',
            backgroundColor: selectedValue === optionText ? theme.analogousColor.green.main : 'transparent'
        } as React.CSSProperties;
    }

    return (
        <>
            <div className='mb-1 ml-3'> Payment </div>
            <Box sx={{
                width: "50vw", borderColor: themeBorderColor, borderWidth: "2px", borderStyle: 'solid',
                paddingTop: 1, paddingBottom: 1, display: 'flex', flexDirection: 'column'
            }}>
                <div className='mt-2 mx-2 pb-3 border-2'
                    style={getItemStyle(option1Text)}>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row items-center'>
                            <Radio
                                checked={selectedValue === option1Text}
                                onChange={handleChange}
                                value={option1Text}
                                name="radio-button-1"
                                inputProps={{ 'aria-label': option1Text }}
                                sx={{
                                    '&.Mui-checked': {
                                        color: blue[600]
                                    },
                                    mt: 1
                                }}
                            />
                            <CreditCardIcon fontSize='large' />
                            <div className='ms-3 mt-2 text-lg'> {option1Text} </div>
                        </div>
                        <div className='self-center mr-3'> FREE </div>
                    </div>
                </div>

                <div className='mx-2 pb-3 border-2'
                    style={getItemStyle(option2Text)}>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row items-center'>
                            <Radio
                                checked={selectedValue === option2Text}
                                onChange={handleChange}
                                value={option2Text}
                                name="radio-button-2"
                                inputProps={{ 'aria-label': option2Text }}
                                sx={{
                                    '&.Mui-checked': {
                                        color: blue[600]
                                    },
                                    mt: 1
                                }}
                            />
                            <CreditCardIcon fontSize='large' />
                            <div className='ms-3 mt-2 text-lg'> {option2Text} </div>
                        </div>
                        <div className='self-center mr-3'> FREE </div>
                    </div>
                </div>

                <div className='flex flex-row justify-between mx-2 pb-3 border-2'
                    style={getItemStyle(option3Text)}>
                    <div className='flex flex-row items-center'>
                        <Radio
                            checked={selectedValue === option3Text}
                            onChange={handleChange}
                            value={option3Text}
                            name="radio-button-3"
                            inputProps={{ 'aria-label': option3Text }}
                            sx={{
                                '&.Mui-checked': {
                                    color: blue[600]
                                },
                                mt: 1
                            }}
                        />
                        <CreditCardIcon fontSize='large' />
                        <div className='ms-3 mt-2 text-lg'> {option3Text} </div>
                    </div>
                    <div className='self-center mr-3'> FREE </div>
                </div>

                <div className='flex flex-row justify-between mb-2 mx-2 pb-3 border-2'
                    style={getItemStyle(option4Text)}>
                    <div className='flex flex-row items-center'>
                        <Radio
                            checked={selectedValue === option4Text}
                            onChange={handleChange}
                            value={option4Text}
                            name="radio-button-4"
                            inputProps={{ 'aria-label': option4Text }}
                            sx={{
                                '&.Mui-checked': {
                                    color: blue[600]
                                },
                                mt: 1
                            }}
                        />
                        <LocalPostOfficeIcon fontSize='large' />
                        <div className='ms-3 mt-2 text-lg'> {option4Text} </div>
                    </div>
                    <div className='self-center mr-3'> 3.99 $ </div>
                </div>
            </Box>
        </>
    );
}