import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../../features/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(User());
  }, [dispatch]);

  return (
    <main className="flex min-h-[600px] w-full flex-col items-center justify-center">
      <div className="mt-6 flex flex-col items-center justify-start">
        <h2 className="text-2xl font-medium leading-6 text-gray-900">
          Account
        </h2>
        <h2>
          <Link to={'/'}>Home</Link> . Account
        </h2>
      </div>
      <div className="mt-4 max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-medium leading-6 text-gray-900">
            Account
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userData?.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userData?.email}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userData?.username}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                isEmailVerified
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {!userData?.isEmailVerified
                  ? 'Email Not verified'
                  : 'Email verified'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                To get social media testimonials like these, keep your customers
                engaged with your social media accounts by posting regularly
                yourself
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default Profile;
