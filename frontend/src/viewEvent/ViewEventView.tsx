import {Divider, Icon, Rating, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import EventInfoPanel from "../components/eventInfoPanel/EventInfoPanel";
import TagList from "../components/tagList/TagList";
import TagListModel from "../components/tagList/TagListModel";
import {AccountBoxRounded, CommentRounded, StarRounded} from "@mui/icons-material";

const ViewEventView = () => {
    const {id} = useParams();
    return (
        <>
            <Grid container marginX={"auto"} marginY={4} maxWidth="1000px"
                  sx={{ borderRadius: '32px', overflow: 'hidden', backgroundColor: '#EEEEFF'}}>
                <Grid size={12} container spacing={1} padding={4}
                      style={{ backgroundColor: '#1976d2', color: 'white' }}>
                    <Grid size={12}>
                        <Typography variant="h4" align="left">
                            Event Name {id}
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="h6" align="left">
                            Created by Organizer
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container size={12} margin="auto" padding={4} spacing={2}>
                    <Grid container size={12} spacing={1}>
                        <EventInfoPanel location="Bucharest" registeredParticipants={6} maximumParticipants={12} dateString="Monday"/>
                        <TagList model={new TagListModel(["tag1", "tag2"])} />
                    </Grid>
                    <Typography variant="body1" align="left">
                        Lorem Ipsum
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                <Divider orientation="horizontal" flexItem/>
                <Grid container size={12} spacing={2} padding={4} margin="auto">
                    <Grid size={12} marginBottom={2}>
                        <Typography variant="h5" align="left">
                            6 registered participants:
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="body1" align="left">
                            Participant 1
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="body1" align="left">
                            Participant 2
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="body1" align="left">
                            Participant 3
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="body1" align="left">
                            Participant 4
                        </Typography>
                    </Grid>
                </Grid>
                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                <Grid container size={12} spacing={2} padding={4} margin="auto">
                    <Grid container size={12} marginBottom={2}>
                        <Icon sx={{margin: '0px 0px 6px 0px'}}>
                            <StarRounded/>
                        </Icon>
                        <Typography variant="h5" align="left">
                            Reviews
                        </Typography>
                    </Grid>
                    <Grid container size={12} alignItems={"left"} spacing={0}>
                        <Grid container size={12} alignItems={"center"} spacing={2}>
                            <Icon sx={{margin: '0px 0px 6px 0px', color: 'rgba(0, 0, 0, 0.5)'}}>
                                <AccountBoxRounded/>
                            </Icon>
                            <Typography variant="body1" align="left" margin={"auto 0"}>
                                Account Nickname
                            </Typography>
                        </Grid>
                        <Grid container size={12} alignItems={"center"}>
                            <Rating
                                name="read-only"
                                value={4.5}
                                precision={0.5} 
                                readOnly 
                            />
                        </Grid>
                        <Grid size={12} marginTop={2}>
                            <Typography variant="body2" align="left" margin={"auto 0"}>
                                This is a review
                            </Typography>
                        </Grid>
                        
                        
                    </Grid>
                </Grid>

                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                
                <Grid container size={12} spacing={2} padding={4} margin="auto">
                    <Grid container size={12} marginBottom={2}>
                        <Icon sx={{margin: '0px 0px 6px 0px'}}>
                            <CommentRounded/>
                        </Icon>
                        <Typography variant="h5" align="left">
                            Comments
                        </Typography>
                    </Grid>
                    <Grid container size={3} spacing={2} >
                        <Icon sx={{margin: '0px 0px 6px 0px', color: 'rgba(0, 0, 0, 0.5)'}}>
                            <AccountBoxRounded/>
                        </Icon>
                        <Typography variant="body1" align="left" marginTop={0.5}>
                            Account Nickname
                        </Typography>
                    </Grid>
                    <Grid size={9} marginTop={0.5}>
                        <Typography variant="body2" align="left" margin={"auto 0"}>
                            This is a comment. This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.
                            This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.
                            This is a comment.This is a comment.This is a comment.This is a comment.

                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            
        </>
    )
}

export default ViewEventView;