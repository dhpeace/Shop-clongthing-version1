// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Card, CardContent, Typography, styled } from "@mui/material";

const TrignleImg = styled("img")({
  right: "0",
  bottom: "0",
  height: "100%",
  position: "absolute",
});

const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 170,
  position: "absolute",
});

function Achievement() {
  return (
    <Card
      sx={{ position: "relative", bgcolor: "white", color: "black" }}
      className="space-y-5">
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Shopping with Coolmate
        </Typography>
        <Typography variant="body2"> Xin chúc mừng </Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>
          1000.000k
        </Typography>
        <Button size="smail" variant="contained">
          Xem đơn hàng
        </Button>

        <TrignleImg src="" alt=""></TrignleImg>
        <TrophyImg src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/December2023/ao-thun-gym-powerfit-8_47.jpg" />
      </CardContent>
    </Card>
  );
}

export default Achievement;
