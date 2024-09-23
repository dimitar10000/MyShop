import ErrorIcon from '@mui/icons-material/Error';

export default function LoadError({resource} : {resource: string}) {
    return (
        <div className='flex flex-row items-center'>
            <ErrorIcon sx={{fontSize: 36, marginRight: 2}}/>
            <div className='text-lg'> Server error, failed to load {resource}!</div>
        </div>
    )
}