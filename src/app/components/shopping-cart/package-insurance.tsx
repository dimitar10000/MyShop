import styles from './cart.module.css';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Dispatch, SetStateAction } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Button } from "@mui/material";

export default function PackageInsurance({ insuranceIncluded, insuranceUpdater }:
    { insuranceIncluded: boolean, insuranceUpdater: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div key={'cart-package-insurance'} className={`${styles.wrapper} py-3 ps-5`}>

            <div className='flex flex-row justify-center'>
                <Inventory2OutlinedIcon sx={{ width: 55, height: 55 }} />
            </div>

            <div style={{ gridColumnStart: 2 }}
                className='flex flex-col items-start justify-center'>
                <div>
                    Package insurance
                </div>
            </div>

            <div style={{ gridColumnStart: 3 }}
                className='flex flex-row justify-start items-center'>
                    <InfoOutlinedIcon fontSize='medium' />
            </div>

            <div style={{ gridColumnStart: 4 }}
                className='flex flex-row justify-end items-center'>
                    <div> 2.99 $ </div>
            </div>

            <div style={{ gridColumnStart: 5 }}
                className='flex flex-row justify-center items-center'>
                {insuranceIncluded
                    ? <ClearRoundedIcon
                        onClick={() => { insuranceUpdater(false); }}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer'
                            },
                            width: 30,
                            height: 30
                        }} />
                    : <Button variant='contained'
                        color='success'
                        style={{ textTransform: 'none'}}
                        onClick={() => { insuranceUpdater(true) }}>
                        <div className='text-base'> Add </div>
                    </Button>
                }

            </div>
        </div>
    )
}