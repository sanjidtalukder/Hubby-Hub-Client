import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();
    const password = form.password.value;

    // Password validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !isLengthValid) {
      setError('Password must have at least 1 uppercase, 1 lowercase letter, and be at least 6 characters.');
      toast.error('Invalid Password!');
      return;
    }

    try {
      // Create user
      const userCredential = await createUser(email, password);

      // Update user profile with display name and photo URL (optional)
      await updateUserProfile({
        displayName: name,
        photoURL: photo || '',
      });

      // Save user info to MongoDB
      const userInfo = { name, email, photo };
      await axios.post('http://localhost:5000/users', userInfo);

      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      console.error(err.message);
      setError('Registration failed. Email may already be used or other error.');
      toast.error('Registration failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

          <form onSubmit={handleRegister}>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Name</span>
              </label><br></br>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label><br></br>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label><br></br>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL (optional)"
                className="input input-bordered"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label><br></br>
              <input
                type="password"
                name="password"
                placeholder="Enter strong password"
                className="input input-bordered"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full">
                Register
              </button>
            </div>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-600 font-semibold ml-1 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
