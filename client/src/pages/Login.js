import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
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
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      onLogin(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #a78bfa 0%, #fb923c 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)', 
        padding: '48px 40px', 
        width: '100%', 
        maxWidth: '480px'
      }}>
        {/* Logo and Brand */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          {/* Logo Image - Blended with background */}
          <div style={{
            width: '140px',
            height: '140px',
            margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #a78bfa 0%, #fb923c 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            boxShadow: '0 10px 30px rgba(124, 58, 237, 0.2)'
          }}>
            <img 
              src="/images/the_ingredient_list_logo.png" 
              alt="The Ingredient List" 
              style={{ 
                maxWidth: '120px', 
                height: 'auto',
                borderRadius: '16px'
              }} 
            />
          </div>
          
          {/* Brand Text */}
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700',
            color: '#1f2937',
            margin: '0',
            letterSpacing: '1px'
          }}>
            The Ingredient List
          </h1>
          
          <p style={{ 
            color: '#6b7280', 
            marginTop: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Cold Email Automation Engine
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ 
            background: '#fee2e2', 
            border: '1px solid #fecaca', 
            color: '#dc2626', 
            padding: '12px 16px', 
            borderRadius: '8px', 
            marginBottom: '24px', 
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              placeholder="theingredientlist.co@gmail.com"
              onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                padding: '12px 16px', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              placeholder="Enter your password"
              onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
              fontWeight: '700',
              padding: '14px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'all 0.3s',
              fontSize: '15px',
              letterSpacing: '0.5px',
              marginTop: '12px'
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p style={{ 
          textAlign: 'center', 
          color: '#6b7280', 
          marginTop: '32px', 
          fontSize: '14px'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ 
            color: '#7c3aed', 
            textDecoration: 'none', 
            fontWeight: '700',
            cursor: 'pointer'
          }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
