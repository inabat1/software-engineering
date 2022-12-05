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
import { TreatmentApi } from "../../client/backend-api/treatment";

export const RecordsOfAllDocs = () => {
    let componentref = useRef()
    const [records, setRecords] = useState([])       //change to []
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const fetchHistory = async () => {
        // !! UNCOMMENT!!
        const records = await TreatmentApi.getAllMedRecords()
        setRecords(records)
    }


    useEffect(() => {
        fetchHistory().catch(console.error)
    }, [])

    return(
        <>
            <div className={`${classes.pageHeader} ${classes.mb2} `}>
                <Typography variant="h5" > Records</Typography>
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
            {records.length > 0 ? (
                <>
                    <div ref={el=>(componentref = el)} className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="center">Doctor</TableCell>
                                        <TableCell align="center">Patient</TableCell>
                                        <TableCell align="center">Medication</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : records
                                    ).map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell component="th" scope="row">
                                                {record.date}
                                            </TableCell>
                                            <TableCell align="center">{record.doctorName + ' ' + record.doctorSurname}</TableCell>
                                            <TableCell align="center">{record.userName + " " +  record.userSurname}</TableCell>
                                            <TableCell align="center">{record.treat}</TableCell>
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
                            count={records.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                    </div>
                </>
            ) : (
                <Typography variant="h5">No records found!</Typography>
            )}

        </>

    )
}