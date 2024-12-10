import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";

const ViewEventView = () => {
    const {id} = useParams();
    return (
        <Typography>
            {`View Event ${id}` }
        </Typography>
    )
}

export default ViewEventView;