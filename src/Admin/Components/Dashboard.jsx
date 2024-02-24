// eslint-disable-next-line no-unused-vars
import React from "react";
import { Grid } from "@mui/material";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";
import ProductsTable from "./ProductsTable";

function Dashboard() {
  return (
    <div className="p-5">
      <Grid container spacing={2}>
        {/* Achievement */}
        <Grid item xs={12} md={4}>
          <Achievement />
        </Grid>
        {/* MonthleOverview */}
        <Grid item xs={12} md={8}>
          <MonthlyOverview />
        </Grid>
        {/* ProductsTable */}
        <Grid item xs={12} md={6}>
          <ProductsTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
