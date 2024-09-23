'use client'
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';

export default function ClientLinks({clientsLinks} : {clientsLinks: string[]}) {
    const theme = useTheme();
    const purpleColor = theme.analogousColor.purple.light;

    return (
        <div className="flex flex-col">
                    <div className='text-2xl mb-3 font-medium'> Clients </div>
                    <div className='flex flex-col gap-y-2 [&_*:hover]:cursor-pointer'>
                        {clientsLinks.map((link) => {
                            return (
                                <Box key={link} className='text-base'
                                    sx={{
                                        '&:hover': {
                                            color: purpleColor
                                        }
                                    }}
                                    >
                                    {link}
                                </Box>
                            )
                        })}
                    </div>
                </div>
    )
}