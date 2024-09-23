import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export default function SearchIconWrapper ({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
  
    return (
      <Box
        sx={{
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {children}
      </Box>);
  }