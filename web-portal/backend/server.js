require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const authenticate = require('./src/authenticate');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/create-appointment', async (req, res) => {
    try {
        // Retrieve authentication details from environment variables
        const tokenUrl = process.env.APPOINTMENTS_OAUTH_TOKEN_URL;
        const clientId = process.env.APPOINTMENTS_OAUTH_CLIENT_ID;
        const clientSecret = process.env.APPOINTMENTS_OAUTH_CLIENT_SECRET;

        // Authenticate and get access token
        const accessToken = await authenticate(tokenUrl, clientId, clientSecret);

        const appointmentServiceUrl = process.env.APPOINTMENT_SERVICE_URL;
        if (!appointmentServiceUrl) {
            throw new Error('Appointment service URL is not defined in the environment variables');
        }

        const response = await axios.post(appointmentServiceUrl + '/appointments', req.body, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        // Respond to the client with the Appointment service's response
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error forwarding appointment creation request:', error);
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
