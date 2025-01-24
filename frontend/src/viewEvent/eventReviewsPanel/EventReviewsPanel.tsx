import Grid from "@mui/material/Grid2";
import {Icon, Typography, Button, TextField, Slider, AlertColor, Alert, Snackbar} from "@mui/material";
import {StarRounded} from "@mui/icons-material";
import ReviewRow from "../reviewRow/ReviewRow";
import {EventReviewsModel} from "./EventReviewsModel";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ReviewEventService, ReviewDto} from "../../reviewEvents/ReviewEventService";
import { useAuth } from "../../utils/authProvider";

const EventReviewsPanel = ({model, userFacebookId, refreshEvent}: {model: EventReviewsModel; userFacebookId: string; refreshEvent: () => Promise<void>}) => {

    const {id: eventId} = useParams(); // Get the event ID from the route
    const [text, setText] = useState<string>("");
    const [score, setScore] = useState<number>(5);
    const reviewService = new ReviewEventService();

    const { accessToken } = useAuth();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    // Add Review functionality
    const handleAddReview = async () => {
        if (!eventId || !userFacebookId) {
            console.error("Missing event ID or user ID");
            return;
        }

        try {
            // Create or update the review
            const review: ReviewDto = {
                userId: userFacebookId,
                eventId,
                text,
                score,
            };

            let existingReview = null;

            // Check if a review already exists for this user and event
            try {
                existingReview = await reviewService.getReviewByUserAndEvent(eventId, accessToken!);
            } catch (error) {
                console.warn("Error checking for existing review (might not exist):", error);
            }

            if (existingReview) {
            // Delete the existing review before creating a new one
            try {
                await reviewService.deleteReview(eventId, accessToken!);
            } catch (error) {
                console.error("Error deleting existing review:", error);

                setSnackbarMessage((error as Error).message || 'Error adding review');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);

                return;
            }
        }

            await reviewService.createOrUpdateReview(review, accessToken!);

            setSnackbarMessage("Review added successfully!");
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Refetch event details after successful join
            await refreshEvent();

        } catch (error) {
            console.error("Error adding review:", error);

            setSnackbarMessage((error as Error).message || 'Failed adding review');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }

        setText("");
        setScore(5);

    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);

    };

    return (
        <Grid container size={12} spacing={2} padding={4} margin="auto">
            <Grid container size={12} marginBottom={2}>
                <Icon sx={{margin: '0px 0px 6px 0px'}}>
                    <StarRounded />
                </Icon>
                <Typography variant="h5" align="left">
                    Reviews
                </Typography>
            </Grid>
            {model.reviews.map(review => (
                <ReviewRow model={review} key={review.reviewerName} />
            ))}
            <TextField
                sx={{marginTop: 2}}
                fullWidth
                label="Write your review"
                multiline
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Typography variant="body1" gutterBottom>
                Score:
            </Typography>
            <Slider
                defaultValue={5}
                step={1}
                marks
                min={1}
                max={10}
                value={score}
                onChange={(e, value) => setScore(value as number)}
            />
            <Button
                variant={"outlined"}
                color={"inherit"}
                sx={{marginTop: 2}}
                onClick={handleAddReview}
            >
                Add Review
            </Button>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </Grid>
    );
};

export default EventReviewsPanel;
