'use client'
import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {grey} from '@mui/material/colors';
import { usePathname } from 'next/navigation';

export default function CartStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const currentPath = usePathname();
  const steps = ['Review products in the cart', 'Billing and payment', 'Delivery address'];

  useEffect(() => {
    if(currentPath === '/delivery-payment') {
      setActiveStep(1);
    }
    else if(currentPath === '/delivery-address') {
      setActiveStep(2);
    }
  },[])

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {completed: false};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel
              sx={{ '& .MuiStepLabel-label': {
                fontSize: '18px'
              },
              '& .MuiSvgIcon-root': {
                color: grey[600],
                fontSize: '28px'
              },
              '& .Mui-active .MuiSvgIcon-root': {
                color: grey[600]
              }
              }}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}