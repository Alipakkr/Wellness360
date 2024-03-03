import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useState, useEffect } from "react";

const Selection = ({ image, onSelect, action }) => {
  const [selected, setSelected] = useState(false);
  const handleSelect = () => {
    setSelected((selected) => !selected);
    if (selected === false) {
      onSelect(action);
      console.log(action);
    } else {
      onSelect(action);
      console.log(action);
    }
  };
  useEffect(() => {
    // console.log(selected);
  });
  return (
    <Card
      sx={{
        maxWidth: 200,
        border: 0,
        borderRadius: 5,
        maxHeight: 200,
        // display: "block",
      }}
      onClick={() => handleSelect()}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={action} />
      </CardActionArea>
      {selected ? (
        <CardContent sx={{ backgroundColor: "green", cursor: "pointer" }}>
          <Typography gutterBottom variant="h5" component="div">
            {action}
          </Typography>
        </CardContent>
      ) : (
        <>
          <CardContent sx={{ backgroundColor: "white", cursor: "pointer" }}>
            <Typography gutterBottom variant="h5" component="div">
              {action}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Selection;
