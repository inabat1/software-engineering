import { PatientApi } from "../../client/backend-api/patient"
import { useUser } from "../../context/user-context"
import classes from "./styles.module.css"
import {useEffect, useState} from "react";
import { NotificationManager } from "react-notifications"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import {Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";

export const PatientsDetails = () => {
    const { patientId } = useParams()
    const navigate = useNavigate()
    const [patient, setPatient] = useState( null )        //set to null & remove mock data
    //     {
    //         "id": "201728560",
    //         "name": "Taylor Alison Swift",
    //         "birth": "13.12.89",
    //         "iin": "131289898989",
    //         "blood": "2",
    //         "emergency": "87777777777",
    //         "contact": "87777777777",
    //         "email": "tt.swift@gmail.com",
    //         "address": "Kabanbay batyr, 53",
    //         "marital": "not married",
    //         "registered_date": "31.10.22"
    //     }
    // )


    // !!! UNCOMMENT

    useEffect(() => {
        if (patientId) {
            PatientApi
                .getPatientById(patientId)
                .then((patient, error) => {
                    if (error) {
                        NotificationManager.error(error)
                    } else {
                        console.log(patient);
                        setPatient(patient)
                    }
                })
                .catch(console.error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientId])

    return (
        patient && (
            <div className={classes.wrapper}>
                <Typography variant="h5" align="center" style={{ marginBottom: 20 }}>
                    {patient.name}
                </Typography>
                <Card>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Patient ID
                                    </TableCell>
                                    <TableCell>{patient.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        IIN
                                    </TableCell>
                                    <TableCell>{patient.iinNum}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Birth date
                                    </TableCell>
                                    <TableCell>{patient.dateOfBirth}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Blood type
                                    </TableCell>
                                    <TableCell>{patient.bloodGroup}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Emergency number
                                    </TableCell>
                                    <TableCell>{patient.emerContactNum}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Contact number
                                    </TableCell>
                                    <TableCell>{patient.contactNum}</TableCell>
                                </TableRow>
                                {/* <TableRow>
                                    <TableCell variant="head" component="th">
                                        Emergency number
                                    </TableCell>
                                    <TableCell>{patient.emergency}</TableCell>
                                </TableRow> */}
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Email
                                    </TableCell>
                                    <TableCell>{patient.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Address
                                    </TableCell>
                                    <TableCell>{patient.address}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Marital status
                                    </TableCell>
                                    <TableCell>{patient.maritalSts}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head" component="th">
                                        Registered date
                                    </TableCell>
                                    <TableCell>{patient.created_at}</TableCell>
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
                                to={`/admin/patients/${patientId}/edit`}
                            >
                                Edit Patient
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