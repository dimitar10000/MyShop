import OutlinedInput from '@mui/material/OutlinedInput';
import { useState,useEffect } from 'react';

export default function AddressInput({ openDialog, ref, selectedPlace }: {
    openDialog: () => void,
    ref: React.MutableRefObject<HTMLInputElement | null>,
    selectedPlace: google.maps.places.PlaceResult | null
}) {

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if(selectedPlace) {
            setInputValue(selectedPlace.formatted_address ?? "");
        }
    },[selectedPlace])

    return (
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
            autoFocus={false}
            placeholder='Choose an address by clicking here'
            onClick={openDialog}
            inputRef={ref}
            value={inputValue}
        />
    )
}