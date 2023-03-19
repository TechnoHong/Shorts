import React from 'react';
import PropTypes from 'prop-types';
import {Box, Step, StepLabel, Stepper} from "@mui/material";
import {useTranslation} from "react-i18next";

const ShortsStepper = ({ step }) => {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            alignSelf: 'start',
            gap: '0.5rem',
          }}
        >
            <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
      );
};

const { t } = useTranslation(['page']);
const steps = [t('picking.step1'), t('picking.step2'), t('picking.step3')];

ShortsStepper.propTypes = {
    step: PropTypes.string.isRequired,
    description: PropTypes.string,
};

export default ShortsStepper;