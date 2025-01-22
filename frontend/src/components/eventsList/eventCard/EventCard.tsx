import {Button, Card, CardContent, CardHeader, CssBaseline, Typography} from "@mui/material";
import { EventCardModel } from "./EventCardModel";
import Grid from '@mui/material/Grid2';
import {Link} from "react-router-dom";
import TagListModel from "../../tagList/TagListModel";
import EventInfoPanel from "../../eventInfoPanel/EventInfoPanel";
import TagList from "../../tagList/TagList";

const EventCard = ({ model }: { model: EventCardModel }) => {
    const tagListModel = new TagListModel(model.tags);
    
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
                    <Grid size={6}>
                        <EventInfoPanel
                            location={model.location}
                            registeredParticipants={model.registeredParticipants}
                            maximumParticipants={model.maximumParticipants}
                            dateString={model.date.toDateString()}
                        />
                    </Grid>

                    <TagList model={tagListModel} />
                    

                    <Grid size={12}>
                        <Typography variant="body1" align="left">
                            {model.description}
                        </Typography>
                    </Grid>
                    <Grid size={12} display="flex" justifyContent="right"> 
                        <Button 
                            component={Link} to={`/events/${model.id}`}
                            variant="contained"
                            sx={{ flexWrap: 'wrap', justifyContent: 'flex-end', ml: 'auto' }}
                        >
                            View Event
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EventCard;
