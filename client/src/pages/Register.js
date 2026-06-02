import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });
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
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      onLogin(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#ffffff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      {/* Left side - Logo */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #a78bfa 0%, #fb923c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px',
        borderRadius: '16px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <img 
            src="/images/the_ingredient_list_logo.png" 
            alt="The Ingredient List" 
            style={{ 
              maxWidth: '280px', 
              height: 'auto',
              marginBottom: '30px'
            }} 
          />
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: 'white',
            margin: '0',
            letterSpacing: '1px'
          }}>
            The Ingredient List
          </h1>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div style={{
        flex: 1,
        padding: '40px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 8px 0'
          }}>
            Create account
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: '0'
          }}>
            Get started with The Ingredient List
          </p>
        </div>

        {error && (
          <div style={{ 
            background: '#fee2e2', 
            border: '1px solid #fecaca', 
            color: '#dc2626', 
            padding: '14px 16px', 
            borderRadius: '8px', 
            marginBottom: '24px', 
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '8px'
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="John Doe"
              onFocus={(e) => {
                e.target.style.borderColor = '#7c3aed';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '8px'
            }}>
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="Your Company"
              onFocus={(e) => {
                e.target.style.borderColor = '#7c3aed';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="you@example.com"
              onFocus={(e) => {
                e.target.style.borderColor = '#7c3aed';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
              onFocus={(e) => {
                e.target.style.borderColor = '#7c3aed';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
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
              fontWeight: '600',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s',
              fontSize: '14px',
              marginTop: '8px'
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={{ 
          textAlign: 'center', 
          color: '#6b7280', 
          marginTop: '32px', 
          fontSize: '14px'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ 
            color: '#7c3aed', 
            textDecoration: 'none', 
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
