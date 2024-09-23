import Button from '@mui/material/Button';
import {useTransitionSnackbar} from './transition-snackbar';
import { usePathname, useRouter } from 'next/navigation';
import {URLSearchParams} from 'url'

export default function SearchButton({paramsObj} : {paramsObj: URLSearchParams}) {
    const pathname = usePathname();
    const { replace } = useRouter();
    const [snackbar,handleClick] = useTransitionSnackbar('The maximum price range cannot be smaller than the minimum.');
    const [snackbar2, handleClick2] = useTransitionSnackbar('Price fields must be numeric.');

    const input1 = paramsObj.get('minp');
    const input2 = paramsObj.get('maxp');

    return (<>
        <Button variant="contained" color='info' sx={{ textTransform: 'none', width: 230 }}
                onClick={() => {
                    if(input1 && input2 && Number(input1) > Number(input2)) {
                        handleClick();
                    }
                    else if(input1 && input2 && isNaN(Number(input1)) || isNaN(Number(input2))) {
                        handleClick2();
                    }
                    else {
                        replace(`${pathname}?${paramsObj.toString()}`);
                    }
                }}>
            <div className='text-lg'>
                Search
            </div>
        </Button>
        {snackbar}
        {snackbar2}
        </>
    )
}