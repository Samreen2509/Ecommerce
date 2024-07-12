import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalApi from '../../utils/GlobalApi';
import { toast } from 'react-toastify';

function VerifyEmail() {
  const [error, seterror] = useState();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          await GlobalApi.emailVerify({ token });
          toast.success('Your Verified Successfully', {
            position: 'top-center',
          });
          console.log('Email verified successfully:');
          navigate('/login');
        } catch (error) {
          console.log(error.response.data);
          seterror(error.response.data.message);
          toast.error(error.response.data.message, {
            position: 'top-center',
          });
          navigate('/login');
        }
      };

      verifyEmail();
    }
  }, []);

  return (
    <div className="mt-[10%] flex h-screen w-full items-start justify-center">
      {error ? (
        error === 500 ? (
          'Token is Expired'
        ) : (
          error
        )
      ) : (
        <div className="flex animate-pulse flex-col text-center text-3xl opacity-70">
          Please wait...
          <p className="text-xl">Your Email Verify is in process</p>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
