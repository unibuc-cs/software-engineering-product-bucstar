import {Container, Typography} from "@mui/material";

const Tag = ({text}: {text: string}) => {
    return (
        <Container component="div" sx={{borderRadius: "20px", background: '#ddddff'}}>
            <Typography variant="body1" color="textSecondary" component="div">{text}</Typography>
        </Container>
    )
}

export default Tag;