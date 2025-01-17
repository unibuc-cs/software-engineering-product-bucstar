import Grid from "@mui/material/Grid2";
import {Button, Typography, Snackbar, Alert, AlertColor} from "@mui/material";
import {EventHeaderModel} from "./EventHeaderModel";
import {Link, useParams} from "react-router-dom";
import { JoinEventDto, JoinEventService } from "../../joinEvent/JoinEventService";
import { FacebookLoginHelper } from "../../utils/facebookLoginHelper";
import { useState } from "react";

const EventHeader = (
    {model} : {model: EventHeaderModel},
) => {
    const currentPath = window.location.pathname; // Get the current path
    const editPath = `${currentPath}/edit`;
    const { id } = useParams();
    
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [snackbarMessage, setSnackbarMessage] = useState(''); 
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    const onJoinEvent = async () => {
        try {
            const service = new JoinEventService();
            let loginResponse = await FacebookLoginHelper.checkLoginStatus();
            let userId = loginResponse.userInfo?.id!
            const dto: JoinEventDto = { userId: userId, eventId: id! };
            const response = await service.joinEvent(dto);

            setSnackbarMessage(response.message || 'Joined event successfully'); 
            setSnackbarSeverity('success'); 
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage((error as Error).message || 'Error joining event'); 
            setSnackbarSeverity('error'); 
            setSnackbarOpen(true);
        }
    }

    const handleCloseSnackbar = () => { 
        setSnackbarOpen(false); 
    };
    
    return (
        <>
            <Grid size={12} container spacing={1} padding={4}
                style={{ backgroundColor: '#1976d2', color: 'white' }}>
                <Grid size={10}>
                    <Typography variant="h4" align="left">
                        {model.eventName}
                    </Typography>
                </Grid>
                {model.showEditButton && (
                    <Grid size={2}>
                        <Button variant={"outlined"} color={"inherit"}
                                component={Link} to={editPath}>
                            Edit
                        </Button>
                    </Grid>
                )}
                {!model.showEditButton && (
                    <Grid size={2}>
                        <Button variant={"outlined"} color={"inherit"}
                                onClick={onJoinEvent}>
                            Join Event
                        </Button>
                    </Grid>
                )}
                <Grid size={12}>
                    <Typography variant="h6" align="left">
                        Created by {model.organizerName}
                    </Typography>
                </Grid>
            </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}> 
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}> 
                {snackbarMessage} 
            </Alert> 
        </Snackbar>
        </>
    )
}
    
export default EventHeader;