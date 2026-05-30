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
      const response = await axios.post('/api/auth/register', formData);
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
      background: 'linear-gradient(135deg, #a78bfa 0%, #fb923c 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
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
          {/* Logo Image */}
          <img 
            src="/images/the_ingredient_list_logo.png" 
            alt="The Ingredient List" 
            style={{ 
              maxWidth: '140px', 
              height: 'auto', 
              marginBottom: '24px',
              display: 'block',
              margin: '0 auto 24px'
            }} 
          />
          
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
            Create Your Account
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
                padding: '12px 16px', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              placeholder="John Doe"
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
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              placeholder="Your Company"
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
                boxSizing: 'border-box'
              }}
              placeholder="you@example.com"
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
                boxSizing: 'border-box'
              }}
              placeholder="Create a strong password"
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
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        {/* Login Link */}
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
            fontWeight: '700',
            cursor: 'pointer'
          }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
