import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

export default function SearchWrapper ({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
  
    return (
      <Box
        sx={{
          position: 'relative',
          backgroundColor: alpha(theme.palette.common.white, 0.15),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
          },
          width: '100%',
          height: '50px',
          display: 'flex',
          flexDirection: 'row'
        }}>
        {children}
      </Box>
    )
  }