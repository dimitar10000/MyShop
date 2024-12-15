import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import { useState,useRef,useEffect } from 'react';
import blue from '@mui/material/colors/blue';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HomeIcon from '@mui/icons-material/Home';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GoogleMaps from './google-maps';
import AddressInput from './address-input';

export default function DeliveryBox() {
    const theme = useTheme();
    const themeBorderColor = theme.palette.primary.light;
    const option1Text = "Delivery option 1 - address";
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
    }

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

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
                    <AddressInput openDialog={handleOpen} ref={inputRef} selectedPlace={selectedPlace}/>
                </div>

                <div>
                    <Dialog
                        open={openDialog}
                        onClose={() => {handleClose();}}
                        aria-labelledby="dialog-title"
                    >
                        <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} id="dialog-title">
                            Search for your address on the map
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={() => {handleClose();}}
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
                            selectedPlaceUpdater={setSelectedPlace}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </Box>
        </>
    )
}