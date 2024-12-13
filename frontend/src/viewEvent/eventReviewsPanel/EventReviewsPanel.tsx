import Grid from "@mui/material/Grid2";
import {Icon, Typography} from "@mui/material";
import {StarRounded} from "@mui/icons-material";
import ReviewRow from "../reviewRow/ReviewRow";
import {EventReviewsModel} from "./EventReviewsModel";

const EventReviewsPanel = (
    {model} : {model: EventReviewsModel},
) => {
    return (
        <Grid container size={12} spacing={2} padding={4} margin="auto">
            <Grid container size={12} marginBottom={2}>
                <Icon sx={{margin: '0px 0px 6px 0px'}}>
                    <StarRounded/>
                </Icon>
                <Typography variant="h5" align="left">
                    Reviews
                </Typography>
            </Grid>
            {model.reviews.map(review => (
                <ReviewRow model={review}/>
            ))}
        </Grid>
    )
}

export default EventReviewsPanel;