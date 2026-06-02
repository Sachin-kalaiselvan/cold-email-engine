import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [summaryRes, campaignsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/analytics/summary', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/analytics/campaigns', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setSummary(summaryRes.data);
      setCampaigns(campaignsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '32px', color: '#6b7280' }}>Loading dashboard...</div>;

  const StatCard = ({ label, value, icon }) => (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px', 
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
      padding: '24px',
      border: 'none',
      transition: 'all 0.3s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.1)'}
    onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'}
    >
      <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: '0' }}>{label}</p>
      <p style={{ fontSize: '36px', fontWeight: '700', marginTop: '12px', margin: '0', color: '#1f2937' }}>
        {value}
      </p>
      {icon && <span style={{ fontSize: '24px', marginTop: '8px', display: 'block' }}>{icon}</span>}
    </div>
  );

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0' }}>Dashboard</h1>
        <p style={{ color: '#6b7280', marginTop: '8px', fontSize: '15px' }}>
          Welcome to The Ingredient List! Here's your cold email campaign overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px'
      }}>
        <StatCard label="Total Sent" value={summary?.totalEmailsSent || 0} icon="📧" />
        <StatCard label="Opened" value={summary?.totalOpens || 0} icon="👁️" />
        <StatCard label="Clicked" value={summary?.totalClicks || 0} icon="🔗" />
        <StatCard label="Replied" value={summary?.totalReplies || 0} icon="💬" />
      </div>

      {/* Key Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #7c3aed 0%, #fb923c 100%)', 
          borderRadius: '12px', 
          padding: '24px',
          color: 'white'
        }}>
          <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>Open Rate</p>
          <p style={{ fontSize: '32px', fontWeight: '700', margin: '8px 0 0 0' }}>
            {summary?.overallOpenRate || 0}%
          </p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #fb923c 0%, #7c3aed 100%)', 
          borderRadius: '12px', 
          padding: '24px',
          color: 'white'
        }}>
          <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>Click Rate</p>
          <p style={{ fontSize: '32px', fontWeight: '700', margin: '8px 0 0 0' }}>
            {summary?.overallClickRate || 0}%
          </p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #a78bfa 0%, #fb923c 100%)', 
          borderRadius: '12px', 
          padding: '24px',
          color: 'white'
        }}>
          <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>Reply Rate</p>
          <p style={{ fontSize: '32px', fontWeight: '700', margin: '8px 0 0 0' }}>
            {summary?.overallReplyRate || 0}%
          </p>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0', color: '#1f2937' }}>Recent Campaigns</h2>
        </div>
        
        {campaigns.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
            <p style={{ fontSize: '15px' }}>No campaigns yet. Create one to get started!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Campaign</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Brand</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Sent</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Open Rate</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(campaign => (
                  <tr key={campaign._id} style={{ borderTop: '1px solid #e5e7eb', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                      {campaign.name}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        background: campaign.brand === 'ingredient-list' ? '#fed7aa' : '#ddd6fe', 
                        color: campaign.brand === 'ingredient-list' ? '#92400e' : '#6b21a8'
                      }}>
                        {campaign.brand === 'ingredient-list' ? 'Ingredient List' : 'Threxa'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        background: campaign.status === 'active' ? '#d1fae5' : '#f3f4f6', 
                        color: campaign.status === 'active' ? '#065f46' : '#374151'
                      }}>
                        {campaign.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#1f2937' }}>
                      {campaign.sent}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>
                      {campaign.openRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
