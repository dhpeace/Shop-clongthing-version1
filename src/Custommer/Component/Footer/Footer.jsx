import * as React from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import SendIcon from "@mui/icons-material/Send";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Footer() {
  const [color, setColor] = React.useState("neutral");
  return (
    <div className="flex">
      <div style={{ display: "flex" }}>
        <Sheet
          variant="solid"
          color={color}
          invertedColors
          sx={{
            ...(color !== "neutral" && {
              bgcolor: `${color}.800`,
            }),
            flexGrow: 1,
            p: 2,
            borderRadius: { xs: 0, sm: "sm" },
          }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              variant="soft"
              size="sm"
              onClick={() => {
                const colors = [
                  "primary",
                  "neutral",
                  "danger",
                  "success",
                  "warning",
                ];

                const nextColorIndex = colors.indexOf(color) + 1;
                setColor(colors[nextColorIndex] ?? colors[0]);
              }}>
              <ColorLensRoundedIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" />
            <IconButton variant="plain">
              <FacebookRoundedIcon />
            </IconButton>
            <IconButton variant="plain">
              <GitHubIcon />
            </IconButton>
            <Input
              variant="outlined" // Sử dụng variant "outlined" để có đường viền xung quanh input
              placeholder="Type in your email"
              type="email"
              name="email"
              endDecorator={
                <IconButton variant="soft" aria-label="subscribe">
                  <SendIcon />
                </IconButton>
              }
              sx={{
                mr: "auto",
                display: { xs: "none", md: "flex" },
                width: "39%", // Đặt chiều rộng
                borderRadius: "12px", // Đặt độ bo tròn cho ô input
                "& input": {
                  padding: "14px", // Đặt lề và khoảng cách trong input
                  fontSize: "16px", // Đặt kích thước chữ
                },
              }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { md: "flex-start" },
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}>
            <div className="flex flex-row gap-5 m-1 py-2 p-10">
              <Card
                variant="soft"
                size="sm"
                sx={{
                  flexDirection: { xs: "row", md: "column" },
                  minWidth: { xs: "100%", md: "auto" },
                  gap: 1,
                }}>
                <AspectRatio
                  ratio="21/9"
                  minHeight={80}
                  sx={{ flexBasis: { xs: 200, md: "initial" } }}>
                  <img
                    alt=""
                    src="https://mcdn.coolmate.me/image/January2024/mceclip9.png"
                  />
                </AspectRatio>
                <CardContent>
                  <Typography level="body-sm">
                    COOLMATE lắng nghe bạn!
                  </Typography>
                  <Typography level="body-xs">
                    Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến
                    đóng góp từ khách hàng
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="soft"
                size="sm"
                sx={{
                  flexDirection: { xs: "row", md: "column" },
                  minWidth: { xs: "100%", md: "auto" },
                  gap: 1,
                }}>
                <AspectRatio
                  ratio="21/9"
                  minHeight={80}
                  sx={{ flexBasis: { xs: 200, md: "initial" } }}>
                  <img
                    alt=""
                    src="https://mcdn.coolmate.me/image/October2023/mceclip1_15.png"
                  />
                </AspectRatio>
                <CardContent>
                  <Typography level="body-sm">
                    COOLMATE lắng nghe bạn!
                  </Typography>
                  <Typography level="body-xs">
                    Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến
                    đóng góp từ khách hàng
                  </Typography>
                </CardContent>
              </Card>
              <Card
                variant="soft"
                size="sm"
                sx={{
                  flexDirection: { xs: "row", md: "column" },
                  minWidth: { xs: "100%", md: "auto" },
                  gap: 1,
                }}>
                <AspectRatio
                  ratio="21/9"
                  minHeight={80}
                  sx={{ flexBasis: { xs: 200, md: "initial" } }}>
                  <img
                    alt=""
                    src="https://mcdn.coolmate.me/image/October2023/mceclip1_15.png"
                  />
                </AspectRatio>
                <CardContent>
                  <Typography level="body-sm">
                    COOLMATE lắng nghe bạn!
                  </Typography>
                  <Typography level="body-xs">
                    Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến
                    đóng góp từ khách hàng
                  </Typography>
                </CardContent>
              </Card>
            </div>
            {/* Phần dưới */}
            <Sheet
              variant="solid"
              color={color}
              invertedColors
              sx={{
                flexGrow: 1,
                display: "flex",
                bgcolor: color === "primary" ? "#042449" : undefined,
                p: { xs: "36px", md: "70px" },
                pt: { xs: "24px", md: "60px" },
                borderRadius: "lg",
                overflow: "hidden",
                "& button": { borderRadius: "xl" },
              }}>
              <Box sx={{ zIndex: 1, position: "relative" }}>
                <Typography level="h2">COOLMATE lắng nghe bạn!</Typography>
                <Typography sx={{ mt: 0.5, mb: 2 }}>
                  Chúng tôi luôn trân trọng góp ý từ khách hàng
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    maxWidth: "max-content",
                    "& > *": { flexGrow: 1, fontWeight: "lg" },
                  }}>
                  <Button
                    sx={{
                      minWidth: 120,
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "lightgray",
                      },
                    }}
                    className="bg-white-500 hover:bg-white-300">
                    Install
                  </Button>
                  <Button
                    variant="plain"
                    endDecorator={<ArrowForwardIcon fontSize="md" />}
                    sx={{
                      "&:hover": { "--Button-gap": "0.625rem" },
                      "& span": { transition: "0.15s" },
                    }}>
                    See the docs
                  </Button>
                </Box>
              </Box>
              <Box
                component="img"
                alt=""
                src="https://mcdn.coolmate.me/image/March2023/mceclip0_137.jpg"
                sx={{ position: "absolute", height: "100%", top: 0, right: 0 }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "1.5rem",
                  right: "1.5rem",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  const colors = [
                    "primary",
                    "neutral",
                    "danger",
                    "success",
                    "warning",
                  ];

                  const nextColorIndex = colors.indexOf(color) + 1;
                  setColor(colors[nextColorIndex] ?? colors[0]);
                }}>
                <ColorLensRoundedIcon fontSize="small" />
              </IconButton>
              <List
                size="sm"
                orientation="horizontal"
                wrap
                sx={{
                  ml: 9,
                  gap: 3,
                  flexGrow: 0,
                  "--ListItem-radius": "8px",
                  "--ListItem-gap": "0px",
                }}>
                <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
                  <ListSubheader sx={{ fontWeight: "xl" }}>
                    Sitemap
                  </ListSubheader>
                  <List>
                    <ListItem>
                      <ListItemButton>Services</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Blog</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>About</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Services</ListItemButton>
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem nested sx={{ width: { xs: "50%", md: 180 } }}>
                  <ListSubheader sx={{ fontWeight: "xl" }}>
                    Products
                  </ListSubheader>
                  <List sx={{ "--ListItemDecorator-size": "32px" }}>
                    <ListItem>
                      <ListItemButton>Joy UI</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Base UI</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Material UI</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Joy UI</ListItemButton>
                    </ListItem>
                  </List>
                </ListItem>
              </List>
            </Sheet>
          </Box>
        </Sheet>
      </div>
    </div>
  );
}
