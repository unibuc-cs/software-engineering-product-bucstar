import Grid from "@mui/material/Grid2";
import {Button, Typography} from "@mui/material";
import {EventHeaderModel} from "./EventHeaderModel";
import {useState} from "react";
import {Link} from "react-router-dom";

const EventHeader = (
    {model} : {model: EventHeaderModel},
) => {
    const currentPath = window.location.pathname; // Get the current path
    const editPath = `${currentPath}/edit`;
    
    return (
        <Grid size={12} container spacing={1} padding={4}
              style={{ backgroundColor: '#1976d2', color: 'white' }}>
            <Grid size={10}>
                <Typography variant="h4" align="left">
                    {model.eventName}
                </Typography>
            </Grid>
            {model.showEditButton && (
                <Grid size={2}>
                    <Button variant={"outlined"} color={"inherit"}
                            component={Link} to={editPath}>
                        Edit
                    </Button>
                </Grid>
            )}
            <Grid size={12}>
                <Typography variant="h6" align="left">
                    Created by {model.organizerName}
                </Typography>
            </Grid>
        </Grid>
    )
}
    
export default EventHeader;