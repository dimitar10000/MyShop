'use client'
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UseMutationResult } from '@tanstack/react-query';
import {isAsyncType,Wishlist} from '@/app/lib/definitions';

export interface DialogProperties {
    title: string,
    content: string,
    buttons: {
        confirm: string,
        cancel: string
    },
    openState: boolean,
    setOpenState: any,
    onConfirmFunction: ((...args: any[]) => Promise<void>) | UseMutationResult<Wishlist|null|undefined> | null,
    onCloseFunction: ((...args: any[]) => void) | null
}

const ConfirmationDialog = ({title,content,buttons,openState,setOpenState,onConfirmFunction, onCloseFunction}: DialogProperties) => {

    const handleClose = () => {
        if(onCloseFunction) {
            onCloseFunction();
        }

        setOpenState(false);
    };

    return (
        <Dialog
            open={openState}
            onClose={(e: Event) => {
                e.stopPropagation();
                handleClose();
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{textAlign: 'center',
                '& .MuiDialogActions-root': {
                    marginBottom: 3
                },
                '& .MuiDialogTitle-root': {
                    marginTop: 4
                }
            }}>
            <DialogTitle id="alert-dialog-title"
                        sx={{width: 500}}>
                {title}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                }
                }
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-evenly', justifyItems: 'center' }}>
                <Button onClick={(e) => {
                    e.stopPropagation();
                    handleClose();}
                }
                        sx={{':hover': {backgroundColor: 'red', filter: 'brightness(90%)'}, textTransform: 'none', fontSize: 18,
                        color: 'white', backgroundColor: 'red', width: 150 }}>
                    {buttons.cancel}
                </Button>
                <Button onClick={async (e) => {
                    e.stopPropagation();
                    if(onConfirmFunction && isAsyncType(onConfirmFunction)) {
                        await onConfirmFunction();
                    }
                    else if(onConfirmFunction) {
                        onConfirmFunction.mutate(undefined);
                    }
                    handleClose();
                }} autoFocus
                        sx={{':hover': {backgroundColor: 'green', filter: 'brightness(90%)'}, textTransform: 'none', fontSize: 18,
                        color: 'white',backgroundColor: 'green', width: 150 }}>
                    {buttons.confirm}
                </Button>
            </DialogActions>
        </Dialog>
        );
}

// takes title, content and text values for confirm and cancel button of confirmation dialog
// returns the dialog, function to open it and setters for the functions executed on confirm
// and cancel button
export function useConfirmationDialog(title: string, content: string, buttons: { confirm: string, cancel: string }) {
    const [open, setOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState<DialogProperties['onConfirmFunction']>(null);
    const [onClose, setOnClose] = useState<DialogProperties['onCloseFunction']>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const dialog= <ConfirmationDialog title={title} content={content} buttons={{ confirm: buttons.confirm, cancel: buttons.cancel }}
        openState={open} setOpenState={setOpen} onConfirmFunction={onConfirm} onCloseFunction={onClose}/>;
    
    return { confirmationDialog: dialog, openFunction: handleClickOpen, setConfirmFunction: setOnConfirm, setCloseFunction: setOnClose};
}