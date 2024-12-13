import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import {EventHeaderModel} from "./EventHeaderModel";

const EventHeader = (
    {model} : {model: EventHeaderModel},
) => {

    return (
        <Grid size={12} container spacing={1} padding={4}
              style={{ backgroundColor: '#1976d2', color: 'white' }}>
            <Grid size={12}>
                <Typography variant="h4" align="left">
                    {model.eventName}
                </Typography>
            </Grid>
            <Grid size={12}>
                <Typography variant="h6" align="left">
                    Created by {model.organizerName}
                </Typography>
            </Grid>
        </Grid>
    )
}
    
export default EventHeader;