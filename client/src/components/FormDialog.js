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
import Stack from "@mui/material/Stack";
import Goal from "./Goal";
import Gender from "./Gender";
import Switch from "@mui/material/Switch";

export default function FormDialog({
  onAdd,
  newplan,
  onChoose,
  onChooseGender,
}) {
  const [open, setOpen] = useState(false);
  const [foot, setFoot] = useState(null);
  const [inches, setInches] = useState(null);
  const [weight, setWeight] = useState(null);
  const [metric, setMetric] = useState(false);
  const [notSay, setNotSay] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(foot, inches, weight);
    if (
      (foot === 0 ||
        foot == null ||
        inches === 0 ||
        inches == null ||
        weight === 0 ||
        weight === null) &&
      !notSay
    ) {
      alert("Please add a valid number");
      return;
    }
    let centimeters = 0;
    let currentWeight = Number(weight);
    if (!metric) {
      centimeters = Math.round(Number(foot * 30.48) + Number(inches * 2.54));
      currentWeight = Math.round(Number(weight * 0.4536));
    } else {
      //convert to centimeters
      centimeters = Math.round(Number(foot * 100) + Number(inches));
    }
    onAdd({ centimeters, currentWeight, notSay });
    setOpen(false);
  };
  //   const newPlan = () => {
  //     setFoot(0);
  //     setInches(0);
  //     setWeight(0);
  //     setMetric(false);
  //     setNotSay(false);
  //     newplan();
  //   };

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
            image={"personalize.jpg"}
            alt={"test"}
          />
        </CardActionArea>
        <CardContent sx={{ backgroundColor: "white", cursor: "pointer" }}>
          <Typography gutterBottom variant="h5" component="div">
            Personalize
          </Typography>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Personalize</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the following to get an accurate estimate of your
            caloric needs to achieve your goals.
          </DialogContentText>
          <>
            {/* <Typography variant="h5">Personalize (Optional)</Typography> */}
            <form className="add-form" onSubmit={onSubmit}>
              <Stack
                direction="row"
                position="relative"
                justifyContent="space-between"
              >
                <div className="form-control">
                  {metric ? (
                    <label>Height (Metric)</label>
                  ) : (
                    <label>Height (Imperial)</label>
                  )}
                  {notSay ? (
                    <>
                      <input
                        className="private"
                        type="number"
                        disabled={true}
                        onChange={(e) => setFoot(e.target.value)}
                      />
                      <input
                        className="private"
                        type="number"
                        disabled={true}
                        onChange={(e) => setInches(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        className="input-form"
                        type="number"
                        value={foot}
                        placeholder={metric ? "m" : "feet"}
                        onChange={(e) => setFoot(e.target.value)}
                      />
                      <input
                        className="input-form"
                        type="number"
                        value={inches}
                        placeholder={metric ? "cm" : "inches"}
                        onChange={(e) => setInches(e.target.value)}
                      />
                    </>
                  )}
                </div>

                <div className="form-control">
                  {metric ? (
                    <label>Weight (KG) </label>
                  ) : (
                    <label>Weight (LB)</label>
                  )}
                  {notSay ? (
                    <input
                      className="private"
                      type="number"
                      disabled={true}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  ) : (
                    <input
                      className="input-form"
                      type="number"
                      value={weight}
                      placeholder={metric ? "kg" : "lb"}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  )}
                </div>
              </Stack>
              <Stack
                direction="row"
                position="relative"
                justifyContent="space-between"
                sx={{ margin: "18px" }}
              >
                <Goal onChoose={onChoose} />
                <Gender onChooseGender={onChooseGender} />
              </Stack>
              <div className="form-control form-control-check">
                <label>Metric</label>
                <Switch
                  checked={metric}
                  onChange={(e) => setMetric(e.currentTarget.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>

              {/* <div className="form-control form-control-check">
                <label>Prefer Not to Say</label>
                <Switch
                  checked={notSay}
                  onChange={(e) => setNotSay(e.currentTarget.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div> */}
            </form>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}