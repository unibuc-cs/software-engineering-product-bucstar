import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import {EventParticipantsModel} from "./EventParticipantsModel";

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
                    { model.participants.map((participant, index) => (
                        <Grid size={12} key={/*participant.userFacebookId ||*/ /* Uncomment la linia asta cand edi si adi n o sa mai aiba acelasi facebookId*/ index}>
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