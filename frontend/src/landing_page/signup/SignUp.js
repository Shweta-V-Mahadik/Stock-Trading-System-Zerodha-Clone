import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
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
    if (!formData.username.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.mobile.trim()) {
      setError('Please enter your 10-digit mobile number');
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      setError('Mobile number must be exactly 10 digits');
      return false;
    }
    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!agreedTerms) {
      setError('You must agree to the Terms & Conditions');
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
      const response = await api.post('/signup', {
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess('Signup successful! Redirecting to your dashboard...');
        setFormData({
          username: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
        });
        setAgreedTerms(false);

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        let code = null;
        try {
          const handoffRes = await api.post('/auth/create-handoff', {
            token: response.data.token,
            user: response.data.user,
          });
          if (handoffRes.data && handoffRes.data.success) {
            code = handoffRes.data.code;
          }
        } catch (handoffErr) {
          console.error('Error creating auth handoff code:', handoffErr);
        }

        setTimeout(() => {
          let dashboardBase = (process.env.REACT_APP_DASHBOARD_URL || 'http://localhost:3002').trim();
          if (!/^https?:\/\//i.test(dashboardBase)) {
            if (dashboardBase.includes('localhost') || dashboardBase.includes('127.0.0.1')) {
              dashboardBase = 'http://' + dashboardBase;
            } else {
              dashboardBase = 'https://' + dashboardBase;
            }
          }
          try {
            const targetUrl = new URL(dashboardBase);
            if (code) {
              targetUrl.searchParams.set('code', code);
            }
            window.location.href = targetUrl.toString();
          } catch (e) {
            const sep = dashboardBase.includes('?') ? '&' : '?';
            window.location.href = code ? `${dashboardBase}${sep}code=${encodeURIComponent(code)}` : dashboardBase;
          }
        }, 1000);
      } else {
        setError(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
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
        {/* Left Column: Hero Image & Information */}
        <div className="col-md-7 text-center p-4">
          <img
            src="media/images/signup.png"
            alt="Zerodha Signup"
            className="img-fluid mb-4"
            style={{ maxHeight: '420px', objectFit: 'contain' }}
          />
          <h2 className="fs-3 fw-normal text-muted mt-3">Invest in everything</h2>
          <p className="text-muted fs-6">
            Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
          </p>
        </div>

        {/* Right Column: Signup Form */}
        <div className="col-md-5 p-4">
          <div className="p-4 border rounded shadow-sm bg-white">
            <h1 className="fs-2 fw-semibold mb-2">Signup now</h1>
            <p className="text-muted mb-4 fs-6">Or track your existing application</p>

            {error && (
              <div className="alert alert-danger py-2 fs-6" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2 fs-6" role="alert">
                {success} Redirecting to Dashboard...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">Full Name</label>
                <input
                  type="text"
                  className="form-control p-2"
                  placeholder="Enter your full name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

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
                <label className="form-label text-muted small fw-bold">Mobile Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">+91</span>
                  <input
                    type="tel"
                    className="form-control p-2"
                    placeholder="10 digit mobile number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control p-2"
                    placeholder="Minimum 6 characters"
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

              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control p-2"
                  placeholder="Re-enter password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termsCheck"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                />
                <label className="form-check-label text-muted small" htmlFor="termsCheck">
                  I agree to the terms & conditions and consent to account creation.
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fs-5 fw-medium"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing up...
                  </span>
                ) : (
                  'Continue'
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-muted small">
                By continuing, you will receive an SMS or email for account verification.
              </p>
              <Link
                to="/login"
                className="text-decoration-none text-primary fw-medium small"
              >
                Already have an account? Login &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;