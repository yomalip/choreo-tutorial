const baseUrl = '/choreo-apis/web-portal/backend-ani/appointments-5c6/v1.0/appointments'; // Adjust this URL to match your actual backend endpoint

export const bookAppointment = async (appointmentDetails) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentDetails),
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
