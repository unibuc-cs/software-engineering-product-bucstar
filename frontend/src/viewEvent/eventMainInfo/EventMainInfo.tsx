import Grid from "@mui/material/Grid2";
import EventInfoPanel from "../../components/eventInfoPanel/EventInfoPanel";
import TagList from "../../components/tagList/TagList";
import TagListModel from "../../components/tagList/TagListModel";
import {Typography} from "@mui/material";

const EventMainInfo = () => {
    return (
        <>
            <Grid container size={12} margin="auto" padding={4} spacing={2}>
                <Grid container size={12} spacing={1}>
                    <EventInfoPanel location="Bucharest" registeredParticipants={6} maximumParticipants={12} dateString="Monday"/>
                    <TagList model={new TagListModel(["tag1", "tag2"])} />
                </Grid>
            <Typography variant="body1" align="left">
                Lorem Ipsum
            </Typography>
            </Grid>
        </>
    )
}

export default EventMainInfo;