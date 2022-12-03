import "./confirmation.css";
import FormInput from "./component/FormInput";
import { useState } from "react";


export const Confirmation = () => {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    phonenumber: "",
    timeslot: ""
  });


  const timeslot = {
    value: '12:00'
  }


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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeForTimeSlot = (e) => {
    timeslot.value = e.target.value
  }

  console.log(values);
  return (
      <div className="app">
        <form on Submit={handleSubmit}>
          <h1>Confirmation</h1>
          {inputs.map((input) => (
              <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
              />
          ))}
          <label>
            Pick available time slot:
            <select value={timeslot} onChange={onChangeForTimeSlot}>
              <option value="0">09:00</option>
              <option value="1">10:00</option>
              <option value="2">11:00</option>
              <option value="3">12:00</option>
              <option value="4">13:00</option>6
            </select>
          </label>
          <button> Confirm </button>
        </form>

      </div>
  );
}
