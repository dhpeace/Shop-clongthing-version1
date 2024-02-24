// eslint-disable-next-line no-unused-vars
import { TrendingUp } from "@mui/icons-material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Avatar, Box, Grid } from "@mui/material";

const salesData = [
  {
    status: "245k",
    title: "Sales",
    color: "primary",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    status: "24k",
    title: "Customers",
    color: "success",
    icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />,
  },

  {
    status: "24k",
    title: "Customers",
    color: "success",
    icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />,
  },

  {
    status: "24k",
    title: "Customers",
    color: "success",
    icon: <CurrencyExchangeIcon sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderStart = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "black",
          }}></Avatar>
      </Box>
    </Grid>
  ));
};
function MonthlyOverview() {
  return( 
  <div>


  </div>
  );
}

export default MonthlyOverview;
