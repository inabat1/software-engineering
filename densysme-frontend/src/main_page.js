import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {IconButton, Typography} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import {Link as RouterLink, useNavigate} from "react-router-dom"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button, Navbar, Container, Nav, Carousel } from 'react-bootstrap'
import './mainpage.css';
import 'bootstrap/dist/css/bootstrap.min.css'

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

export const MainPage = () => {
    const navigate = useNavigate()
    function makeAppointment() {
        navigate('admin/schedule')
    }

    return (
        <>
            <main>
                <section id="home">
                    <Carousel>
                        <Carousel.Item >
                            <img
                                className="d-block w-100 h-70"
                                src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                DenSys.Me

                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 h-70"
                                src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9jdG9yc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                DenSys.Me

                            </Carousel.Caption>
                        </Carousel.Item>

                    </Carousel>
                </section>

                <section id="about">
                    <div class="container-fluid bg-light text-dark p-5">
                        <div class="container bg-light p-5">
                            <h1 class="display-4 fw-bold">About Us</h1>

                            <p> A team of enthusiastic doctors, making healthcare accessible for everyone. </p>
                            <p>
                                Our mission is to offer a more convenient way to find and access healthcare online. We make it easy to find a doctor, book an appointment, and see a doctor sooner
                            </p>
                            <Button
                                variant="outline-primary"
                                onClick={makeAppointment}
                            >Make an Appointment</Button>{' '}
                        </div>
                    </div>
                </section>



            </main>

            <footer>
                <Container>
                    <p className='text-center'>Healthcare for everyone 2022</p>

                </Container>

            </footer>

        </>
    );
}
