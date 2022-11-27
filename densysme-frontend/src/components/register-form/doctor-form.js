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
    Typography, FormControlLabel, RadioGroup, FormLabel, Radio, Checkbox, Box
} from "@mui/material"
import { DoctorApi } from "../../client/backend-api/doctor"
import classes from "./styles.module.css"

dayjs.extend(utc)

export const DoctorForm = () => {
    const { doctorId } = useParams()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState({
        name: "",
        id: doctorId || "",
        iinNum: "",
        dateOfBirth: "",
        experience: "",
        department: "",
        contactNum: "",
        specialization: "",
        photo: "",
        category: "",
        schedule: "",
        price: "",
        degree: "",
        rating: "",
        address: "",
        homepage: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        id: doctorId || "",
        iinNum: "",
        dateOfBirth: "",
        experience: "",
        department: "",
        contactNum: "",
        specialization: "",
        photo: "",
        category: "",
        schedule: "",
        price: "",
        degree: "",
        rating: "",
        address: "",
        homepage: "",
    })


    let isInvalid;
    if (!doctorId)  isInvalid = doctor.name.trim() === "" || doctor.id.trim() === "" || doctor.iinNum.trim() === ""

    const formSubmit = (event) => {
        event.preventDefault()
        if (!isInvalid) {
            if (doctorId) {
                const newName = doctor.name
                const newId = doctor.id
                const newIin = doctor.iinNum
                const newBirth = doctor.dateOfBirth
                const newExperience = doctor.experience
                const newDepartment = doctor.department
                const newContactNum = doctor.contactNum
                const newSpecialization = doctor.specialization
                const newPhoto = doctor.photo
                const newCategory = doctor.category
                const newSchedule = doctor.schedule
                const newPrice = doctor.price
                const newDegree = doctor.degree
                const newRating = doctor.rating
                const newAddress = doctor.address
                const newHomepage = doctor.homepage


                // !! UNCOMMENT!!

                DoctorApi.editDoctorById(doctorId, {
                        ...doctor
                    })
                    .then(() => navigate(`/admin/doctors`))

            } else {
                // !! UNCOMMENT!!

                DoctorApi.addDoctor({
                        ...doctor,
                    })
                    .then(() => navigate(`/admin/doctors`))
            }
        }
    }

    const updateDoctorField = (event) => {
        const field = event.target
        setDoctor((doctor) => ({ ...doctor, [field.name]: field.value }))
    }

    const validateForm = (event) => {
        const { name, value } = event.target
        if (["name", "id", "iinNum"].includes(name)) {
            setDoctor((prevProd) => ({ ...prevProd, [name]: value.trim() }))
            if (!value.trim().length) {
                setErrors({ ...errors, [name]: `${name} can't be empty` })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
        if (["iinNum", "id", "contactNum", "experience", "price", "rating"].includes(name)) {
            if (isNaN(Number(value))) {
                setErrors({ ...errors, [name]: "Only numbers are allowed" })
            } else {
                setErrors({ ...errors, [name]: "" })
            }
        }
    }

    useEffect(() => {
        if (doctorId) {
            // !! UNCOMMENT
            DoctorApi.getDoctorById(doctorId).then((doctor, error ) => {
                if (error) {
                    navigate(`/admin/doctors`)
                } else {
                    setDoctor(doctor)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doctorId])

    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                    {doctorId ? "Update Doctor" : "Add Doctor"}
                </Typography>
                <form noValidate autoComplete="off" onSubmit={formSubmit}>
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Name, Middle name, Surname"
                                name="name"
                                required
                                value={doctor.name}
                                onChange={updateDoctorField}
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
                                value={doctor.id}
                                onChange={updateDoctorField}
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
                                value={doctor.iinNum}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                error={errors.iinNum.length > 0}
                                helperText={errors.iinNum}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Birth date"
                                name="dateOfBirth"
                                required
                                value={doctor.dateOfBirth}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                error={errors.dateOfBirth.length > 0}
                                helperText={errors.dateOfBirth}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Photo url"
                                name="photo"
                                required
                                value={doctor.photo}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.photo}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Experience"
                                name="experience"
                                required
                                value={doctor.experience}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.experience}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Department"
                                name="department"
                                required
                                value={doctor.department}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.department}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Contact Number"
                                name="contactNum"
                                required
                                value={doctor.contactNum}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.contactNum}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Specialization"
                                name="specialization"
                                required
                                value={doctor.specialization}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.specialization}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Category"
                                name="category"
                                required
                                value={doctor.category}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.category}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Schedule"
                                name="schedule"
                                required
                                value={doctor.schedule}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.schedule}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                type="number"
                                label="Price"
                                name="price"
                                required
                                value={doctor.price}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.price}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Degree"
                                name="degree"
                                required
                                value={doctor.degree}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.degree}
                            />
                        </FormControl>
                        <FormControl className={classes.mb3}>
                            <TextField
                                label="Rating"
                                name="rating"
                                type="number"
                                required
                                value={doctor.rating}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.rating}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Address"
                                name="address"
                                required
                                value={doctor.address}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.address}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Homepage url"
                                name="homepage"
                                required
                                value={doctor.homepage}
                                onChange={updateDoctorField}
                                onBlur={validateForm}
                                helperText={errors.homepage}
                            />
                        </FormControl>

                    </FormGroup>
                    <div className={classes.btnContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                navigate(`/admin/doctors`)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
                            {doctorId ? "Update Doctor" : "Add Doctor"}
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}