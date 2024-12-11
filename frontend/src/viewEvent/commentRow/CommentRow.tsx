import Grid from "@mui/material/Grid2";
import {Icon, Typography} from "@mui/material";
import {AccountBoxRounded} from "@mui/icons-material";

const CommentRow = () => {
    return (
        <Grid container>
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
    )
}

export default CommentRow;