import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Choices from "./Choices";

export default function ChoicesDialog({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [workout, setWorkout] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function selectchoice(selection) {
    if (!workout.includes(String(selection))) {
      //   console.log("includes ", workout, selection);
      setWorkout([...workout, selection]);
    } else {
      setWorkout(workout.filter((current) => current !== selection));
    }
  }

  const handleSubmit = () => {
    // console.log("inside dialog ", workout);
    onSelect(workout);
    setWorkout([]);
    setOpen(false);
  };
  return (
    <div>
      <Card
        sx={{
          borderRadius: 5,
          maxWidth: "300px",
          maxHeight: "260px",
          //   width: "400px",
          marginLeft: "12px",
          marginRight: "12px",
        }}
        onClick={handleClickOpen}
      >
        {" "}
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            width="260"
            image={"selectworkout.jpg"}
            alt={"test"}
          />
        </CardActionArea>
        <CardContent sx={{ backgroundColor: "white", cursor: "pointer" }}>
          <Typography gutterBottom variant="h5" component="div">
            Select Workout
          </Typography>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Select Workout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select your workout, you can select as many as you wish.
          </DialogContentText>
          <>
            <Choices onSelect={selectchoice} />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* can handleclose bacause each selection changes state in app */}
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

