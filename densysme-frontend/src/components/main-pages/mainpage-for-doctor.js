import React, {useEffect, useRef, useState} from "react";
import classes from "./styles.module.css";
import { Modal} from 'react-bootstrap';
import {
    Button, Card, CardActions, CardContent, Container, FormControl, FormGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, TextField,
    Typography
} from "@mui/material";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {TreatmentForm} from "../main-pages/treatment-form";
import {TreatmentApi} from "../../client/backend-api/treatment";
//import { TreatmentApi } from "../../client/backend-api/treatment";

export const MainPageForDoctors = () => {
    const {docId} = useParams()
    const [appointments, setAppointments] = useState([])       //change to []
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [activeApp, setActiveApp] = useState("")
    const [treat, setTreat] = useState("");
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()
    console.log(openModal)

    const handleChange = async(e) => {
        setTreat(e.target.value)
    }

    const updateTreat = async(id, treat) => {
        const response = await TreatmentApi.updateTreatment(id, treat)
        console.log(response)
    }


    const fetchPatients = async (docId) => {
        const appointments = await TreatmentApi.getAppsOfDoc(docId)
        setAppointments(appointments)
    }


    useEffect(() => {
        fetchPatients(docId).catch(console.error)
    }, [])

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [appointments])

    return(
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5">My patients</Typography>

            </div>
            {appointments.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Patient Name</TableCell>
                                        <TableCell align="right">Patient Surname</TableCell>
                                        <TableCell align="right">Patient IIN</TableCell>
                                        <TableCell> Treatment </TableCell>
                                        <TableCell> Edit treatment </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : appointments
                                    ).map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell align="right">{appointment.userName}</TableCell>
                                            <TableCell align="right">{appointment.userSurname}</TableCell>
                                            <TableCell align="right">{appointment.IINnum}</TableCell>
                                            <TableCell align="right">{appointment.treat}</TableCell>
                                            <TableCell>
                                                <div className={classes.actionsContainer}>
                                                <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                      onClick={
                                                          (e) => {
                                                              setActiveApp(appointment.id)
                                                              setTreat(appointment.treat)
                                                              handleShow()
                                                          }
                                                      }
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={appointments.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Edit Treatment
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TreatmentForm theappointment={appointments} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <Typography variant="h5" align="center">No appointment found!</Typography>
            )}
        </>
    )
}
