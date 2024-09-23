import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpIcon from '@mui/icons-material/Help';

export default function LeftLinks() {
    return (
        <div className="flex flex-col gap-y-2">
                    <Box
                        height={50}
                        width={200}
                        display={"flex"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        gap={1}
                        p={1}
                        sx={{ backgroundColor: "#334155",
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                    >
                        <RefreshIcon sx={{ fontSize: 30 }} />
                        <span className='text-base'> Return a product </span>
                    </Box>

                    <Box
                        height={70}
                        width={200}
                        display={"flex"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        gap={1}
                        p={1}
                        sx={{ backgroundColor: "#334155",
                            '&:hover': {
                                cursor: 'pointer'
                            }
                         }}
                    >
                        <HelpIcon sx={{ fontSize: 30 }} />
                        <span className='text-base'> Frequently asked questions </span>
                    </Box>
                </div>
    )
}