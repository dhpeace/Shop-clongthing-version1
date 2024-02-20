// eslint-disable-next-line no-unused-vars
import { Step, StepLabel, Stepper } from "@mui/material";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import React from "react";

const steps = [
  "placed",
  "Order Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function OrderTracker({ activeStep }) {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: "#9155FD", fontSize: "44px" }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

OrderTracker.propTypes = {
  activeStep: PropTypes.number,
};

export default OrderTracker;
