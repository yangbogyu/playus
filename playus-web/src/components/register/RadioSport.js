import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function FormControlLabelPlacement() {
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup row>
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === "축구"}
              onChange={handleChange}
              value="축구"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
          }
          label="축구"
        />
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === "농구"}
              onChange={handleChange}
              value="농구"
              name="radio-buttons"
              inputProps={{ "aria-label": "B" }}
            />
          }
          label="농구"
        />
      </RadioGroup>
    </FormControl>
  );
}
