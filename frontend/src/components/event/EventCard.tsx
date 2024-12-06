import {Card, CardContent, CardHeader, CssBaseline, Icon, Typography} from "@mui/material";
import { EventCardModel } from "./EventCardModel";
import { EventNote, GroupAdd, LocationOn } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';

const EventCard = ({ model }: { model: EventCardModel }) => {
    return (
        <Card>
            <CssBaseline />
            {/* Card Header with a different background color */}
            <CardHeader
                align="left"
                title={model.name}
                titleTypographyProps={{ sx: { fontSize: '32px', color: 'white' } }}  // Change font size for title
                subheader={`Created by: ${model.organizer}`}
                subheaderTypographyProps={{ sx: { fontSize: '18px', color: 'white' } }} // Change font size for subheader
                style={{ backgroundColor: '#1976d2', color: 'white' }} // background color stays the same
            />

            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={6} container>
                        <Icon>
                            <LocationOn />
                        </Icon>
                        <Typography variant="body1">
                            {model.location}
                        </Typography>
                    </Grid>

                    {model.maximumParticipants > 0 && (
                        <Grid size={12} container>
                            <Icon>
                                <GroupAdd />
                            </Icon>
                            <Typography variant="body1">
                                {model.registeredParticipants + "/" + model.maximumParticipants + " participants"}
                            </Typography>
                        </Grid>
                    )}

                    <Grid size={12} container>
                        <Icon>
                            <EventNote />
                        </Icon>
                        <Typography variant="body1" >
                            {model.date.toLocaleString("en-US")}
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="body1" align="left">
                            {model.description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EventCard;
