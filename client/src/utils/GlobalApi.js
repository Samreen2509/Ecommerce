import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.BASEURL,
});

const registerUser = async ({ name, username, email, password }) => {
  const response = await axiosClient.post('auth/register', {
    name,
    username,
    email,
    password,
  });
  console.log(response);
  return response.data;
};

const loginUser = async ({ email, password }) => {
  const response = await axiosClient.post('auth/login', {
    email,
    password,
  });
  // console.log(response);
  return response.data;
};

const emailVerify = async ({ token }) => {
  const response = await axiosClient.post('auth/emailVerify', {
    token,
  });

  return response.data;
};

export default {
  registerUser,
  loginUser,
  emailVerify,
};
