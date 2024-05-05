import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://ecom-dqrw.onrender.com/api/v1/',
});
// console.log(process.env.BASEURL);

const registerUser = async ({ name, username, email, password }) => {
  const response = await axiosClient.post('auth/register', {
    name,
    username,
    email,
    password,
  });
  console.log(response);
  return response;
};

const loginUser = async ({ email, password }) => {
  console.log('true');
  const response = await axiosClient.post(
    'auth/login',
    JSON.stringify({
      email,
      password,
    })
  );
  console.log(response);
  return response;
};

export default {
  registerUser,
  loginUser,
};
