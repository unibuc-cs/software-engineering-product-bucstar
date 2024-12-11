import Grid from "@mui/material/Grid2";
import {Icon, Typography} from "@mui/material";
import {AccountBoxRounded} from "@mui/icons-material";
import {CommentModel} from "./CommentModel";

const CommentRow = (
    {model}: {model: CommentModel},
) => {
    return (
        <Grid container size={12}>
            <Grid container size={3} spacing={2} >
                <Icon sx={{margin: '0px 0px 6px 0px', color: 'rgba(0, 0, 0, 0.5)'}}>
                    <AccountBoxRounded/>
                </Icon>
                <Typography variant="body1" align="left" marginTop={0.5}>
                    {model.username}
                </Typography>
            </Grid>
            <Grid size={9} marginTop={0.5}>
                <Typography variant="body2" align="left" margin={"auto 0"}>
                    {model.text}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CommentRow;