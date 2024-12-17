import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import blue from '@mui/material/colors/blue';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GoogleMaps from './google-maps';
import AddressInput from './address-input';
import SelectOffice from './select-office';

export default function DeliveryBox({ deliveryPriceUpdater }: {
    deliveryPriceUpdater: Dispatch<SetStateAction<number | null>>
}) {
    const theme = useTheme();
    const themeBorderColor = theme.palette.primary.light;
    const option1Text = "Delivery option 1 - address";
    const option2Text = "Delivery option 2 - offices";
    const option3Text = "Placeholder option 3";
    const option4Text = "Placeholder option 4";
    const [selectedValue, setSelectedValue] = useState<string>(option1Text);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    useEffect(() => {
        if (!openDialog) {
            inputRef.current?.blur();
        }
    }, [openDialog]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);

        if(event.target.value === option1Text) {
            deliveryPriceUpdater(3.99);
        }
        else {
            deliveryPriceUpdater(2.99);
        }
    }

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

    return (
        <>
            <div className='mb-1 ml-3'> Delivery </div>
            <Box sx={{
                width: "50vw", borderColor: themeBorderColor, borderWidth: "2px", borderStyle: 'solid',
                paddingTop: 1, paddingBottom: 1, display: 'flex', flexDirection: 'column'
            }}>
                <div className='mt-2 mb-2 mx-2 pb-3 border-2'
                    style={{ borderColor: selectedValue === option1Text ? theme.palette.secondary.light : 'transparent' }}>
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
                    {selectedValue === option1Text &&
                        <AddressInput openDialog={handleOpen} ref={inputRef} selectedPlace={selectedPlace} />
                    }
                </div>

                <div className='mb-2 mx-2 pb-3 border-2'
                    style={{ borderColor: selectedValue === option2Text ? theme.palette.secondary.light : 'transparent' }}>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row items-center'>
                            <Radio
                                checked={selectedValue === option2Text}
                                onChange={handleChange}
                                value={option2Text}
                                name="radio-button-1"
                                inputProps={{ 'aria-label': option2Text }}
                                sx={{
                                    '&.Mui-checked': {
                                        color: blue[600]
                                    },
                                    mt: 1
                                }}
                            />
                            <BusinessIcon fontSize='large' />
                            <div className='ms-3 mt-2 text-lg'> {option2Text} </div>
                        </div>
                        <div className='self-center mr-3'> 2.99 $ </div>
                    </div>
                    {selectedValue === option2Text && <SelectOffice />}
                </div>

                <div className='flex flex-row justify-between mb-2 mx-2 pb-3 border-2'
                    style={{ borderColor: selectedValue === option3Text ? theme.palette.secondary.light : 'transparent' }}>
                    <div className='flex flex-row items-center'>
                        <Radio
                            checked={selectedValue === option3Text}
                            onChange={handleChange}
                            value={option3Text}
                            name="radio-button-1"
                            inputProps={{ 'aria-label': option3Text }}
                            sx={{
                                '&.Mui-checked': {
                                    color: blue[600]
                                },
                                mt: 1
                            }}
                        />
                        <DeliveryDiningIcon fontSize='large' />
                        <div className='ms-3 mt-2 text-lg'> {option3Text} </div>
                    </div>
                    <div className='self-center mr-3'> 2.99 $ </div>
                </div>

                <div className='flex flex-row justify-between mb-2 mx-2 pb-3 border-2'
                    style={{ borderColor: selectedValue === option4Text ? theme.palette.secondary.light : 'transparent' }}>
                    <div className='flex flex-row items-center'>
                        <Radio
                            checked={selectedValue === option4Text}
                            onChange={handleChange}
                            value={option4Text}
                            name="radio-button-1"
                            inputProps={{ 'aria-label': option4Text }}
                            sx={{
                                '&.Mui-checked': {
                                    color: blue[600]
                                },
                                mt: 1
                            }}
                        />
                        <DeliveryDiningIcon fontSize='large' />
                        <div className='ms-3 mt-2 text-lg'> {option4Text} </div>
                    </div>
                    <div className='self-center mr-3'> 2.99 $ </div>
                </div>

                <div>
                    <Dialog
                        open={openDialog}
                        onClose={() => { handleClose(); }}
                        aria-labelledby="dialog-title"
                    >
                        <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} id="dialog-title">
                            Search for your address on the map
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={() => { handleClose(); }}
                            sx={(theme) => ({
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: theme.palette.grey[500],
                            })}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent dividers>
                            <GoogleMaps selectedPlace={selectedPlace}
                                selectedPlaceUpdater={setSelectedPlace} />
                        </DialogContent>
                    </Dialog>
                </div>
            </Box>
        </>
    )
}