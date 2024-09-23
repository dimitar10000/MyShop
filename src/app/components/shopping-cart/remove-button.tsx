'use client'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {Nullable} from '@/app/lib/definitions';

export default function RemoveButton({ confirmationDialog, openFunction }: {
    confirmationDialog: Nullable<JSX.Element>, openFunction: Nullable<() => void>
}) {

    return (<>
        <ClearRoundedIcon onClick={openFunction ? (e) => {
            openFunction();
        } : (e) => {}}
            sx={{
                '&:hover': {
                    cursor: 'pointer'
                }
            }} />
        {confirmationDialog}
    </>
    )
}