import {Divider} from "@mui/material";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import EventHeader from "./eventHeader/EventHeader";
import EventMainInfo from "./eventMainInfo/EventMainInfo";
import EventParticipantsPanel from "./eventParticipantsPanel/EventParticipantsPanel";
import EventReviewsPanel from "./eventReviewsPanel/EventReviewsPanel";
import EventCommentsPanel from "./eventComentsPanel/EventCommentsPanel";

const ViewEventView = () => {
    const {id} = useParams();
    return (
        <>
            <Grid container marginX={"auto"} marginY={4} maxWidth="1000px"
                  sx={{ borderRadius: '32px', overflow: 'hidden', backgroundColor: '#EEEEFF'}}>
                <EventHeader/>

                <EventMainInfo/>
                
                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                
                <EventParticipantsPanel/>
                
                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                
                <EventReviewsPanel/>

                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                
                <EventCommentsPanel/>
            </Grid>
            
        </>
    )
}

export default ViewEventView;