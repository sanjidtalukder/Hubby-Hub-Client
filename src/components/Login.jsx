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
    setError('');
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
      toast.error('Login failed!');
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await googleLogin();
      toast.success('Google login successful!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError('Google login failed!');
      toast.error('Google login failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login to HobbyHub</h2>

        {error && (
          <div className="text-red-600 text-sm text-center mb-4">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label><br></br>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              required
              className="input input-bordered"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mb-4">
            Login
          </button>
        </form>

        <div className="text-center mb-4">
          <p>or</p>
        </div>

        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className="mt-6 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
