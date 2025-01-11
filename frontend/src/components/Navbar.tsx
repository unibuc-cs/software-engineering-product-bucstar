import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemButton, ListItemText, CssBaseline, Drawer, Snackbar, Alert
} from '@mui/material';
import {Outlet} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {FacebookLoginHelper, LoginResponse} from "../utils/facebookLoginHelper";

const drawerWidth = 240;
const navItems = ["Home", "Placeholder01", "Placeholder02"];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const handleLoginClick = async () => {
        try {
            let loginResponse: LoginResponse = await FacebookLoginHelper.checkLoginStatus(); // Check login status when modal opens

            if (loginResponse.status === "connected") {
                setSnackbarMessage("Login successful!");
                setOpenSnackbar(true);  // Show Snackbar
            } else {
                setSnackbarMessage("Login failed. Please try again.");
                setOpenSnackbar(true);  // Show Snackbar
            }
        } catch (error) {
            console.log(`Error during login: ${error}`);
            setSnackbarMessage("An error occurred. Please try again later.");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close Snackbar when the user dismisses it
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                VibeSync
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', mb: 10 }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: {xs: 'none', sm: 'flex'}, justifyContent: 'flex-start', flexGrow: 1 }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>

                    <Button color="inherit" onClick={handleLoginClick}>Login</Button>
                </Toolbar>
            </AppBar>

            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Auto-hide after 6 seconds
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Outlet/>
        </Box>
    )
};

export default Navbar;
