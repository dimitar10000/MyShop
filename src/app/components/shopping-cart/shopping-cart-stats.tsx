import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import OutlinedInput from '@mui/material/OutlinedInput';
import CancelIcon from '@mui/icons-material/Cancel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from "@mui/material";
import { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config'

export default function ShoppingCartStats() {
    const [focusedInput, setFocusedInput] = useState<boolean>(false);
    const theme = useTheme();
    const fullConfig = resolveConfig(tailwindConfig)

    return (
        <div style={{ minWidth: 350, marginBottom: 20 }}>
            <div className='flex flex-row items-center justify-center mx-auto'>
                <LocalShippingOutlinedIcon sx={{ fontSize: 40 }} />
                <div className='text-lg ml-4 font-semibold'> X $ until free delivery</div>
            </div>

            <div className='flex flex-row items-center justify-center mt-3'>
                <FontAwesomeIcon icon={faRotateLeft} style={{ width: 32, height: 32 }} />
                <span className='text-lg ml-4 font-semibold'> 60 DAYS REFUND PERIOD </span>
            </div>

            <div className='mt-3'>
                <div className='flex flex-row justify-between text-red-700'>
                    <div> Saved: </div>
                    <div> X $</div>
                </div>

                <div className='flex flex-row justify-between mt-1'>
                    <div> Delivery price: </div>
                    <div> 4.99 $</div>
                </div>

                <div className='flex flex-row justify-between mt-1'>
                    <div> Package insurance: </div>
                    <div> 2.99 $</div>
                </div>

                <div className='flex flex-row justify-between mt-2'>
                    <div className='font-semibold'> You pay (tax included): </div>
                    <div className='text-red-700 text-lg'> XXX $</div>
                </div>

                <div className='flex flex-row items-center justify-between mt-2'>
                    <OutlinedInput
                        sx={{
                            width: focusedInput ? 120 : 180,
                            input: {
                                py: 1,
                                pl: focusedInput ? 1 : 0,
                                textAlign: 'left',
                                border: focusedInput ? 'solid black 1px' : 'solid transparent 1px'
                            },
                            '& fieldset': {
                                border: 'none'
                            },
                            '&:hover fieldset': {
                                border: 'none'
                            },
                        }}
                        onFocus={() => { setFocusedInput(true) }}
                        placeholder={focusedInput ? 'Enter code' : 'Use coupon (optional)'}
                    />

                    {focusedInput
                        ? <Button variant="contained"
                            sx={{
                                textTransform: 'none',
                                backgroundColor: theme.palette.primary.dark,
                                '&:hover': {
                                    filter: 'brightness(90%)'
                                },
                                mr: 10
                            }}>
                            Confirm
                        </Button>
                        : null
                    }
                    {focusedInput
                        ? <div className='flex flex-row'>
                            <div onClick={() => { setFocusedInput(false) }}
                                className='hover:cursor-pointer'>
                                <CancelIcon sx={{ fontSize: 28 }} />
                            </div>
                        </div>
                        : <LocalOfferIcon sx={{ fontSize: 28 }} />
                    }
                </div>

                <div className='flex flex-row justify-end mt-4'>
                    <Button variant="contained"
                        size='large'
                        endIcon={
                            <ChevronRightIcon />
                        }
                        sx={{
                            backgroundColor: fullConfig.theme.colors.orange[600],
                            '&:hover': {
                                backgroundColor: fullConfig.theme.colors.orange[700]
                            }
                        }}
                        >
                        CONTINUE
                    </Button>
                </div>
            </div>

        </div>
    )
}