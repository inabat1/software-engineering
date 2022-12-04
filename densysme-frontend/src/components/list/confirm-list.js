import {useEffect, useState} from "react";
import classes from "./styles.module.css";
import {
    Button, Card, CardActions, CardContent, Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import { ScheduleApi } from "../../client/backend-api/schedule";

export const ConfirmList = () => {
    const [appointments, setAppointment] = useState([
        {
            "id": "909",
            "name": "Surg",
            "surname": "Wednesday",
            "useriin": "1300",
            "doctorname": "ervv",
            "doctorsurname": "ewfr",
            "apptime": "23",

        }
    ])       //change to []
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [state, setState] = useState(false)


    const fetchDoctors = async () => {
        // !! UNCOMMENT!!
        const appointments = await ScheduleApi.getAllAppointments()
        setAppointment(appointments)
    }

    const toggle=(appontmentId)=>{
        if (appointments.id) {
            ScheduleApi.confirmAppointment(appontmentId).then(({ success }) => {
                fetchDoctors().catch(console.error)
                setState(!state);
            })
        }
    }

    useEffect(() => {
        fetchDoctors().catch(console.error)
    }, [])



    return(
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5">Confirm Appointment</Typography>

            </div>
            {appointments.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User Name</TableCell>
                                        <TableCell align="right">User Surname</TableCell>
                                        <TableCell align="right">User IIN</TableCell>
                                        <TableCell align="right">Doctor Name</TableCell>
                                        <TableCell align="right">Doctor Surname</TableCell>
                                        <TableCell align="right">Appointment Time</TableCell>
                                        <TableCell> </TableCell>
                                        <TableCell> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : appointments
                                    ).map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell align="right">{appointment.name}</TableCell>
                                            <TableCell align="right">{appointment.surname}</TableCell>
                                            <TableCell align="right">{appointment.useriin}</TableCell>
                                            <TableCell align="right">{appointment.doctorname}</TableCell>
                                            <TableCell align="right">{appointment.doctorsurname}</TableCell>
                                            <TableCell align="right">{appointment.apptime}</TableCell>
                                            <TableCell>
                                                <div className={classes.actionsContainer}>
                                                   <Button 
                                                   variant="contained"
                                                     onClick={(e) => {ScheduleApi.rejectAppointment(appointment.id)}}
                                                     to={`/api/admin/appointment/${appointment.id}`}>
                                                     Reject
                                                   </Button>
                                                    <Button  
                                                     style={{
                                                        color: state ? 'red' : '',
                                                      }}
                                                    variant="contained"
                                                      onClick={(e) => {toggle(appointment.id)}}
                                                     >
                                                         {state ? 'confirmed' :'confirm'}
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
                </>
            ) : (
                <Typography variant="h5">No appointment found!</Typography>
            )}
        </>
    )
}
