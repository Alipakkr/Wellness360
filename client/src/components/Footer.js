import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const ref = React.useRef(null);

  const onOpen = () => {
    window.open("https://github.com/Alipakkr/ByteBrains");
  };

  const onOpenLinkedIn = () => {
    window.open("https://www.linkedin.com/in/alipa-55b365285/");
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation showLabels sx={{ backgroundColor: "#1976d2" }}>
          <BottomNavigationAction
            label="Github"
            icon={<GitHubIcon />}
            onClick={() => onOpen()}
            sx={{ color: "white" }}
          />
          <BottomNavigationAction
            label="LinkedIn"
            icon={<LinkedInIcon />}
            onClick={() => onOpenLinkedIn()}
            sx={{ color: "white" }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Footer;

