import { DoctorApi } from "../../client/backend-api/doctor"
import { useUser } from "../../context/user-context"
import classes from "./styles.module.css"
import {useEffect, useState} from "react";
import { NotificationManager } from "react-notifications"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import {Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {Image} from "@mui/icons-material";
import axios from "axios"

export const DoctorsDetails= () => {
    const { doctorId } = useParams()
    const navigate = useNavigate()
    const [doctor, setDoctor] = useState(null)         //set to null & remove mock data


    // !!! UNCOMMENT
    useEffect(() => {
        if (doctorId) {
            DoctorApi
                .getDoctorById(doctorId)
                .then(( doctor, error ) => {
                    if (error) {
                        NotificationManager.error(error)
                    } else {
                        setDoctor(doctor)
                    }
                })
                .catch(console.error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doctorId])

    return (
        doctor && (
            <div className={classes.wrapper}>
                <Typography variant="h5" align="center" style={{ marginBottom: 20 }}>
                    {doctor.name}
                </Typography>
                <Card>
                    <CardContent>
                        <div className={classes.imageContainer}>
                            <img
                                width="100%"
                                height="100%"
                                className={classes.imageContainer}
                                src={doctor.photo}/>
                        </div>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Patient ID
                                    </TableCell>
                                    <TableCell>{doctor.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        IIN
                                    </TableCell>
                                    <TableCell>{doctor.iinNum}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Birth date
                                    </TableCell>
                                    <TableCell>{doctor.dateOfBirth}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Experience
                                    </TableCell>
                                    <TableCell>{doctor.experience}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Department
                                    </TableCell>
                                    <TableCell>{doctor.department}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Specialization
                                    </TableCell>
                                    <TableCell>{doctor.specialization}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Category
                                    </TableCell>
                                    <TableCell>{doctor.category}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Contact number
                                    </TableCell>
                                    <TableCell>{doctor.contactNum}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Schedule
                                    </TableCell>
                                    <TableCell>{doctor.schedule}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Price
                                    </TableCell>
                                    <TableCell>${doctor.price}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Rating
                                    </TableCell>
                                    <TableCell>{doctor.rating}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Address
                                    </TableCell>
                                    <TableCell>{doctor.address}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                       Homepage
                                    </TableCell>
                                    <TableCell>{doctor.homepage}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardActions disableSpacing>
                        <div className={classes.btnContainer}>
                            <Button
                                variant="contained"
                                color="secondary"
                                component={RouterLink}
                                to={`/admin/doctors/${doctorId}/edit`}
                            >
                                Edit Doctor
                            </Button>
                            <Button type="submit" variant="text" color="primary" onClick={() => navigate(-1)}>
                                Go Back
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    )
}
