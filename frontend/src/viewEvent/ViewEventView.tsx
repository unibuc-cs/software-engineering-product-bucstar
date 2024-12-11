import {Divider} from "@mui/material";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import EventHeader from "./eventHeader/EventHeader";
import EventMainInfo from "./eventMainInfo/EventMainInfo";
import EventParticipantsPanel from "./eventParticipantsPanel/EventParticipantsPanel";
import EventReviewsPanel from "./eventReviewsPanel/EventReviewsPanel";
import EventCommentsPanel from "./eventComentsPanel/EventCommentsPanel";
import {EventHeaderModel} from "./eventHeader/EventHeaderModel";
import {EventMainInfoModel} from "./eventMainInfo/EventMainInfoModel";
import {EventParticipantsModel} from "./eventParticipantsPanel/EventParticipantsModel";
import {Participant} from "./Participant";
import {Tag} from "./Tag";
import {ViewEventModel} from "./ViewEventModel";
import {Review} from "./Review";
import {EventReviewsModel} from "./eventReviewsPanel/EventReviewsModel";
import {Comment} from "./Comment";
import {EventCommentsModel} from "./eventComentsPanel/EventCommentsModel";

const ViewEventView = (
) => {
    const {id} = useParams();
    const model: ViewEventModel = new ViewEventModel(
        "event name",
        "organizer name",
        "Bucharest",
        new Date(Date.now()),
        12,
        [new Participant("participant 1"), new Participant("participant 2")],
        [new Tag("sports"), new Tag("outdoor")],
        [new Review("reviewer 1", 9, "review 1"), new Review("reviewer 2", 4, "review 2"),],
        [new Comment("username 1", "comment 1"), new Comment("username 2", "comment 2"),]
    
    )
    return (
        <>
            <Grid container marginX={"auto"} marginY={4} maxWidth="1000px"
                  sx={{ borderRadius: '32px', overflow: 'hidden', backgroundColor: '#EEEEFF'}}>
                <EventHeader model={EventHeaderModel.fromViewEventModel(model)}/>

                <EventMainInfo model={EventMainInfoModel.fromViewEventModel(model)}/>
                
                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                
                <EventParticipantsPanel model={EventParticipantsModel.fromViewEventModel(model)}/>
                
                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                
                <EventReviewsPanel model={EventReviewsModel.fromViewEventModel(model)}/>

                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                
                <EventCommentsPanel model={EventCommentsModel.fromViewEventModel(model)}/>
            </Grid>
            
        </>
    )
}

export default ViewEventView;