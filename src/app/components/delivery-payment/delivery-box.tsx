import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import blue from '@mui/material/colors/blue';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HomeIcon from '@mui/icons-material/Home';
import OutlinedInput from '@mui/material/OutlinedInput';


export default function DeliveryBox() {
    const theme = useTheme();
    const themeBorderColor = theme.palette.primary.light;
    const option1Text = "Delivery option 1 - address";
    const [selectedValue, setSelectedValue] = useState<string>(option1Text);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    }

    return (
        <>
            <div> Delivery </div>
            <Box sx={{
                width: "50vw", borderColor: themeBorderColor, borderWidth: "2px", borderStyle: 'solid',
                paddingTop: 1, paddingBottom: 1, display: 'flex', flexDirection: 'column'
            }}>
                <div>
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
                            <HomeIcon fontSize='large' />
                            <div className='ms-3 mt-2 text-lg'> {option1Text} </div>
                        </div>
                        <div className='self-center mr-3'> 3.99 $ </div>
                    </div>
                    <OutlinedInput sx={{
                        width: '80%',
                        ml: 2,
                        '& fieldset': {
                            borderColor: 'black'
                        },
                        '&:hover fieldset': {
                            borderColor: 'black'
                        },
                        input: {
                            paddingY: 1
                        }
                    }}
                    placeholder='Choose an address by clicking here'
                    />
                </div>
            </Box>
        </>
    )
}