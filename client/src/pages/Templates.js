import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    htmlContent: '',
    brand: 'ingredient-list'
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/templates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/templates', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ name: '', subject: '', htmlContent: '', brand: 'ingredient-list' });
      setShowModal(false);
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  if (loading) return <div style={{ padding: '32px' }}>Loading templates...</div>;

  const defaultTemplate = `<table style="width:100%; max-width:600px; margin:0 auto; background:#fff;">
  <tr>
    <td style="padding:40px 30px; text-align:center; background:#f9f7fe; border-bottom:1px solid #eee;">
      <p style="margin:0; font-size:24px; font-weight:bold; color:#1a1a1a;">The Ingredient List</p>
      <p style="margin:6px 0 0; font-size:12px; color:#888;">D2C Growth & Operations</p>
    </td>
  </tr>
  
  <tr>
    <td style="padding:40px 30px; font-family:Arial,sans-serif; color:#2a2a2a; line-height:1.6; font-size:15px;">
      <p>Hi [Founder],</p>
      <p>Saw that [Company] just [Milestone]. That's solid momentum.</p>
      <p>We work with D2C brands like yours to build beautiful websites and take care of the operations too.</p>
      <p>Worth a 15-min call to see if there's something worth exploring?</p>
      <p>Cheers,<br/><strong>Sachin</strong><br/>The Ingredient List</p>
    </td>
  </tr>
</table>`;

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>Email Templates</h1>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>Manage your email templates</p>
        </div>
        <button
          onClick={() => {
            setFormData({ name: '', subject: '', htmlContent: defaultTemplate, brand: 'ingredient-list' });
            setShowModal(true);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #fb923c 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          ➕ New Template
        </button>
      </div>

      {/* Templates Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {templates.map(template => (
          <div key={template._id} style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
            <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>{template.name}</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>{template.subject}</p>
            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', background: template.brand === 'ingredient-list' ? '#fed7aa' : '#ddd6fe', color: template.brand === 'ingredient-list' ? '#92400e' : '#6b21a8' }}>
              {template.brand === 'ingredient-list' ? 'Ingredient List' : 'Threxa'}
            </span>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button style={{ flex: 1, padding: '8px 12px', background: '#dbeafe', color: '#0369a1', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>
                Preview
              </button>
              <button style={{ flex: 1, padding: '8px 12px', background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, overflowY: 'auto', paddingY: '32px' }}>
          <div style={{ background: 'white', borderRadius: '8px', padding: '32px', width: '100%', maxWidth: '768px', margin: '32px auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Create Template</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Template Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  placeholder="e.g., SaaS Pitch Template"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  placeholder="e.g., [Company]'s recent milestone"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Brand</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                >
                  <option value="ingredient-list">The Ingredient List</option>
                  <option value="threxa">Threxa</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>HTML Content</label>
                <textarea
                  name="htmlContent"
                  value={formData.htmlContent}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '12px', outline: 'none', fontFamily: 'monospace' }}
                  rows="12"
                  required
                />
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                  Use [Company], [Founder], [Milestone] for personalization
                </p>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#7c3aed', color: 'white', padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}
                >
                  Create Template
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1, background: '#f3f4f6', color: '#6b7280', padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Templates;
