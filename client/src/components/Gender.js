import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function Gender({ onChooseGender }) {
  const [gender, setGender] = useState("");
  //   const [gender, setGender] = useState("");

  const handleGender = (event) => {
    setGender(event.target.value);
    onChooseGender(event.target.value);
  };

  return (
    <div className="dropdown">
      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={gender}
          label="Gender"
          onChange={handleGender}
          sx={{
            backgroundColor: "white",
            color: "black",
            textAlign: "center",
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"man"}>Male</MenuItem>
          <MenuItem value={"woman"}>Female</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}