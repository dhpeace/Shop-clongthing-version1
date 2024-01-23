// eslint-disable-next-line no-unused-vars
import { Box, Button, Grid, TextField } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import AddressCard from "../AddressCard/AddressCard";

function DeliveryAddressForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      address: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    console.log(address);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="border rounded-lg shadow-lg h-[30.5rem] overflow-y-scroll bg-blue-50">
          <div className="p-5 py-7 border-b cursor-pointer bg-blue-100">
            <AddressCard />
            <Button
              sx={{ mt: 2 }}
              size="large"
              variant="contained"
              color="primary">
              Delivery here
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-lg shadow-lg p-5 bg-white">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="shipping address-line"
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid>
                  <Button
                    sx={{ mt: 2, py: 1.5 }}
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit">
                    Delivery here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default DeliveryAddressForm;
