import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../features/authSlice';

const useCheckSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
};

export default useCheckSession;
