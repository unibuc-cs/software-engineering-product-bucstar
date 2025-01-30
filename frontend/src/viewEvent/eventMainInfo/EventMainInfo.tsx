import Grid from "@mui/material/Grid2";
import EventInfoPanel from "../../components/eventInfoPanel/EventInfoPanel";
import TagList from "../../components/tagList/TagList";
import TagListModel from "../../components/tagList/TagListModel";
import {EventMainInfoModel} from "./EventMainInfoModel";

const EventMainInfo = (
    {model}: {model: EventMainInfoModel},
) => {
    return (
        <>
            <Grid container size={12} margin="auto" padding={4} spacing={2}>
                <Grid container size={12} spacing={1}>
                    <EventInfoPanel 
                        location={model.location} 
                        registeredParticipants={model.registeredParticipants} 
                        maximumParticipants={model.maximumParticipants} 
                        dateString={model.dateString}/>
                    <TagList model={new TagListModel(model.tagStrings)} />
                </Grid>
            </Grid>
        </>
    )
}

export default EventMainInfo;