import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function BackButton() {
    return (
        <Button variant='outlined' color='info'
                href='/shopping-cart'
                sx={{textTransform: 'none',
                    width: 200, height: 50,
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2
                    },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    pl: 0
                }}>
            <NavigateBeforeIcon fontSize='large' className='mr-3'/>
            <div className='text-xl'> Back to cart</div>
        </Button>
    )
}