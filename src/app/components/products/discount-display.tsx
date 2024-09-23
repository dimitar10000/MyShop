import Avatar from '@mui/material/Avatar';
import {Nullable} from '@/app/lib/definitions';

export default function DiscountDisplay({percent} : {percent: Nullable<number>}) {
    return (
        <Avatar style={{backgroundColor: 'orange', color: 'red', position: 'absolute',
            left: 5, bottom: 5, height: 60, width:60
        }}>
            <div className='text-xl font-bold'> -{percent}% </div>
         </Avatar>
    )
}