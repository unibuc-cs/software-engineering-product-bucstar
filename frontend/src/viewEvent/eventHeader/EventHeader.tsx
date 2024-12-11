import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";

const EventHeader = () => {

    return (
        <Grid size={12} container spacing={1} padding={4}
              style={{ backgroundColor: '#1976d2', color: 'white' }}>
            <Grid size={12}>
                <Typography variant="h4" align="left">
                    Event Name
                </Typography>
            </Grid>
            <Grid size={12}>
                <Typography variant="h6" align="left">
                    Created by Organizer
                </Typography>
            </Grid>
        </Grid>
    )
}
    
export default EventHeader;