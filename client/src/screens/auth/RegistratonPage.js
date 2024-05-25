import React, { useEffect, useState } from 'react';
import png from '../../../images/favicon.png';
import { Link } from 'react-router-dom';
import GlobalApi from '../../utils/GlobalApi.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Register } from '../../features/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const RegistrationPage = () => {
  const navigate = useNavigate();
  // const [isError, setIsError] = useState(null);
  // const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const discpatch = useDispatch()
  const { isLoading, error, isUserLogin } = useSelector(state => state.auth)

  useEffect(() => {
    if (isUserLogin) {
      navigate('/')
      toast.success("User register successfully")
      toast.info('Please Verify your account. A verification link already sent to your email address', { position: 'top-center' })
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      })
    }
  }, [isUserLogin])


  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      discpatch(Register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }))


    } catch (error) {
      throw error
    }
  };

  return (
    <div className="my-4 flex w-full flex-wrap px-4">
      <div className="w-full px-4 ">
        <div className="relative mx-auto max-w-[525px] rounded-lg border-2  border-solid bg-white px-10 py-16 text-center sm:px-12 md:px-[60px]">
          <div className="mb-10 text-center md:mb-16">
            <Link to="/" className="mx-auto inline-block max-w-[160px]">
              <img src={png} alt="logo" />
            </Link>
          </div>

          <p className="text-lg text-red-400">
            {error && error}

          </p>

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
              {isLoading ? 'Loading...' : 'Register'}

            </button>
          </div>
          <div>
            Already Have Account?{' '}
            <Link to={'/login'} className="text-red-400">
              Login
            </Link>
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
