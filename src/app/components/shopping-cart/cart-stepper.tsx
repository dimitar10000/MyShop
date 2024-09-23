'use client'
import {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {grey} from '@mui/material/colors';

export default function CartStepper() {
  const steps = ['Review products in the cart', 'Billing and payment', 'Delivery address'];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    // logic for when 1st and 2nd step are completed
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
              }
              }}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <div>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&lsquo;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </div>
      ) : null}
    </Box>
  );
}