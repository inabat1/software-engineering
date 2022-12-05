import {useEffect, useRef, useState} from "react";
import classes from "./styles.module.css";
import PrintIcon from '@mui/icons-material/Print';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import ReactToPrint from "react-to-print";

export const MainPageForPatient = () => {
    let componentref = useRef()
    const [appointments, setAppointments] = useState([
        {   "ID":  "123",
            "UserName": "hasoos",
            "UserSurname": "jasn",
            "UserIIN": "456",
            "DoctorId " : "789",
            "DoctorName": "Tom",
            "DoctorSurname": "Alison",
            "Treat": "paracetomol",
        "Date": "12/12/22"}
    ])       //change to []
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const fetchHistory = async () => {
        // !! UNCOMMENT!!
        // const appointments = await DoctorApi.getAllDoctors()
        // setAppointments(appointments)
    }


    useEffect(() => {
        fetchHistory().catch(console.error)
    }, [])

    return(
        <>
            <div className={`${classes.pageHeader} ${classes.mb2} `}>
                <Typography variant="h5" > History</Typography>
                <ReactToPrint
                    trigger={()=>{
                        return <Button
                            size="small"
                            variant="outlined"
                            endIcon={<PrintIcon/>}>
                            Print
                        </Button>
                    }}
                    content={()=>
                        componentref
                    }
                    documentTitle="my history"
                    pageStyle="print"

                >

                </ReactToPrint>
            </div>
            {appointments.length > 0 ? (
                <>
                    <div ref={el=>(componentref = el)} className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="center">Doctor</TableCell>
                                        <TableCell align="center">Medication</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : appointments
                                    ).map((appointment) => (
                                        <TableRow key={appointment.ID}>
                                            <TableCell component="th" scope="row">
                                                {appointment.Date}
                                            </TableCell>
                                            <TableCell align="center">{appointment.DoctorName + appointment.DoctorSurname}</TableCell>
                                            <TableCell align="center">{appointment.Treat}</TableCell>
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
                <Typography variant="h5">No appointments found!</Typography>
            )}

        </>

    )
}