// eslint-disable-next-line no-unused-vars
import { TrendingUp } from "@mui/icons-material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const salesData = [
  {
    status: "245k",
    title: "Sales",
    color: "primary",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    status: "12.5k",
    title: "Customers",
    color: "success",
    icon: <AccountCircleIcon sx={{ fontSize: "1.75rem" }} />,
  },

  {
    status: "1.54k",
    title: "Products",
    color: "success",
    icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />,
  },

  {
    status: "88k",
    title: "Revenue",
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
            background: `{item.color}`,
          }}>
          {item.icon}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.status}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};
function MonthlyOverview() {
  return (
    <Card>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600}}>
              Lợi nhuận 45,85%
            </Box>
            this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !imoportant",
            letterSpacing: ".15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStart()}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MonthlyOverview;
