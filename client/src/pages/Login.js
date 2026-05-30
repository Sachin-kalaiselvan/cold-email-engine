import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      onLogin(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #a78bfa 0%, #fb923c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '32px', width: '100%', maxWidth: '448px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed 0%, #fb923c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
            🌿
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>The Ingredient List</h1>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>Cold Email Automation Engine</p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #7c3aed 0%, #fb923c 100%)',
              color: 'white',
              fontWeight: '500',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              opacity: loading ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '24px', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: '500' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
