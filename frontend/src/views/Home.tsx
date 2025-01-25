import React from 'react';
import { Container, Typography, Card, CardContent, Box, Button, Grid, Link } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';

const Home = () => {
    return (
    <>
        <Container>
            <Card sx={{ p: 2, mb: 4 }}>
            <Box mb={4} textAlign="center">
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Welcome to VibeSync!
                </Typography>

            </Box>
            </Card>

            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <EventIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                                <Typography variant="h5">Event Management</Typography>
                            </Box>
                            <Typography variant="body2">
                                Create and manage events effortlessly with real-time updates and seamless participant tracking.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <GroupIcon fontSize="large" color="secondary" sx={{ mr: 2 }} />
                                <Typography variant="h5">Community Connections</Typography>
                            </Box>
                            <Typography variant="body2">
                                Connect with like-minded individuals and explore personalized event recommendations.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            <Grid item xs={12} sm={6}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <SecurityIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                                        <Typography variant="h5">Secure Platform</Typography>
                                    </Box>
                                    <Typography variant="body2">
                                        Your data is safe with us. Enjoy a secure and trustworthy environment for all your interactions.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        </Grid>

        </Container>

{/* Footer Section */}
<Box
    component="footer"
    py={1}
    textAlign="center"
    bgcolor="grey.200"
    sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        paddingTop: '32px',
        paddingBottom: '64px',
    }}
>
    <Typography variant="h6" gutterBottom>
        Contact us: <Link href="mailto:support@vibesync.com">support@vibesync.com</Link>
    </Typography>
    <Typography variant="body1">
        &copy; {new Date().getFullYear()} VibeSync. All rights reserved.
    </Typography>
</Box>
        </>

    );
};

export default Home;
