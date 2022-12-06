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
import { TreatmentApi }  from "../../client/backend-api/treatment";
import classes from "./styles.module.css"

dayjs.extend(utc)

export const TreatmentForm = ({theappointment}) => {
    const id= theappointment.id
    const navigate = useNavigate()
    const [treat, setTreat] = useState(theappointment.treat);

    const handleChange = async(e) => {
        const treat = e.target.value
        const response = await TreatmentApi.updateTreatment(id, treat).then(() => navigate(`doctor/mainpage`))
        console.log(response)
        setTreat(treat)
    }


    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                    Update Treatment
                </Typography>
                <form noValidate autoComplete="off">
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Treatment"
                                treat="treat"
                                required
                                value={treat}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </FormGroup>
                    <div className={classes.btnContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                navigate(`doctor/mainpage`)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}
