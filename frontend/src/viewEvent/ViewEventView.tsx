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
import {ViewEventModel} from "./ViewEventModel";
import {EventReviewsModel} from "./eventReviewsPanel/EventReviewsModel";
import {EventCommentsModel} from "./eventComentsPanel/EventCommentsModel";
import {useEffect, useState, useCallback} from "react";
import {ViewEventService} from "./ViewEventService";
import { useAuth } from "../utils/authProvider";

const ViewEventView = () => {
    const { id } = useParams();
    const [model, setModel] = useState<ViewEventModel>(new ViewEventModel());
    const { accessToken, userFacebookId } = useAuth();

    const refreshEvent = useCallback(async () => { 
        const service = new ViewEventService(); 
        try {
            const refreshedModel = await service.getViewEventModel(id as string, accessToken!); 
            setModel(refreshedModel); 
        } catch (error) { 
            console.error("Error fetching event:", error); 
        } 
    }, [id, accessToken]);

    // Fetch event details
    useEffect(() => {
        refreshEvent();
    }, [id, refreshEvent]);

    if (accessToken === null || userFacebookId === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Grid container marginX={"auto"} marginY={4} maxWidth="1000px" sx={{ borderRadius: '32px', overflow: 'hidden', backgroundColor: '#EEEEFF' }}>
                <EventHeader model={EventHeaderModel.fromViewEventModel(model, model.organizerFacebookId === userFacebookId, userFacebookId!)} refreshEvent={refreshEvent} />

                <EventMainInfo model={EventMainInfoModel.fromViewEventModel(model)} />

                <Grid size={12}>
                    <Divider orientation="horizontal" />
                </Grid>

                <EventParticipantsPanel model={EventParticipantsModel.fromViewEventModel(model)} />

                <Grid size={12}>
                    <Divider orientation="horizontal" />
                </Grid>

                <EventReviewsPanel
                    model={EventReviewsModel.fromViewEventModel(model)}
                    userFacebookId={userFacebookId!}
                    refreshEvent={refreshEvent}
                />


                <Grid size={12}>
                    <Divider orientation="horizontal" />
                </Grid>

                <EventCommentsPanel model={EventCommentsModel.fromViewEventModel(model)}
                userFacebookId={userFacebookId!}
                refreshEvent={refreshEvent}
                />

            </Grid>
        </>
    );
}



export default ViewEventView;