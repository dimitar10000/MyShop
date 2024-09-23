import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export default function ShoppingSkeleton() {
    const theme = useTheme();
    const themeBorderColor = theme.palette.primary.light;

    return (
        
        <Box sx={{width: '800px', marginBottom: 5,
            borderColor: themeBorderColor, borderWidth: "2px", borderStyle: 'solid'
        }}>
            <Skeleton height={160}/>
            <Skeleton height={112}/>
            <Skeleton height={150}/>
        </Box>
    )
}