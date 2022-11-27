import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Card,
    CardContent,
    CardActions,
    Typography,
    TablePagination,
} from "@mui/material"
import classes from "./styles.module.css"
import { PatientApi } from "../../client/backend-api/patient"

export const PatientsList = () => {
    const [patients, setPatients] = useState([])    //change initialState to []
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [openModal, setOpenModal] = useState(false)
    const [activePatientId, setActivePatientId] = useState("")

    const fetchPatients = async () => {
        const patients = await PatientApi.getAllPatients()
        setPatients(patients)
        // console.log(patients)       //cut
    }

    const deletePatient = (patientId) => {
        PatientApi.deletePatient(patientId).then((success) => {
            fetchPatients().catch(console.error)
            setOpenModal(false)
            setActivePatientId("")
        })
        console.log("DELETE " + patientId);
    }

    useEffect(() => {
        fetchPatients().catch(console.error)
    }, [])

    return(
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5">Patients List</Typography>
                <Button variant="contained" color="primary" component={RouterLink} to="/admin/patients/add">
                    Add patient
                </Button>
            </div>
            {patients.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">IIN</TableCell>
                                        <TableCell align="right">Date of birth</TableCell>
                                        <TableCell align="right">Blood Group</TableCell>
                                        <TableCell align="right">Contact Number</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : patients
                                    ).map((patient) => (
                                        <TableRow key={patient.id}>
                                            <TableCell component="th" scope="row">
                                                {patient.name}
                                            </TableCell>
                                            <TableCell align="right">{patient.iinNum}</TableCell>
                                            <TableCell align="right">{patient.dateOfBirth}</TableCell>
                                            <TableCell align="right">{patient.bloodGroup}</TableCell>
                                            <TableCell align="right">{patient.contactNum}</TableCell>
                                            <TableCell>{patient.address}</TableCell>
                                            <TableCell>
                                                <div className={classes.actionsContainer}>
                                                    <Button
                                                        variant="contained"
                                                        component={RouterLink}
                                                        size="small"
                                                        to={`/admin/patients/${patient.id}`}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        component={RouterLink}
                                                        size="small"
                                                        to={`/admin/patients/${patient.id}/edit`}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={(e) => {
                                                            setActivePatientId(patient.id)
                                                            setOpenModal(true)
                                                        }}
                                                    >
                                                        Delete
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
                            count={patients.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                        <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
                            <Card className={classes.conf_modal}>
                                <CardContent>
                                    <h2>Are you sure?</h2>
                                </CardContent>
                                <CardActions className={classes.conf_modal_actions}>
                                    <Button variant="contained" onClick={() => setOpenModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={(e) => {
                                        deletePatient(activePatientId)
                                    }}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Modal>
                    </div>
                </>
            ) : (
                <Typography variant="h5">No patients found!</Typography>
            )}
        </>
    )
}