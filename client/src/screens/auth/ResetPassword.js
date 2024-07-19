import React, { useEffect, useState } from 'react';
import png from '../../../images/favicon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, resetPassword } from '../../features/authSlice';
import { toast } from 'react-toastify';
import InputBox from '../../utils/InputBox';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    token: token,
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  let { isLoading, error, isUserLogin, success } = data;

  useEffect(() => {
    if (isUserLogin) {
      navigate('/');
      toast.success('User login successfully');

      setFormData({
        email: '',
        password: '',
      });
    }
  }, [isUserLogin]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      dispatch(resetPassword({ resetData: formData }));
      if (success) {
        navigate('/');
      }
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
              Set New Password
            </h2>
          </div>
          <div className="mt-2 flex w-full flex-col">
            <div className="mb-6 flex w-full flex-col items-center justify-start">
              <label htmlFor="password" className="w-full text-start">
                Password
              </label>
              <InputBox
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-slate-700 bg-transparent px-4 text-base outline-none focus-visible:shadow-none"
              />
            </div>

            <div className="mb-6 flex w-full flex-col items-center justify-start">
              <label htmlFor="confirmPassword" className="w-full text-start">
                Confirm Password
              </label>
              <InputBox
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-slate-700 bg-transparent px-4 text-base outline-none focus-visible:shadow-none"
              />
            </div>

            <div className="mb-7">
              <button
                onClick={handleSubmit}
                className="mt-1 h-11 w-full rounded-md bg-primary px-5 font-medium text-white shadow-md shadow-black transition duration-300 ease-in-out hover:bg-primary-light"
              >
                {isLoading ? 'Loading...' : 'Reset Password'}
              </button>
            </div>
          </div>
          <ul className="-mx-2 mb-12 flex justify-between"></ul>
          <div>
            Remember your password?{' '}
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

export default ResetPassword;
