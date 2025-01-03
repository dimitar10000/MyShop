import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function BackButton() {
    return (
        <Button variant='outlined' color='info'
                href='/delivery-payment'
                sx={{textTransform: 'none',
                    width: 320, height: 50, 
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2
                    },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    pl: 0
                }}>
            <NavigateBeforeIcon className='mr-3' sx={{width: 26, height: 26}}/>
            <div className='text-lg text-center leading-none'> Back to delivery and payment</div>
        </Button>
    )
}