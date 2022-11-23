import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material"
import { useUser } from "../../context/user-context"
import { Route, Routes, Navigate, Link } from "react-router-dom"
import AdbIcon from "@mui/icons-material/Adb"
import {PatientsList} from "../list/patients-list";
import {DoctorsList} from "../list/doctors-list";
import {LoginDialog} from "../login/login-dialog";
import {WithLoginProtector} from "../access-control/login-protector"
import {PatientForm} from "../register-form/patient-form"
import {MainPage} from "../../main_page";
import {DoctorForm} from "../register-form/doctor-form";
import {PatientsDetails} from "../details/patients_details";
import {DoctorsDetails} from "../details/doctors_details";

export  const AppLayout = () => {
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const { user, loginUser, logoutUser} = useUser()
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
        navigate("/")
    }

    const handleLoginSubmit = (username, password) => {
        loginUser(username, password)
        setOpenLoginDialog(false)
    }

    const handleLoginClose = () => {
        setOpenLoginDialog(false)
    }

    const handleLogout = () => {
        logoutUser()
       // handleCloseUserMenu()
    }

    useEffect(() => {
        navigate('/')
    }, [user])

    return(
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: "flex", mr: 1 }} />
                        <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: "flex",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "white",
                                }}
                            >
                                DenSys.me
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 0,
                            }}
                        >

                            {user ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar> {"T"} </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setOpenLoginDialog(true)
                                    }}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
                <Route path="/" exact element={<MainPage/>}/>
                <Route path="admin/patients" element={
                    <WithLoginProtector>
                        <PatientsList/>
                    </WithLoginProtector>}
                       exact/>
                <Route path="admin/doctors" element={
                    <WithLoginProtector>
                        <DoctorsList/>
                    </WithLoginProtector>}
                       exact
                />
                <Route
                    path="/admin/patients/:patientId"
                    element={<PatientsDetails />}
                />
                <Route
                    path="/admin/doctors/:doctorId"
                    element={<DoctorsDetails />}
                />
                <Route
                    path="/admin/patients/add"
                    exact element={<PatientForm/>}
                />
                <Route
                    path="/admin/doctors/add"
                    exact element={<DoctorForm/>}
                />
                <Route
                    path="/admin/patients/:patientId/edit"
                    element={<PatientForm />}
                />
                <Route
                    path="/admin/doctors/:doctorId/edit"
                    element={<DoctorForm />}
                />
            </Routes>
            <LoginDialog
                open={openLoginDialog}
                handleSubmit={handleLoginSubmit}
                handleClose={handleLoginClose}
            />
        </>
    )
}