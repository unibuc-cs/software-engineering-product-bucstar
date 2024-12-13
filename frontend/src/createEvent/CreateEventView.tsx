import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    InputAdornment,
    TextField,
    Typography,
    FormControl,
    FormHelperText
} from '@mui/material';
import {
    LocalizationProvider,
    MobileDateTimePicker,
} from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import Grid from "@mui/material/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ConfirmationNumberRounded, DescriptionRounded, LocationOnRounded } from "@mui/icons-material";
import { CreateEventModel } from "./CreateEventModel";
import {CreateEventDto, CreateEventService} from "./CreateEventService";
import {FacebookLoginHelper} from "../utils/facebookLoginHelper";

const CreateEventView = () => {
    const [model, setModel] = useState(new CreateEventModel());
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        location: '',
        date: '',
        limit: ''
    });

    const setName = (name: string) => {
        setModel(prevModel => ({ ...prevModel, name }));
        setErrors(prevErrors => ({ ...prevErrors, name: '' }));
    }

    const setDescription = (description: string) => {
        setModel(prevModel => ({ ...prevModel, description }));
        setErrors(prevErrors => ({ ...prevErrors, description: '' }));
    }

    const setLocation = (location: string) => {
        setModel(prevModel => ({ ...prevModel, location }));
        setErrors(prevErrors => ({ ...prevErrors, location: '' }));
    }

    const setParticipantLimitEnable = (value: boolean) => {
        setModel(prevModel => ({ ...prevModel, participantLimitEnabled: value }));
        setErrors(prevErrors => ({ ...prevErrors, limit: '' }));
    }

    const setParticipantLimit = (limit: number) => {
        setModel(prevModel => ({ ...prevModel, participantLimit: limit }));
        setErrors(prevErrors => ({ ...prevErrors, limit: '' }));
    }

    const setDate = (date: Dayjs) => {
        setModel(prevModel => ({ ...prevModel, date: date.toDate() }));
        setErrors(prevErrors => ({ ...prevErrors, date: '' }));
    }

    const dateToShow = () => {
        if (model.date == null) {
            return dayjs();
        }
        return dayjs(model.date);
    }

    const validateForm = () => {
        const newErrors = {
            name: model.name ? '' : 'Event name is required',
            description: model.description ? '' : 'Event description is required',
            location: model.location ? '' : 'Location is required',
            date: model.date && dayjs(model.date).isAfter(dayjs()) ? '' : 'Event date must be in the future',
            limit: !(model.participantLimitEnabled && model.participantLimit < 1) ? '' : 'Event participant limit must be at least 1'
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    }

    const tryToSave = async () => {
        if (validateForm()) {
            try {
                let service: CreateEventService = new CreateEventService();
                let loginResponse = await FacebookLoginHelper.checkLoginStatus();
                let userId = loginResponse.userInfo?.id!
                let dto: CreateEventDto = {
                    name: model.name,
                    description: model.description,
                    location: model.location,
                    date: model.date!.toLocaleString(),
                    participantsLimit: model.participantLimit,
                    participantsLimitEnabled: model.participantLimitEnabled,
                    organizerId: userId
                };
                await service.createEvent(dto);
            }
            catch (error) {
                console.log(error);
            }
        } else {
            console.log('Form is invalid');
        }
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
                        error={Boolean(errors.name)}
                        helperText={errors.name}
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
                        error={Boolean(errors.description)}
                        helperText={errors.description}
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
                        error={Boolean(errors.location)}
                        helperText={errors.location}
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

                {/* Custom Error Handling for MobileDateTimePicker */}
                <Grid display="flex" justifyContent="left" alignItems="left">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <FormControl error={Boolean(errors.date)}>
                            <MobileDateTimePicker
                                defaultValue={dateToShow()}
                                disablePast={true}
                                sx={{ background: "transparent" }}
                                onAccept={(value) => { if (value != null) setDate(value) }}
                            />
                            {errors.date && <FormHelperText>{errors.date}</FormHelperText>}
                        </FormControl>
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
                                error={Boolean(errors.limit)}
                                helperText={errors.limit}
                                fullWidth
                            />
                        )}
                    </Box>
                </Grid>

                <Button variant={"contained"} onClick={tryToSave}>
                    <Typography variant="h6" component="div">
                        Create
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

export default CreateEventView;
