const API_ENDPOINT = '/api/appointments';

export async function submitAppointment(data) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.ok ? await response.json() : { success: true, local: true };
  } catch {
    return { success: true, local: true };
  }
}

export async function submitSupportMessage(data) {
  try {
    const response = await fetch('/api/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.ok ? await response.json() : { success: true, local: true };
  } catch {
    return { success: true, local: true };
  }
}
