import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: 'ingredient-list'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/campaigns', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/campaigns', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ name: '', description: '', brand: 'ingredient-list' });
      setShowModal(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  if (loading) return <div style={{ padding: '32px' }}>Loading campaigns...</div>;

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>Campaigns</h1>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>Manage your cold email campaigns</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
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
          ➕ New Campaign
        </button>
      </div>

      {/* Campaign Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {campaigns.map(campaign => (
          <div key={campaign._id} style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontWeight: 'bold', color: '#111827' }}>{campaign.name}</h3>
                <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', background: campaign.brand === 'ingredient-list' ? '#fed7aa' : '#ddd6fe', color: campaign.brand === 'ingredient-list' ? '#92400e' : '#6b21a8' }}>
                  {campaign.brand === 'ingredient-list' ? 'Ingredient List' : 'Threxa'}
                </span>
              </div>
              <span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', background: campaign.status === 'active' ? '#d1fae5' : '#f3f4f6', color: campaign.status === 'active' ? '#065f46' : '#374151' }}>
                {campaign.status}
              </span>
            </div>

            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>{campaign.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', padding: '12px', background: '#f9fafb', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{campaign.sentCount}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Sent</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{campaign.openCount}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Opened</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{campaign.replyCount}</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Replied</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ flex: 1, padding: '8px 12px', background: '#d1fae5', color: '#065f46', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>
                Launch
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'white', borderRadius: '8px', padding: '32px', width: '100%', maxWidth: '448px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Create Campaign</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Campaign Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  placeholder="e.g., SaaS Founders Q2 2024"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }}
                  placeholder="Describe your campaign"
                  rows="3"
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

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, background: '#7c3aed', color: 'white', padding: '12px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}
                >
                  Create
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

export default Campaigns;
