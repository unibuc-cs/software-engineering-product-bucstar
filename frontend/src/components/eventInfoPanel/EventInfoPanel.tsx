import Grid from "@mui/material/Grid2";
import {Icon, Typography} from "@mui/material";
import {EventNote, GroupAdd, LocationOn} from "@mui/icons-material";

const EventInfoPanel = (
    {
        location, 
        registeredParticipants, 
        maximumParticipants, 
        dateString
    }: {
        location: string,
        registeredParticipants: number,
        maximumParticipants: number,
        dateString: string
        }
) => {
    return (
        <Grid container spacing={2}>
            <Grid size={4} container>
                <Icon>
                    <LocationOn />
                </Icon>
                <Typography variant="body1">
                    {location}
                </Typography>
            </Grid>

            {maximumParticipants > 0 && (
                <Grid size={12} container>
                    <Icon>
                        <GroupAdd />
                    </Icon>
                    <Typography variant="body1">
                        {registeredParticipants + "/" + maximumParticipants + " participants"}
                    </Typography>
                </Grid>
            )}

            <Grid size={12} container>
                <Icon>
                    <EventNote />
                </Icon>
                <Typography variant="body1" >
                    {dateString}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default EventInfoPanel;