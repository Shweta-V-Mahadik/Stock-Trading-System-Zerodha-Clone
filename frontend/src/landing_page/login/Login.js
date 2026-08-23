import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Please enter your password');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3003/login', {
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess('Login successful! Redirecting to your dashboard...');
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        setTimeout(() => {
          const tokenParam = response.data.token ? `token=${encodeURIComponent(response.data.token)}` : '';
          const userParam = response.data.user ? `user=${encodeURIComponent(JSON.stringify(response.data.user))}` : '';
          const query = [tokenParam, userParam].filter(Boolean).join('&');
          window.location.href = `http://localhost:3002${query ? '?' + query : ''}`;
        }, 1000);
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Server error or connection failed. Please ensure the backend server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-3 px-md-5 py-4 py-md-5 mb-5">
      <div className="row align-items-center">
        {/* Left Column: Hero Graphic / Branding */}
        <div className="col-md-7 text-center p-4">
          <img
            src="media/images/signup.png"
            alt="Zerodha Login"
            className="img-fluid mb-4"
            style={{ maxHeight: '420px', objectFit: 'contain' }}
          />
          <h2 className="fs-3 fw-normal text-muted mt-3">Welcome Back</h2>
          <p className="text-muted fs-6">
            Log in to manage your portfolio, track live markets, and trade seamlessly.
          </p>
        </div>

        {/* Right Column: Login Form */}
        <div className="col-md-5 p-4">
          <div className="p-4 border rounded shadow-sm bg-white">
            <h1 className="fs-2 fw-semibold mb-2">Login to Kite</h1>
            <p className="text-muted mb-4 fs-6">Enter your credentials to access your account</p>

            {error && (
              <div className="alert alert-danger py-2 fs-6" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2 fs-6" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">Email Address</label>
                <input
                  type="email"
                  className="form-control p-2"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label text-muted small fw-bold mb-1">Password</label>
                </div>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control p-2"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fs-5 fw-medium mt-3"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-muted small mb-2">
                Don't have an account yet?
              </p>
              <Link
                to="/signup"
                className="text-decoration-none text-primary fw-medium small"
              >
                Sign up now &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
