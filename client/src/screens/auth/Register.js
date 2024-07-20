import React, { useEffect, useState } from 'react';
import png from '../../../images/favicon.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Register, clearError } from '../../features/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import InputBox from '../../utils/InputBox';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { isLoading, error, isUserVerified, isUserLogin } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isUserLogin) {
      navigate('/');
      toast.success('User login successfully');
    }
  }, [isUserLogin]);

  const checkInput = async (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (emailPattern.test(value)) {
      return 'email';
    } else if (usernamePattern.test(value)) {
      return 'username';
    } else {
      return 'invalid';
    }
  };

  useEffect(() => {
    if (isUserVerified === false) {
      navigate('/login');
      toast.success('User register successfully');
      toast.info(
        'Please Verify your account. A verification link already sent to your email address',
        { position: 'top-center' }
      );
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
      });
    }
  }, [isUserVerified]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkUsername = await checkInput(formData.username);
    if (checkUsername != 'username') {
      toast.error('Enter Valid Username');
      return;
    }
    try {
      dispatch(
        Register({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  return (
    <div className="my-4 flex w-full flex-wrap px-4">
      <div className="my-10 w-full px-4">
        <div className="relative mx-auto max-w-[525px] rounded-lg border  bg-white px-10 py-16 text-center shadow-md shadow-black sm:px-12 md:px-[60px]">
          <div className="flex flex-col text-center md:mb-16">
            <Link to="/" className="mx-auto inline-block max-w-[160px]">
              <img className="h-20" src={png} alt="logo" />
            </Link>
            <h2 className="text-2xl font-semibold text-primary">
              Create New Account
            </h2>
          </div>

          <div className="mt-2 flex w-full flex-col">
            <div className="mb-6 flex w-full flex-col items-center justify-start">
              <label htmlFor="name" className="w-full text-start">
                Name
              </label>
              <InputBox
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-slate-700 bg-transparent px-4 text-base outline-none focus-visible:shadow-none"
              />
            </div>
            <div className="mb-6 flex w-full flex-col items-center justify-start">
              <label htmlFor="username" className="w-full text-start">
                Username
              </label>
              <InputBox
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-slate-700 bg-transparent px-4 text-base outline-none focus-visible:shadow-none"
              />
            </div>
            <div className="mb-6 flex w-full flex-col items-center justify-start">
              <label htmlFor="email" className="w-full text-start">
                Email{' '}
              </label>
              <InputBox
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-slate-700 bg-transparent px-4 text-base outline-none focus-visible:shadow-none"
              />
            </div>
            <div className="mb-6 flex w-full flex-col items-center justify-start">
              <label htmlFor="password" className="w-full text-start">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-slate-700 bg-transparent px-4 text-base outline-none focus-visible:shadow-none"
              />
            </div>
            <div className="mb-7">
              <button
                onClick={handleSubmit}
                className="mt-1 h-11 w-full rounded-md bg-primary px-5 font-medium text-white shadow-md shadow-black transition duration-300 ease-in-out hover:bg-primary-light"
              >
                {isLoading ? 'Loading...' : 'Create New Account'}
              </button>
            </div>
          </div>

          <div>
            Already Have Account?{' '}
            <Link
              to={'/login'}
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
