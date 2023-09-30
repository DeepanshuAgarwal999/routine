import {
  Button,
  Card,
  TextField,
  Stack,
  Fab,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FieldArrayItem, FieldArray } from "houseform";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const Classcard = ({ index, remove, routine }) => {
  const formArrayRef = useRef(null);

  const [periodDay, setPeriodDay] = useState("Mon");

  useEffect(() => {
     formArrayRef.current.value? null: formArrayRef.current.add({
       day: periodDay,
       number: "",
       subject: "",
       teacher: "",
     });
  }, []);

  const addPeriods = () => {
    formArrayRef.current.add({
      day: periodDay,
      number: "",
      subject: "",
      teacher: "",
    });
  };

  return (
    <Card sx={{ p: 4, position: "relative", overflow: "visible" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <FieldArrayItem name={`routine[${index}].standard`}>
          {({ value, setValue }) => (
            <TextField
              placeholder="Enter Class name"
              size="small"
              value={value ? value : 1} // for default value
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </FieldArrayItem>
        <ToggleButtonGroup
          value={periodDay}
          onChange={(e, val) => val && setPeriodDay(val)}
          exclusive
        >
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <ToggleButton  value={day} key={day}>
              {day}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button variant="contained" color="inherit" onClick={addPeriods}>
          Add a period
        </Button>
      </Stack>
      <Fab
        disabled={index === 0}
        size="small"
        sx={{ position: "absolute", right: -10, top: -15 }}
        color="error"
        onClick={remove}
      >
        <CloseIcon />
      </Fab>
      <Paper sx={{ p: 2, bgcolor: "grey.900", mt: 2 }}>
        <FieldArray
          name={`routine[${index}].periods`}
          initialValue={routine.periods}
          ref={formArrayRef}
        >
          {({ value, remove }) => (
            <>
              {value?.map((period, i) =>
                period.day === periodDay ? (
                  <Stack
                    mt={2}
                    direction={"row"}
                    spacing={2}
                    justifyContent={"space-evenly"}
                  >
                    <FieldArrayItem
                      name={`routine[${index}].periods[${i}].day`}
                      key={`period-day-${i}`}
                    >
                      {({ value, setValue }) => (
                        <input
                          hidden
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                      )}
                    </FieldArrayItem>
                    <FieldArrayItem
                      name={`routine[${index}].periods[${i}].number`}
                      key={`periods-number-${i}`}
                    >
                      {({ value, setValue }) => (
                        <TextField
                          sx={{ flex: 1 }}
                          variant="outlined"
                          label="period number"
                          color="success"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          placeholder="Enter the period number"
                        />
                      )}
                    </FieldArrayItem>
                    <FieldArrayItem
                      name={`routine[${index}].periods[${i}].subject`}
                      key={`periods-subject-${i}`}
                    >
                      {({ value, setValue }) => (
                        <TextField
                          sx={{ flex: 1 }}
                          variant="outlined"
                          label="Subject"
                          color="warning"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          placeholder="Enter the Subject name"
                        />
                      )}
                    </FieldArrayItem>
                    <FieldArrayItem
                      name={`routine[${index}].periods[${i}].teacher`}
                      key={`periods-teacher-${i}`}
                    >
                      {({ value, setValue }) => (
                        <TextField
                          sx={{ flex: 1 }}
                          variant="outlined"
                          label="Teacher Name"
                          color="secondary"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          placeholder="Enter the Teacher Name"
                        />
                      )}
                    </FieldArrayItem>

                    <Button
                      variant="contained"
                      color="error"
                      disabled={i === 0}
                      onClick={(i) => remove(i)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Stack>
                ) : null
              )}
            </>
          )}
        </FieldArray>
      </Paper>
    </Card>
  );
};

export default Classcard;
