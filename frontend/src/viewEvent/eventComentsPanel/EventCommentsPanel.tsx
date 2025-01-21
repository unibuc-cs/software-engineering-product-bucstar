import Grid from "@mui/material/Grid2";
import {Icon, Typography, Button, TextField} from "@mui/material";
import {CommentRounded} from "@mui/icons-material";
import CommentRow from "../commentRow/CommentRow";
import {EventCommentsModel} from "./EventCommentsModel";
import {CommentModel} from "../commentRow/CommentModel";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CommentEventService, CommentDto} from "../../commentEvents/CommentEventService";
import { useNavigate } from "react-router-dom";

const EventCommentsPanel = (
    {model, userFacebookId}: {model: EventCommentsModel; userFacebookId: string}
) => {
    const navigate = useNavigate();
    const {id: eventId} = useParams(); // Get the event ID from the route
    const [userId, setUserId] = useState<string>("");
    const [text, setText] = useState<string>("");
    const commentService = new CommentEventService();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                if (userFacebookId) {
                    const service = new CommentEventService();
                    const user = await service.getUserByFacebookId(userFacebookId);
                    setUserId(user.id);
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, [userFacebookId]);

    // Add Comment functionality
    const handleAddComment = async () => {
        if (!eventId || !userId) {
            console.error("Missing event ID or user ID");
            return;
        }

        try {
            // Create the comment
            const comment: CommentDto = {
                userId,
                eventId,
                text,
            };

            await commentService.createComment(comment);
            alert("Comment added successfully!");

        } catch (error) {
            console.error("Error adding comment:", error);
        }
        navigate("/events");
    };


    return (
        <Grid container size={12} spacing={2} padding={4} margin="auto">
            <Grid container size={12} marginBottom={2}>
                <Icon sx={{margin: '0px 0px 6px 0px'}}>
                    <CommentRounded/>
                </Icon>
                <Typography variant="h5" align="left">
                    Comments
                </Typography>
            </Grid>
            {model.comments.map((comment) => (
                <CommentRow model={CommentModel.fromComment(comment)}/>
            ))}

            <TextField
                sx={{marginTop: 2}}
                label="Add a comment"
                multiline
                rows={4}
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button
                sx={{marginTop: 2}}
                variant="outlined"
                color="inherit"
                onClick={handleAddComment}
            >
                Add Comment
            </Button>

        </Grid>
    )
}

export default EventCommentsPanel;