import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import {
    LocalizationProvider,
    MobileDateTimePicker,
} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';
import Grid from "@mui/material/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ConfirmationNumberRounded, DescriptionRounded, LocationOnRounded } from "@mui/icons-material";
import { CreateEventModel } from "./CreateEventModel";

const CreateEventView = () => {
    const [model, setModel] = useState(new CreateEventModel());

    const setName = (name: string) => {
        setModel(prevModel => ({ ...prevModel, name }));
    }

    const setDescription = (description: string) => {
        setModel(prevModel => ({ ...prevModel, description }));
    }

    const setLocation = (location: string) => {
        setModel(prevModel => ({ ...prevModel, location }));
    }

    const setParticipantLimitEnable = (value: boolean) => {
        setModel(prevModel => ({ ...prevModel, participantLimitEnabled: value }));
    }

    const setParticipantLimit = (limit: number) => {
        setModel(prevModel => ({ ...prevModel, participantLimit: limit }));
    }
    
    const setDate = (date: Dayjs) => {
        setModel(prevModel => ({ ...prevModel, date: date.toDate() }));
    }

    const dateToShow = () => {
        if (model.date == null) {
            return dayjs(); // Current date and time
        }
        return dayjs(model.date); // Convert model.date to dayjs object
    }

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
            <Grid padding={4} size={12} style={{ backgroundColor: '#1976d2', color: 'white' }}>
                <Typography variant="h4" align="left">
                    New Event
                </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 12 }} padding={4} display="flex" flexDirection="column" gap={4}>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        variant="outlined"
                        label="Event name"
                        fullWidth
                        onChange={(event) => setName(event.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ConfirmationNumberRounded />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        variant="outlined"
                        label="Event description"
                        multiline
                        fullWidth
                        onChange={(event) => setDescription(event.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionRounded />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        variant="outlined"
                        label="Location"
                        fullWidth
                        onChange={(event) => setLocation(event.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOnRounded />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>

                <Grid size={12}>
                    <Divider orientation="horizontal" />
                </Grid>
                <Grid display="flex" justifyContent="left" alignItems="left">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker
                            defaultValue={
                                dateToShow()
                            }
                            disablePast={true}
                            sx={{ background: "transparent" }}
                            onAccept={(value) => { if(value != null) setDate(value)}}
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
                                    checked={model.participantLimitEnabled}
                                    onChange={(event) => setParticipantLimitEnable(event.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Enable participant limit"
                        />

                        {model.participantLimitEnabled && (
                            <TextField
                                label="Participant Limit"
                                variant="outlined"
                                type="number"
                                value={model.participantLimit}
                                onChange={(event) => {
                                    setParticipantLimit(Number.parseInt(event.target.value))
                                }}
                                fullWidth
                            />
                        )}
                    </Box>
                </Grid>
                <Button variant={"contained"} onClick={() => { console.log(model) }}>
                    <Typography variant="h6" component="div">
                        Create
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

export default CreateEventView;
