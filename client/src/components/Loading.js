import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

export default function Loading() {
  return (
    <div className="loading">
      <Stack
        sx={{ color: "grey.500", alignContent: "center" }}
        spacing={2}
        size="24rem"
        direction="column"
      >
        <CircularProgress size="10rem"  />
      </Stack>
    </div>
  );
}