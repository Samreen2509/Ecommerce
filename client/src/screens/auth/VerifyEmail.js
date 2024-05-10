import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalApi from '../../utils/GlobalApi';

function VerifyEmail() {
  const [error, seterror] = useState();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  console.log(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const res = await GlobalApi.emailVerify({ token });
          console.log('Email verified successfully:', res);
          navigate('/');
        } catch (error) {
          seterror(error.response.data.statusCode);
          console.error('Error verifying email:', error);
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
          'Server error'
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
