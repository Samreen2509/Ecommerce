import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.BASEURL,
});

const registerUser = async ({ name, username, email, password }) => {
  try {
    const response = await axiosClient.post('auth/register', {
      name,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export default {
  registerUser,
};
