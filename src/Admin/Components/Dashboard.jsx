// eslint-disable-next-line no-unused-vars
import React from "react";
import { Grid } from "@mui/material";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";

function Dashboard() {
  return (
    <div className="p-10">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achievement />
        </Grid>
        <Grid item xs={12} md={8}>
          <MonthlyOverview />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
