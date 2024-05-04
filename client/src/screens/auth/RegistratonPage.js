import React, { useState } from 'react';
import png from '../../../images/favicon.png';
import { Link } from 'react-router-dom';
import GlobalApi from '../../utils/GlobalApi.js';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await GlobalApi.registerUser(
        formData.name,
        formData.username,
        formData.email,
        formData.password
      );

      console.log(res);
      console.log('Registration successful!');

      setFormData({
        username: '',
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // const registerUser = async (name, username, email, password) => {
  //   try {
  //     await axios.post('https://ecom-dqrw.onrender.com/api/v1/auth/register', {
  //       name: name,
  //       username: username,
  //       email: email,
  //       password: password,
  //     });
  //   } catch (error) {
  //     console.error('Registration failed:', error.response.data); // Log the error response data
  //     throw new Error('Registration failed:', error);
  //   }
  // };

  return (
    <div className="my-4 flex w-full flex-wrap px-4">
      <div className="w-full px-4 ">
        <div className="relative mx-auto max-w-[525px] rounded-lg border-2  border-solid bg-white px-10 py-16 text-center sm:px-12 md:px-[60px]">
          <div className="mb-10 text-center md:mb-16">
            <Link to="/" className="mx-auto inline-block max-w-[160px]">
              <img src={png} alt="logo" />
            </Link>
          </div>
          <InputBox
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <InputBox
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputBox
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputBox
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="mb-10">
            <button
              type="button" // Change type to button
              onClick={handleSubmit} // Handle click event directly
              className="w-full rounded-md  bg-slate-600 px-5 py-3 font-medium text-white transition hover:bg-opacity-90"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputBox = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border bg-transparent px-5 py-3 text-base outline-none focus-visible:shadow-none"
      />
    </div>
  );
};

export default RegistrationPage;
