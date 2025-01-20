import Grid from "@mui/material/Grid2";
import {Icon, Typography, Button, TextField, Slider} from "@mui/material";
import {StarRounded} from "@mui/icons-material";
import ReviewRow from "../reviewRow/ReviewRow";
import {EventReviewsModel} from "./EventReviewsModel";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ReviewEventService, ReviewDto} from "../../reviewEvents/ReviewEventService";
import { useNavigate } from "react-router-dom";

const EventReviewsPanel = ({model, userFacebookId}: {model: EventReviewsModel; userFacebookId: string}) => {
    const navigate = useNavigate();
    const {id: eventId} = useParams(); // Get the event ID from the route
    const [userId, setUserId] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [score, setScore] = useState<number>(5);
    const reviewService = new ReviewEventService();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                if (userFacebookId) {
                    const service = new ReviewEventService();
                    const user = await service.getUserByFacebookId(userFacebookId);
                    setUserId(user.id);
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, [userFacebookId]);

    // Add Review functionality
    const handleAddReview = async () => {
        if (!eventId || !userId) {
            console.error("Missing event ID or user ID");
            return;
        }

        try {
            // Create or update the review
            const review: ReviewDto = {
                userId,
                eventId,
                text,
                score,
            };

            let existingReview = null;

            // Check if a review already exists for this user and event
            try {
                existingReview = await reviewService.getReviewByUserAndEvent(userId, eventId);
            } catch (error) {
                console.warn("Error checking for existing review (might not exist):", error);

            }

            if (existingReview) {
            // Delete the existing review before creating a new one
            try {
                await reviewService.deleteReview(userId, eventId);
            } catch (error) {
                console.error("Error deleting existing review:", error);
                alert("Failed to delete the existing review.");
                return;
            }
        }

            await reviewService.createOrUpdateReview(review);
            alert("Review added successfully!");
        } catch (error) {
            console.error("Error adding review:", error);
            alert("Failed to add review.");
        }

        //navigate(0);
        navigate("/events") // Redirect to the events page, might change later
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
                min={0}
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
        </Grid>
    );
};

export default EventReviewsPanel;
