import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import {useState,useEffect} from 'react';
import SliderInputs from './slider-inputs';
import SearchButton from './search-button';
import {useSearchParams} from 'next/navigation'

export default function PriceSlider({initialRange} : {initialRange: number[]}) {
    const [value, setValue] = useState(initialRange);
    const searchParams = useSearchParams();
    const [mySearchParams, setMySearchParams] = useState(new URLSearchParams(searchParams));

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }

    useEffect(() => {
        setValue(initialRange);

        const paramsObj = new URLSearchParams(searchParams);
        paramsObj.set('minp',initialRange[0].toString());
        paramsObj.set('maxp',initialRange[1].toString());
        setMySearchParams(paramsObj);

    },[initialRange,searchParams]);

    return (
        <Box sx={{ width: 260 }}>
            <Slider color={'info'} value={value} onChange={handleChange}
            aria-label="Price slider" valueLabelDisplay="auto" sx={{width: 220, height: 5,marginLeft: 1}}
            size='medium' min={initialRange[0]} max={initialRange[1]}/>

            <div className='mt-2'>
                <SliderInputs range={value} sliderUpdater={setValue} paramsUpdater={setMySearchParams}/>
            </div>

            <div className='mt-5'>
                <SearchButton paramsObj={mySearchParams}/>
            </div>
            
        </Box>
    )
}