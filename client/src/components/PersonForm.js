import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Goal from "./Goal";
import Gender from "./Gender";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const PersonForm = ({ onAdd, newplan, onChoose, onChooseGender }) => {
  const [foot, setFoot] = useState(0);
  const [inches, setInches] = useState(0);
  const [weight, setWeight] = useState(0);
  const [metric, setMetric] = useState(false);
  const [notSay, setNotSay] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if ((foot === 0 || inches === 0 || weight === 0) && !notSay) {
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
    console.log(centimeters);
    onAdd({ centimeters, currentWeight, notSay });
  };
  const newPlan = () => {
    setFoot(0);
    setInches(0);
    setWeight(0);
    setMetric(false);
    setNotSay(false);
    newplan();
  };

  return (
    <>
      <Typography variant="h5">Personalize (Optional)</Typography>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          {metric ? <label>Meters</label> : <label>Foot</label>}
          {notSay ? (
            <input
              className="private"
              type="number"
              disabled={true}
              value={foot}
              onChange={(e) => setFoot(e.target.value)}
            />
          ) : (
            <input
              className="input-form"
              type="number"
              value={foot}
              onChange={(e) => setFoot(e.target.value)}
            />
          )}
        </div>
        <div className="form-control">
          {metric ? <label>Centimeters</label> : <label>Inches</label>}
          {notSay ? (
            <input
              className="private"
              type="number"
              disabled={true}
              value={inches}
              onChange={(e) => setInches(e.target.value)}
            />
          ) : (
            <input
              className="input-form"
              type="number"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
            />
          )}
        </div>
        <div className="form-control">
          {metric ? <label>Weight (KG) </label> : <label>Weight (LB)</label>}
          {notSay ? (
            <input
              className="private"
              type="number"
              disabled={true}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          ) : (
            <input
              className="input-form"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          )}
        </div>

        <div className="form-control form-control-check">
          <label>Metric</label>
          <Switch
            checked={metric}
            onChange={(e) => setMetric(e.currentTarget.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>

        <div className="form-control form-control-check">
          <label>Prefer Not to Say</label>
          <Switch
            checked={notSay}
            onChange={(e) => setNotSay(e.currentTarget.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        <Stack direction="row" position="relative" justifyContent="center">
          <Goal onChoose={onChoose} />
          <Gender onChooseGender={onChooseGender} />
        </Stack>
        <Stack
          display={"inline-block"}
          direction="row"
          spacing={2}
          bottom={0}
          left={0}
          right={0}
          position="relative"
        >
          <Button
            style={{ minWidth: 160 }}
            variant="contained"
            onClick={newPlan}
          >
            New Plan
          </Button>
          <Button
            style={{ minWidth: 160 }}
            variant="contained"
            onClick={onSubmit}
          >
            Generate Plan
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default PersonForm;
