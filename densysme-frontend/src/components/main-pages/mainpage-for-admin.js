import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {IconButton, Typography} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import CheckIcon from '@mui/icons-material/Check';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import {Link as RouterLink} from "react-router-dom"

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

export const MainPageForAdmin = () => {

    return (
        <div style={{ width: '90%', margin: '30px' }} >
            <Box
                sx={{
                    display: 'grid',
                    gridAutoFlow: 'row',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                }}
            >
                <Item>
                    <Typography>
                        Patients
                    </Typography>
                    <IconButton
                        aria-label="doctors"
                        component={RouterLink}
                        to={'patients'}>
                        <PeopleIcon/>
                    </IconButton>

                </Item>
                <Item>
                    <Typography>
                        Doctors
                    </Typography>
                    <IconButton
                        aria-label="doctors"
                        component={RouterLink}
                        to={'doctors'}
                    >
                        <MedicalServicesIcon/>
                    </IconButton>

                </Item>
                <Item>
                    <Typography>
                        Confirm appointment
                    </Typography>
                    <IconButton
                        aria-label="doctors"
                        component={RouterLink}
                        to={'confirmlist'}>
                        <CheckIcon/>
                    </IconButton>
                </Item>
                <Item>
                    <Typography>
                        Records
                    </Typography>
                    <IconButton
                        aria-label="doctors"
                        component={RouterLink}
                        to={'records'}>
                        <BookmarksIcon/>
                    </IconButton>
                </Item>
            </Box>
        </div>
    );
}
