import styles from './cart.module.css';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Dispatch, SetStateAction, useState } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function PackageInsurance({ insuranceIncluded, insuranceUpdater }:
    { insuranceIncluded: boolean, insuranceUpdater: Dispatch<SetStateAction<boolean>> }) {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                <div className='hover:cursor-pointer'
                    onClick={handleOpen}>
                    <InfoOutlinedIcon fontSize='medium' />
                </div>
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
                        style={{ textTransform: 'none' }}
                        onClick={() => { insuranceUpdater(true) }}>
                        <div className='text-base'> Add </div>
                    </Button>
                }
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="dialog-title"
                >
                    <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} id="dialog-title">
                        Package insurance
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Thanks to the package insurance service, you don't need to wait for the
                            situation to be resolved in case of damage or loss of the package within
                            the legal term.
                        </Typography>
                        <Typography gutterBottom>
                            All you have to do is report and document your lost or damaged
                            package and we will refund you as soon as possible for it.
                        </Typography>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}