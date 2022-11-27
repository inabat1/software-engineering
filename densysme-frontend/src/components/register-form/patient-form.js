import React, { useState, useEffect } from "react"
import * as dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useParams, useNavigate } from "react-router-dom"
import {
    Paper,
    Container,
    Button,
    TextField,
    FormGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography, FormControlLabel, RadioGroup, FormLabel, Radio
} from "@mui/material"
import { PatientApi } from "../../client/backend-api/patient"
import classes from "./styles.module.css"

dayjs.extend(utc)

export const PatientForm = () => {
    const { patientId } = useParams()
    const navigate = useNavigate()
    const [patient, setPatient] = useState({
        name: "",
        id: patientId || "",
        iinNum: "",
        dateOfBirth: "",
        bloodGroup: "",
        emerContactNum: "",
        contactNum: "",
        email: "",
        address: "",
        maritalSts: "",
        registrationDate: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        id: "",
        iin: "",
        birth: "",
        blood: "",
        emergencyNum: "",
        contactNum: "",
        email: "",
        address: "",
        maritalStatus: "",
        registrationDate: "",
    })

    let isInvalid
    if ( !patientId ) isInvalid = patient.name === "" || patient.id === "" || patient.iinNum === ""

    const formSubmit = (event) => {
        event.preventDefault()
        if (!isInvalid) {
            if (patientId) {
                const newName = patient.name
                const newId = patient.id
                const newIin = patient.iinNum
                const newBirth = patient.dateOfBirth
                const newBlood = patient.bloodGroup
                const newEmergencyNum = patient.emerContactNum
                const newContactNum = patient.contactNum
                const newEmail = patient.email
                const newAddress = patient.address
                const newMaritalStatus = patient.maritalSts

                // !! UNCOMMENT!!

                PatientApi.editPatientById(patientId, {
                        ...patient
                    })
                    .then(() => navigate(`/admin/patients`))

            } else {
                // !! UNCOMMENT!!

                PatientApi.addPatient({
                        ...patient,
                    })
                    .then(() => navigate(`/admin/patients`))
            }
        }
    }

    const updatePatientField = (event) => {
        const field = event.target
        setPatient((patient) => ({ ...patient, [field.name]: field.value }))
    }

    const validateForm = (event) => {
        const { name, value } = event.target
        if (["name", "id", "iin", "email"].includes(name)) {
            setPatient((prevProd) => ({ ...prevProd, [name]: value.trim() }))
            if (!value.trim().length) {
                setErrors({ ...errors, [name]: `${name} can't be empty` })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
        if (["iin", "id", "emergencyNum", "contactNum"].includes(name)) {
            if (isNaN(Number(value))) {
                setErrors({ ...errors, [name]: "Only numbers are allowed" })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
    }


    useEffect(() => {
        if (patientId) {
            // !! UNCOMMENT
            PatientApi.getPatientById(patientId).then((patient, error) => {
                if (error) {
                    navigate(`/admin/patients`)
                } else {
                    setPatient(patient)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientId])

    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                    {patientId ? "Update Patient" : "Add Patient"}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={formSubmit}>
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Name, Middle name, Surname"
                                name="name"
                                required
                                value={patient.name}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                error={errors.name.length > 0}
                                helperText={errors.name}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="ID"
                                name="id"
                                required
                                value={patient.id}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                error={errors.id.length > 0}
                                helperText={errors.id}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="IIN"
                                name="iinNum"
                                required
                                value={patient.iinNum}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                error={errors.iin.length > 0}
                                helperText={errors.iin}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Birth date"
                                name="dateOfBirth"
                                required
                                value={patient.dateOfBirth}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                error={errors.birth.length > 0}
                                helperText={errors.birth}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Blood type"
                                name="bloodGroup"
                                required
                                value={patient.bloodGroup}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                helperText={errors.blood}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Emergency Number"
                                name="emerContactNum"
                                required
                                value={patient.emerContactNum}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                helperText={errors.emergencyNum}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Contact Number"
                                name="contactNum"
                                required
                                value={patient.contactNum}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                helperText={errors.contact}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Email"
                                name="email"
                                value={patient.email}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                helperText={errors.email}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Address"
                                name="address"
                                required
                                value={patient.address}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                helperText={errors.address}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Marital status"
                                name="maritalSts"
                                required
                                value={patient.maritalSts}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                helperText={errors.maritalStatus}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Registration date"
                                name="registrationDate"
                                required
                                value={patient.registrationDate}
                                onChange={updatePatientField}
                                onBlur={validateForm}
                                error={errors.registrationDate.length > 0}
                                helperText={errors.registrationDate}
                            />
                        </FormControl>


                    </FormGroup>
                    <div className={classes.btnContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                navigate(`/admin/patients`)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
                            {patientId ? "Update Patient" : "Add Patient"}
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}