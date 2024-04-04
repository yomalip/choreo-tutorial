// components/UpcomingAppointments.js
import React, { useEffect, useState } from 'react';
import { getUpcomingAppointments } from '../services/appointmentService'; // You might need to implement this function
import { List, ListItem, ListItemText, Typography } from '@mui/material';

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
    }, [email, triggerRefresh]); // `triggerRefresh` is used to re-trigger fetching when a new appointment is booked

    if (appointments.length === 0) return null;

    return (
        <div>
            <Typography variant="h6" style={{ marginTop: 20, marginBottom: 10 }}>
                Upcoming Appointments
            </Typography>
            <List>
                {appointments.map((appointment, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${appointment.service} on ${new Date(appointment.appointmentDate).toLocaleString()}`}
                            secondary={`With: ${appointment.name}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default UpcomingAppointments;
