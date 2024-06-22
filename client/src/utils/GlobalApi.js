import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.BASEURL,
});

const registerUser = async ({ name, username, email, password }) => {
  const response = await axiosClient.post(
    'auth/register',
    {
      name,
      username,
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  console.log(response);
  return response.data;
};

const loginUser = async ({ email, password }) => {
  const response = await axiosClient.post(
    'auth/login',
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  // console.log(response);
  return response.data;
};

const emailVerify = async ({ token }) => {
  const response = await axiosClient.post('auth/emailVerify', {
    token,
  });

  return response.data;
};

const forgotPasswordLink = async ({ username, email }) => {
  const response = await axiosClient.post('auth/forgotPassword', {
    username,
    email,
  });

  return response.data;
};

const forgotPassword = async ({ password, token }) => {
  const response = await axiosClient.put('auth/forgotPassword', {
    password,
    token,
  });

  return response.data;
};

export default {
  registerUser,
  loginUser,
  emailVerify,
  forgotPasswordLink,
  forgotPassword,
};
