import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError('Invalid email or password!');
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success('Google login successful!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError('Google login failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Login to your account</h2>

          <form onSubmit={handleLogin}>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="Enter your email" className="input input-bordered" required />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="Enter your password" className="input input-bordered" required />
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogle} className="btn btn-outline w-full mb-2 flex items-center gap-2">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <p className="text-sm text-center">
            Don't have an account? 
            <Link to="/register" className="text-blue-600 font-semibold ml-1 hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
