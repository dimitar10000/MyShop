import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function Guarantees() {
    const divider = <Divider orientation="vertical" flexItem sx={{width: "2px", backgroundColor: "black"}} />;

    return (
        <div style={{ marginLeft: "6%", marginRight: "6%" }}>
            <Box sx={{ p: 1, border: '2px solid #334155' }}
                height={60}
                display={"flex"}
                justifyContent={"center"}
            >
            <div className='flex flex-row items-center gap-2 mx-auto'>
                <LocalShippingOutlinedIcon sx={{fontSize: 40}}/>
                <span className='text-lg'> FREE DELIVERY </span>
            </div>
            {divider}
            <div className='flex flex-row items-center gap-2 mx-auto'>
                <FontAwesomeIcon icon={faRotateLeft} style={{width: 36, height: 36}}/>
                <span className='text-lg'> 60 DAYS REFUND PERIOD </span>
            </div>
            {divider}
            <div className='flex flex-row items-center gap-2 mx-auto'>
                <LocalOfferIcon sx={{fontSize: 36}}/>
                <span className='text-xl'> NEW DISCOUNTS DAILY</span>
            </div>
            </Box>
        </div>
    );
}