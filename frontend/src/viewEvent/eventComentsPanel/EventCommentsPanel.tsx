import Grid from "@mui/material/Grid2";
import {Icon, Typography, Button, TextField, Alert, AlertColor, Snackbar} from "@mui/material";
import {CommentRounded} from "@mui/icons-material";
import CommentRow from "../commentRow/CommentRow";
import {EventCommentsModel} from "./EventCommentsModel";
import {CommentModel} from "../commentRow/CommentModel";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CommentEventService, CommentDto} from "../../commentEvents/CommentEventService";
import { useAuth } from "../../utils/authProvider";

const EventCommentsPanel = (
    {model, userFacebookId, refreshEvent}: {model: EventCommentsModel; userFacebookId: string; refreshEvent: () => Promise<void>}
) => {

    const {id: eventId} = useParams(); // Get the event ID from the route
    const [text, setText] = useState<string>("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    const { accessToken } = useAuth();

    // Add Comment functionality
    const handleAddComment = async () => {
        if (!eventId || !userFacebookId) {
            console.error("Missing event ID or user ID");
            return;
        }

        try {
            // Create the comment
            const comment: CommentDto = {
                userId: userFacebookId,
                eventId,
                text,
            };

            const commentService = new CommentEventService();

            await commentService.createComment(comment, accessToken!);
            setSnackbarMessage("Comment added successfully!");
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Refetch event details after successful join
            await refreshEvent();

        } catch (error) {
            console.error("Error adding comment:", error);

            setSnackbarMessage((error as Error).message || 'Error adding comment');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }

        setText("");

    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);

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

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </Grid>
    )
}

export default EventCommentsPanel;