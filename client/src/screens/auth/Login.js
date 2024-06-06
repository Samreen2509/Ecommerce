import React, { useEffect, useState } from 'react';
import png from '../../../images/favicon.png';
import { Link, useNavigate } from 'react-router-dom';
// import GlobalApi from '../../utils/GlobalApi';
// import { toast } from 'react-toastify';
// import ForgotPassword from './ForgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [openForgotpass, setOpenforgortpass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  console.log(data, data.isLoading, data.error);
  const { isLoading, error, isUserVerified, isUserLogin } = data;
  console.log(error);

  useEffect(() => {
    if (isUserLogin) {
      navigate('/');
      toast.success('User login successfully');

      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
      });
    }
  }, [isUserLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        login({
          email: formData.email,
          password: formData.password,
        })
      );
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };
  const handleForgotPass = () => {
    setOpenforgortpass(!openForgotpass);
  };

  return (
    <div className="my-4 flex w-full flex-wrap px-4">
      <div className="w-full px-4">
        <div className="relative mx-auto max-w-[525px] rounded-lg border-4  border-solid bg-white px-10 py-16 text-center sm:px-12 md:px-[60px]">
          <div className="mb-10 text-center md:mb-16">
            <Link to="/" className="mx-auto inline-block max-w-[160px]">
              <img src={png} alt="logo" />
            </Link>
          </div>
          {isUserVerified ? (
            <p className="text-start text-sm capitalize text-red-400">
              Please Verify your account. A verification link already sent to
              your email address
            </p>
          ) : (
            error && (
              <p className="text-xl text-red-400">
                {/* 'Please Fill Details Properly' */}
                {error}
              </p>
            )
          )}
          <div className="mt-2">
            <div className="mb-6">
              <InputBox
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border bg-transparent px-5 py-3 text-base outline-none focus-visible:shadow-none"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-700 bg-transparent px-5 py-3 text-base outline-none focus-visible:shadow-none"
              />
            </div>
            <div className="mb-7">
              <button
                onClick={handleSubmit}
                className="w-full rounded-md  bg-slate-600 px-5 py-3 font-medium text-white transition hover:bg-opacity-90"
              >
                {isLoading ? 'Loading...' : 'Sign In'}
              </button>
            </div>
          </div>

          {/* Social media login buttons */}
          <ul className="-mx-2 mb-12 flex justify-between">
            {/* Add your social media login buttons here */}
          </ul>
          {/* Forgot password link */}
          <button
            onClick={handleForgotPass}
            className="hover:text-primary mb-2 inline-block hover:underline"
          >
            {' '}
            Forget Password?{' '}
          </button>
          {openForgotpass && <ForgotPassword />}
          {/* Link to registration page */}
          <p className="text-body-color text-base">
            <span className="pr-0.5">Not a member yet?</span>
            <Link to="/register" className="text-blue-600 hover:underline">
              {' '}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// InputBox component remains the same
const InputBox = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-700 bg-transparent px-5 py-3 text-base outline-none focus-visible:shadow-none"
      />
    </div>
  );
};

export default Login;
