import React, { useEffect, useState } from 'react';
import { getUpcomingAppointments } from '../services/appointmentService';
import { List, ListItem, ListItemText, Typography, Paper, Avatar, ListItemAvatar, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format } from 'date-fns';

const UpcomingAppointments = ({ email, triggerRefresh }) => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        if (!email) return;

        try {
            const upcomingAppointments = await getUpcomingAppointments(email);
            setAppointments(upcomingAppointments);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [email, triggerRefresh]);

    if (appointments.length === 0) {
        return (
            <Typography variant="subtitle1" style={{ marginTop: 20, textAlign: 'center' }}>
                No upcoming appointments. Take a moment to book one!
            </Typography>
        );
    }

    return (
        <Paper elevation={3} style={{ marginTop: 20, padding: '20px' }}>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
                Upcoming Appointments
            </Typography>
            <List>
                {appointments.map((appointment, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>
                                <CalendarTodayIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={appointment.service}
                            secondary={`On ${format(new Date(appointment.appointmentDate), 'PPpp')} for ${appointment.name}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default UpcomingAppointments;
