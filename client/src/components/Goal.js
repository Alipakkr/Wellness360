import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function Goal({ onChoose }) {
  const [goal, setGoal] = useState("");
  //   const [gender, setGender] = useState("");

  const handleGoal = (event) => {
    setGoal(event.target.value);
    onChoose(event.target.value);
  };

  return (
    <div className="dropdown">
      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="demo-simple-select-helper-label">Goal</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={goal}
          label="Goal"
          onChange={handleGoal}
          sx={{
            backgroundColor: "white",
            color: "black",
            textAlign: "center",
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"build muscle"}>Build Muscle</MenuItem>
          <MenuItem value={"lose fat"}>Lose Fat</MenuItem>
          <MenuItem value={"maintain"}>Maintain</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}