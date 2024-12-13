import Grid from "@mui/material/Grid2";
import {Icon, Rating, Typography} from "@mui/material";
import {AccountBoxRounded} from "@mui/icons-material";
import {ReviewModel} from "./ReviewModel";

const ReviewRow = (
    {model} : {model: ReviewModel }
) => {
    return (
        <Grid container size={12} alignItems={"left"} spacing={0}>
            <Grid container size={3}>
                <Grid container size={12} alignItems={"center"} spacing={2}>
                    <Icon sx={{margin: '0px 0px 6px 0px', color: 'rgba(0, 0, 0, 0.5)'}}>
                        <AccountBoxRounded/>
                    </Icon>
                    <Typography variant="body1" align="left" margin={"auto 0"}>
                        {model.reviewerName}
                    </Typography>
                </Grid>
                <Grid container size={12} alignItems={"center"}>
                    <Rating
                        name="read-only"
                        value={model.score / 2}
                        precision={0.5}
                        readOnly
                    />
                </Grid>
            </Grid>
           
            <Grid size={9} marginTop={1}>
                <Typography variant="body2" align="left" margin={"auto 0"}>
                    {model.text}
                </Typography>
            </Grid>


        </Grid>
    )
}

export default ReviewRow;