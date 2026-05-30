import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  if (loading) return <div style={{ padding: '32px' }}>Loading dashboard...</div>;

  const StatCard = ({ label, value, change }) => (
    <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
      <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>{label}</p>
      <p style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>{value}</p>
      {change && <p style={{ color: '#10b981', fontSize: '14px', marginTop: '8px' }}>↑ {change}%</p>}
    </div>
  );

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>Dashboard</h1>
        <p style={{ color: '#6b7280', marginTop: '8px' }}>Welcome back! Here's your cold email campaign overview.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <StatCard label="Total Sent" value={summary?.totalEmailsSent || 0} />
        <StatCard label="Total Opens" value={summary?.totalOpens || 0} change={summary?.overallOpenRate} />
        <StatCard label="Total Replies" value={summary?.totalReplies || 0} change={summary?.overallReplyRate} />
        <StatCard label="Active Campaigns" value={summary?.activeCampaigns || 0} />
      </div>

      {/* Recent Campaigns */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Recent Campaigns</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Campaign</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Brand</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Sent</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>Open Rate</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr key={campaign._id} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500' }}>{campaign.name}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', background: campaign.brand === 'ingredient-list' ? '#fed7aa' : '#ddd6fe', color: campaign.brand === 'ingredient-list' ? '#92400e' : '#6b21a8' }}>
                      {campaign.brand === 'ingredient-list' ? 'Ingredient List' : 'Threxa'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', background: campaign.status === 'active' ? '#d1fae5' : '#f3f4f6', color: campaign.status === 'active' ? '#065f46' : '#374151' }}>
                      {campaign.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px' }}>{campaign.sent}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px' }}>{campaign.openRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
