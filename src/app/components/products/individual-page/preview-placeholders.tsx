import { useTheme } from '@mui/material/styles';

export default function PreviewPlaceholders() {
    const theme = useTheme();
    const borderColor = theme.palette.primary.light;

    return (
        <div className='flex flex-col gap-y-2 items-center me-5'>
            <div className='w-36 h-36 border-2 border-solid flex flex-row items-center'
                style={{ borderColor: borderColor }}>
                <div className='text-center'> Preview 1 Placeholder </div>
            </div>

            <div className='w-36 h-36 border-2 border-solid flex flex-row items-center'
                style={{ borderColor: borderColor }}>
                <div className='text-center'> Preview 2 Placeholder </div>
            </div>
        </div>
    )
}