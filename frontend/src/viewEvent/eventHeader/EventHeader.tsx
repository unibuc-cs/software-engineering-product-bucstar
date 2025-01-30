import Grid from "@mui/material/Grid2";
import {Button, Typography, Snackbar, Alert, AlertColor} from "@mui/material";
import {EventHeaderModel} from "./EventHeaderModel";
import {Link, useParams} from "react-router-dom";
import { JoinEventDto, JoinEventService } from "../../joinEvent/JoinEventService";
import { useState } from "react";
import { UnjoinEventService } from "../../joinEvent/UnjoinEventService";
import { useNavigate } from "react-router-dom";
import { CancelEventService } from "../cancelEvent/CancelEventService";
import dayjs from "dayjs";
import { useAuth } from "../../utils/authProvider";

const EventHeader = (
    {model, refreshEvent} : {model: EventHeaderModel, refreshEvent: () => Promise<void>},
) => {
    const isActiveEvent = dayjs(model.date) > dayjs();
    const navigate = useNavigate();
    const currentPath = window.location.pathname; // Get the current path
    const editPath = `${currentPath}/edit`;
    const cancelPath = `/events`;
    const { id } = useParams();
    const { accessToken, userFacebookId } = useAuth();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    const handleCancel = async () => {
        try {
            if (!accessToken) {
                throw new Error('User not logged in');
            }
            const service = new CancelEventService();
            await service.cancelEvent(id!, accessToken!);
            navigate(cancelPath);
            } catch (error) {
                setSnackbarMessage((error as Error).message || 'Error canceling event');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
    };

    const onJoinEvent = async () => {
        try {
            if (!accessToken) {
                throw new Error('User not logged in');
            }
            const service = new JoinEventService();
            const dto: JoinEventDto = { userId: userFacebookId!, eventId: id! };
            const response = await service.joinEvent(dto, accessToken!);

            setSnackbarMessage(response.message || 'Joined event successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Refetch event details after successful join
            await refreshEvent();
        } catch (error) {
            setSnackbarMessage((error as Error).message || 'Error joining event');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }

    const onUnjoinEvent = async () => {
         try {
            if (!accessToken) {
                throw new Error('User not logged in');
            }
            const service = new UnjoinEventService();
            const dto: JoinEventDto = { userId: userFacebookId!, eventId: id! };
            const response = await service.unjoinEvent(dto, accessToken!);

            setSnackbarMessage(response.message || 'Unjoined event successfully');
            setSnackbarSeverity('success');
             setSnackbarOpen(true);

            // Refetch event details after successful unjoin
            await refreshEvent();
        } catch (error) {
            setSnackbarMessage((error as Error).message || 'Error unjoining event');
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
                {isActiveEvent && model.showEditButton && (
                    <Grid size={2}>
                        <Button variant={"outlined"} color={"inherit"} sx={{ marginRight: 1, marginLeft: -1 }}
                                component={Link} to={editPath}>
                            Edit
                        </Button>
                        <Button variant={"outlined"} color={"error"} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Grid>
                )}
                {isActiveEvent && !model.showEditButton && !model.isParticipating && (
                    <Grid size={2}>
                        <Button variant={"outlined"} color={"inherit"}
                                onClick={onJoinEvent}>
                            Join Event
                        </Button>
                    </Grid>
                )}
                {isActiveEvent && model.isParticipating && (
                    <Grid size={2}>
                        <Button variant={"outlined"} color={"inherit"}
                                onClick={onUnjoinEvent}>
                            Unjoin Event
                        </Button>
                    </Grid>
                )}
                <Grid size={12}>
                    <Typography variant="h6" align="left">
                        Created by {model.organizerName}
                    </Typography>
                </Grid>
            </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
        </>
    )
}

export default EventHeader;