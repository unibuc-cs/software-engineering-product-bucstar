import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";

const EventParticipantsPanel = () => {
    return (
        <Grid container size={12} spacing={2} padding={4} margin="auto">
            <Grid size={12} marginBottom={2}>
                <Typography variant="h5" align="left">
                    6 registered participants:
                </Typography>
            </Grid>
            <Grid size={12}>
                <Typography variant="body1" align="left">
                    Participant 1
                </Typography>
            </Grid>
            <Grid size={12}>
                <Typography variant="body1" align="left">
                    Participant 2
                </Typography>
            </Grid>
            <Grid size={12}>
                <Typography variant="body1" align="left">
                    Participant 3
                </Typography>
            </Grid>
            <Grid size={12}>
                <Typography variant="body1" align="left">
                    Participant 4
                </Typography>
            </Grid>
        </Grid>
    )
}

export default EventParticipantsPanel;