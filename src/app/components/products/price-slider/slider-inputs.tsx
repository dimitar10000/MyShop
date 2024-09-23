import OutlinedInput from '@mui/material/OutlinedInput';
import {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {useSearchParams} from 'next/navigation'

export default function SliderInputs({range, sliderUpdater, paramsUpdater} : {range: number[],
    sliderUpdater: Dispatch<SetStateAction<number[]>>,
    paramsUpdater: Dispatch<SetStateAction<URLSearchParams>>}) {
    
    const [textBoxMin, setTextBoxMin] = useState<string>(range[0].toString());
    const [textBoxMax, setTextBoxMax] = useState<string>(range[1].toString());
    const searchParams = useSearchParams();
    
    useEffect(() => {
        setTextBoxMin(range[0].toString());
        setTextBoxMax(range[1].toString());

        const paramsObj = new URLSearchParams(searchParams);
        paramsObj.set('minp',range[0].toString());
        paramsObj.set('maxp',range[1].toString());        

        paramsUpdater(paramsObj);

    },[range]);

    const fillParamsObject = (paramName: string,newValue: string) => {
        const paramsObj = new URLSearchParams(searchParams);

        if(paramName === 'minp') {
            paramsObj.set('minp',newValue);
            paramsObj.set('maxp',range[1].toString());
        }
        else {
            paramsObj.set('maxp',newValue);
            paramsObj.set('minp',range[0].toString());
        }

        paramsUpdater(paramsObj);
    }

    return (
        <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center'>
                    <div className='text-base border-2 border-blue-400 border-r-0 px-2 py-1'> $ </div>
                    <div className='text-base border-2 border-blue-400 py-1'>
                        <OutlinedInput type='text' value={textBoxMin}
                        onChange={(e) => {
                            setTextBoxMin(e.target.value);
                            sliderUpdater((prev) => [Number(e.target.value),prev[1]]);
                            fillParamsObject('minp',e.target.value);
                        }}
                        sx={{'& .MuiOutlinedInput-notchedOutline': {
                                 border: 'none',
                                },height: 20,width: 80,fontWeight: 600}} />
                    </div>
                </div>
                <div className='flex flex-row items-center me-7'>
                    <div className='text-base border-2 border-blue-400 border-r-0 px-2 py-1'> $ </div>
                    <div className='text-base border-2 border-blue-400 py-1'>
                    <OutlinedInput type='text' value={textBoxMax}
                        onChange={(e) => {
                            setTextBoxMax(e.target.value);
                            sliderUpdater((prev) => [prev[0],Number(e.target.value)]);
                            fillParamsObject('maxp',e.target.value);
                        }}
                        sx={{'& .MuiOutlinedInput-notchedOutline': {
                                 border: 'none',
                                },
                                height: 20,width: 80,fontWeight: 600}} />
                    </div>
                </div>
            </div>
    )
}