import { useState } from 'react';
import GlobalApi from '../../utils/GlobalApi';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [input, setInput] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);
  const [message, setmessage] = useState();

  const handleClick = async () => {
    const isEmail = /\S+@\S+\.\S+/.test(input);

    const requestBody = isEmail ? { email: input } : { username: input };

    console.log(requestBody);
    setisLoading(true);
    try {
      const res = await GlobalApi.forgotPasswordLink({
        email: isEmail ? input : '',
        password: !isEmail ? input : '',
      });

      console.log(res);
      setmessage(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="mb-3 gap-y-3">
      <p>
        Forget your password? Please enter your username or email address. You
        will receive a link to create a new password via email.
      </p>
      <div className="my-4">
        <input
          type="text"
          placeholder="Username or Email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border bg-transparent px-5 py-3 text-base outline-none focus-visible:shadow-none"
        />
      </div>
      {message && <p className="text-green-500">{message}</p>}
      <button
        onClick={handleClick}
        type="button"
        className="w-full rounded-md bg-slate-600 px-5 py-3 font-medium text-white transition hover:bg-opacity-90"
      >
        {isLoading ? 'Loading...' : 'Reset Password'}
      </button>
    </div>
  );
}

export default ForgotPassword;
