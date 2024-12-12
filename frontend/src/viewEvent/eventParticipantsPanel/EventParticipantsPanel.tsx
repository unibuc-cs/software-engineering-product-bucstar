import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import {EventParticipantsModel} from "./EventParticipantsModel";
import {useEffect} from "react";

const EventParticipantsPanel = (
    {model} : {model: EventParticipantsModel}
) => {
    return (
        <>
            { model.participants.length > 0 && (
                <Grid container size={12} spacing={2} padding={4} margin="auto">
                    <Grid size={12} marginBottom={2}>
                        <Typography variant="h5" align="left">
                            {model.participants.length} registered participants:
                        </Typography>
                    </Grid>
                    { model.participants.map(participant => (
                        <Grid size={12}>
                            <Typography variant="body1" align="left">
                                {participant.username}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>)
            }
        </>
    )
}

export default EventParticipantsPanel;