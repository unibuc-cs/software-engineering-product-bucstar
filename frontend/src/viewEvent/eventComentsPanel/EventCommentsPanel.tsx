import Grid from "@mui/material/Grid2";
import {Icon, Typography} from "@mui/material";
import {AccountBoxRounded, CommentRounded} from "@mui/icons-material";
import CommentRow from "../commentRow/CommentRow";

const EventCommentsPanel = () => {
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
            <CommentRow/>
        </Grid>
    )
}

export default EventCommentsPanel;