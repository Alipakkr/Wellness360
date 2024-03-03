import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Selection from "./Selection";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Choices = ({ onSelect }) => {
  return (
    <div className="choices-grid">
      <Box
        sx={{
        //   border: 1,
          borderRadius: 5,
          flexGrow: 1,
          margin: "0 auto",
          padding: "12px",
        }}
      >
        <Grid container spacing={2} marginTop="0px">
          <Grid item xs={4} md={3} lg={2.4}>
            <Selection
              image={"pushup.jpg"}
              onSelect={onSelect}
              action="Chest"
            />
          </Grid>
          <Grid item xs={4} md={3} lg={2.4}>
            <Selection image={"pullup.jpg"} onSelect={onSelect} action="Back" />
          </Grid>
          <Grid item xs={4} md={3} lg={2.4}>
            <Selection
              image={"armworkout.jpg"}
              onSelect={onSelect}
              action="Arms"
            />
          </Grid>
          <Grid item xs={4} md={3} lg={2.4}>
            <Selection image={"lunges.jpg"} onSelect={onSelect} action="Legs" />
          </Grid>
          <Grid item xs={4} md={3} lg={2.4}>
            <Selection
              image={"cardio.jpg"}
              onSelect={onSelect}
              action="Cardio"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Choices;

