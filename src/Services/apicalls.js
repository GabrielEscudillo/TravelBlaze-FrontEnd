import axios from "axios";

const API_URL = "http://localhost:3000";

export const userLogin = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, credentials, {});
    const token = res.data.token;
    return token;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export const userSignUp = async (signUpData) => {
  const res = await axios.post(`${API_URL}/users/register`, signUpData, {});
  return res.data;
};

export const bringAllAgents = async () => {
  const res = await axios.get(`${API_URL}/users/get/agents`);
  return res.data;
};

export const bringProfile = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const res = await axios.get(`${API_URL}/users/${id}`, config);
  return res.data;
};

export const updateProfile = async (token, id, updateData) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.patch(`${API_URL}/users/${id}`, updateData, config);
  return res.data;
};

export const bringBookings = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const res = await axios.get(`${API_URL}/bookings/mybookings/${id}`, config);
  return res.data;
};

export const bringAllUsers = async (token, page = 1, limit = 5) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.get(
    `${API_URL}/users/get/allusers?page=${page}&limit=${limit}`,
    config
  );
  return res.data;
};

export const removeUser = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.delete(`${API_URL}/users/${id}`, config);
  return res.data;
};

export const bringAllBookings = async (token, page = 1, limit = 3) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.get(
    `${API_URL}/bookings/allbookings?page=${page}&limit=${limit}`,
    config
  );
  return res.data;
};

export const removeBooking = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.delete(`${API_URL}/bookings/${id}`, config);
  return res.data;
};

export const bringAllAppointments = async (token, page = 1, limit = 6) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.get(
    `${API_URL}/appointments/allappointments?page=${page}&limit=${limit}`,
    config
  );
  return res.data;
};

export const DeleteAppointment = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.delete(`${API_URL}/appointments/${id}`, config);
  return res;
};

export const agentSignUp = async (token, agentSignUpData) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.post(
    `${API_URL}/users/createagent`,
    agentSignUpData,
    
    config
  );
  return res.data;
};

export const createBooking = async (token, bookingInfo) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.post(
    `${API_URL}/bookings/newbooking`,
    bookingInfo,
    config
  );
  return res.data;
};

export const createCruise = async (token, bookingInfo) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.post(
    `${API_URL}/bookings/newcruise`,
    bookingInfo,
    config
  );
  return res.data;
};

export const bringAppointments = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const res = await axios.get(`${API_URL}/appointments/user/${id}`, config);
  return res.data;
};

export const updateAppointment = async (token, id, updatedAppointment) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.patch(
    `${API_URL}/appointments/${id}`,
    updatedAppointment,
    config
  );
  return res.data;
};

export const createAppointment = async (token, appointmentData) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.post(
    `${API_URL}/appointments/newAppointment`,
    appointmentData,
    config
  );
  return res;
};

export const bringAllServices = async () => {
  const res = await axios.get(`${API_URL}/appointments/allservices`);
  return res.data;
};

export const bringAgentAppointments = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.get(`${API_URL}/appointments/agent/${id}`, config);
  return res.data;
};
