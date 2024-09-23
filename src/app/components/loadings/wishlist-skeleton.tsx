import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Box from '@mui/material/Box';

export default function WishlistSkeleton() {

    return (

        <Box sx={{ flexGrow: 1, marginLeft: 10 }}>
            <div style={{
                display: 'grid', rowGap: '50px', columnGap: '20px',
                gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))'
            }}>
                <Skeleton height={300} width={260} />
                <Skeleton height={300} width={260} />
                <Skeleton height={300} width={260} />
            </div>
        </Box>
    )
}