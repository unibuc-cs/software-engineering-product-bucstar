import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Icon,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import {
    CalendarIcon,
    DateTimePicker,
    LocalizationProvider,
    MobileDateTimePicker,
    StaticDateTimePicker
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Grid from "@mui/material/Grid2";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ConfirmationNumberRounded, DescriptionRounded, LocationOnRounded} from "@mui/icons-material";

const EventForm = () => {
    return (
        <Grid
            container
            marginX="auto"
            marginY={4}
            maxWidth="1000px"
            spacing={2}
            sx={{
                borderRadius: '32px',
                overflow: 'hidden',
                backgroundColor: '#EEEEFF',
            }}
        >
            {/* Header Section */}
            <Grid padding={4} size={12} style={{ backgroundColor: '#1976d2', color: 'white' }}>
                <Typography variant="h4" align="left">
                    New Event
                </Typography>
            </Grid>
            
            <Grid size={{xs:12, md:12}} padding={4} display="flex" flexDirection="column" gap={4}>
                <Box component="form" noValidate autoComplete="off">
                    
                    <TextField variant="outlined" label="Event name" fullWidth
                               slotProps={{
                                   input: {
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <ConfirmationNumberRounded />
                                           </InputAdornment>
                                       ),
                                   },
                               }}/>
                </Box>
                <Box component="form" noValidate autoComplete="off">
                    <TextField variant="outlined" label="Event description" multiline fullWidth
                               slotProps={{
                                   input: {
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <DescriptionRounded />
                                           </InputAdornment>
                                       ),
                                   },
                               }}/>
                </Box>
                <Box component="form" noValidate autoComplete="off">
                    <TextField variant="outlined" label="Location" fullWidth
                               slotProps={{
                                   input: {
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <LocationOnRounded />
                                           </InputAdornment>
                                       ),
                                   },
                               }}/>
                </Box>
                

                <Grid size={12}>
                    <Divider orientation="horizontal"/>
                </Grid>
                <Grid display="flex" justifyContent="left" alignItems="left"
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                            defaultValue={dayjs(Date.now())}
                            disablePast={true}
                            sx={{background: "transparent"}}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid container display="flex" justifyContent="left">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >

                        {/* Checkbox to enable participant limit input */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={true}
                                    onChange={() => {}}
                                    color="primary"
                                />
                            }
                            label="Enable participant limit"
                        />

                        {/* Conditionally enabled TextField for participant limit */}
                        {true && (
                            <TextField
                                label="Participant Limit"
                                variant="outlined"
                                type="number"
                                value={20}
                                onChange={() => {}}
                                fullWidth
                                inputProps={{
                                    min: 1,
                                }}
                            />
                        )}
                    </Box>
                </Grid>
                <Button variant={"contained"}>
                    <Typography variant="h6" component="div">
                        Create
                    </Typography>
                </Button>
            </Grid>


        </Grid>
    );
};

export default EventForm;
