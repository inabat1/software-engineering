import "./confirmation.css";
import FormInput from "./component/FormInput";
import * as React from "react";
import {useEffect, useState} from "react";
import classes from "../list/styles.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {ScheduleApi} from "../../client/backend-api/schedule";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";


export const Confirmation = (effect, deps) => {
  const {doctorId, appointmentDay} = useParams()
  const navigate = useNavigate()

  const [timeslots, setTimeslots] = useState([]); //default value

  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    phonenumber: "",
    timeslot: ""
  });


  const [selectedSlot, setSelectedSlot] = useState('')


  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
          "Name should be 3-16 characters and shouldn't include any special character!",
      label: "Enter your name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "surname",
      type: "text",
      placeholder: "Surname",
      errorMessage:
          "Surname should be 3-16 characters and shouldn't include any special character!",
      label: "Enter your surname",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true
    },
    {
      id: 4,
      name: "phonenumber",
      type: "text",
      placeholder: "Phone number",
      errorMessage: "Enter only numbers",
      label: "Enter phone number",
      pattern: "^[0-9]+$",
      required: true
    }
  ];

  const fetchTimeslots = async (doctorId, appointmentDay) => {
    const timeslots = await ScheduleApi.getTimeSlotsOfDoc(doctorId, appointmentDay)
    setTimeslots(timeslots)
  }

  const addAnAppointment = async(email, doctorId, day, timeSlot) => {
    await ScheduleApi.addAnAppointment(email, doctorId, day, timeSlot)
  }

  useEffect(() => {
    fetchTimeslots(doctorId, appointmentDay).catch(console.error)
  }, [doctorId, appointmentDay])


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.email, doctorId, appointmentDay, selectedSlot)
    addAnAppointment(values.email, doctorId, appointmentDay, selectedSlot).then(r =>
        console.log(r)
    )
      navigate(`/admin/schedule`)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChange = (event) => {
    setSelectedSlot(event.target.value);
    values.timeslot = event.target.value
  };

  return (
      <div className="app">
        <form onSubmit={handleSubmit}>
          <h1>Confirmation</h1>
          {inputs.map((input) => (
              <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
              />
          ))}
          <label className={classes.actionsContainer}>
            Select a timeslot
            <FormControl fullWidth required={true}>
              <InputLabel id="demo-simple-select-label">Slot</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedSlot}
                  label="Slot"
                  onChange={handleChange}
              >
                {!timeslots[0] && (
                    <MenuItem value={'0'}>09:00</MenuItem>
                )}
                {!timeslots[1] && (
                    <MenuItem value={'1'}>10:00</MenuItem>
                )}
                {!timeslots[2] && (
                    <MenuItem value={'2'}>11:00</MenuItem>
                )}
                {!timeslots[3] && (
                    <MenuItem value={'3'}>12:00</MenuItem>
                )}
                {!timeslots[4] && (
                    <MenuItem value={'4'}>13:00</MenuItem>
                )}
              </Select>
            </FormControl>
          </label>
          <button> Confirm </button>
        </form>

      </div>
  );
}
