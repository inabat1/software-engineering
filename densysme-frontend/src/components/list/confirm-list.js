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
    const [appointments, setAppointment] = useState([])       //change to []
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
            console.log(appontmentId);
            ScheduleApi.confirmAppointment(appontmentId).then(({ success }) => {
                fetchDoctors().catch(console.error)
                setState(!state);
            })
        }
    }

    const conFunc = async (id) => {
        await ScheduleApi.confirmAppointment(id).then(()=>{
            fetchDoctors()
        })
    }

    const appT = (time) =>{
        let ans = ""

        if (time > 19) ans += "Fri, "
        else if (time > 14) ans += "Thu, "
        else if (time > 9) ans += "Wed, "
        else if (time > 4) ans += "Tue, "
        else ans += "Mon, "

        let y = time%5
        if (y === 0) ans += "9:00"
        else if (y === 1) ans += "10:00"
        else if (y === 2) ans += "11:00"
        else if (y === 3) ans += "12:00"
        else if (y === 4) ans += "13:00"

        return ans
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
                                            <TableCell align="right">{appointment.userName}</TableCell>
                                            <TableCell align="right">{appointment.userSurname}</TableCell>
                                            <TableCell align="right">{appointment.userIIN}</TableCell>
                                            <TableCell align="right">{appointment.doctorName}</TableCell>
                                            <TableCell align="right">{appT(appointment.appTime)}</TableCell>
                                            <TableCell>
                                                <div className={classes.actionsContainer}>
                                                   <Button 
                                                   variant="contained"
                                                     onClick={(e) => conFunc(appointment.id)}
                                                  >
                                                     Confirm
                                                   </Button>
                                                    {/* <Button  
                                                     style={{
                                                        color: state ? 'red' : '',
                                                      }}
                                                    variant="contained"
                                                      onClick={(e) => {toggle(appointment.id)}}
                                                     >
                                                         {state ? 'confirmed' :'confirm'}
                                                   </Button> */}
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
