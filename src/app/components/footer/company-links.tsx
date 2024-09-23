'use client'
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material';

export default function CompanyLinks({companyLinks} : {companyLinks: string[]}) {
    const theme = useTheme();
    const purpleColor = theme.analogousColor.purple.light;

    return (
        <div className="flex flex-col">
                    <div className='text-2xl mb-3 font-medium'> Company </div>
                    <div className='flex flex-col gap-y-2 [&_*:hover]:cursor-pointer'>
                        {companyLinks.map((link) => {
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