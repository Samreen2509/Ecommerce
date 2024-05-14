import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalApi from '../../utils/GlobalApi';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import { toast } from 'react-toastify';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    setError(null);

    if (!password || !token) {
      setError('Password and token are required.');
      setisLoading(false);
      throw new Error('Password and token are required.');
    }

    try {
      const res = await GlobalApi.forgotPassword({ password, token });
      console.log(res);
      toast.success(res?.response?.data?.message);
      navigate('/');
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(
        error?.response?.data?.statusCode === 404 && 'Already Use token',
        {
          position: 'top-center',
        }
      );
    } finally {
      setisLoading(false);
    }
  };

  return (
    <section className="mx-auto h-screen w-full max-w-md p-6">
      <div className="mt-7 rounded-xl border-2 border-indigo-300 bg-white shadow-lg">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                className="font-medium text-blue-600 decoration-2 hover:underline"
                to="/login"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <p className="text-center text-sm text-red-400">
                  {error && 'Please Fill Details Properly'}
                </p>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 ml-1 block text-sm font-bold"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      onClickCapture={() => setShowConfirmPassword(false)}
                      id="password"
                      name="password"
                      className="block w-full rounded-md border-2 border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordsMatch(e.target.value === confirmPassword);
                      }}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoEyeOutline size={23} />
                      ) : (
                        <IoEyeOffOutline size={23} />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 ml-1 block text-sm font-bold"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      onClickCapture={() => setShowPassword(false)}
                      id="confirm-password"
                      name="confirm-password"
                      className={`block w-full rounded-md border-2 border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring ${
                        passwordsMatch ? 'border-gray-200' : 'border-red-500'
                      }`}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordsMatch(e.target.value === password);
                      }}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <IoEyeOutline size={23} />
                      ) : (
                        <IoEyeOffOutline size={23} />
                      )}
                    </button>
                  </div>
                  {!passwordsMatch && (
                    <p className="mt-2 text-xs text-red-600">
                      Passwords do not match
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isLoading ? 'Loading...' : 'Reset password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
