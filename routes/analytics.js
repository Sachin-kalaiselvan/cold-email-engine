const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Email = require('../models/Email');
const { authenticateToken } = require('../middleware/auth');

router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.userId });
    const emails = await Email.find({ userId: req.userId });

    const summary = {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      totalEmailsSent: emails.filter(e => e.sentAt).length,
      totalOpens: emails.filter(e => e.opened).length,
      totalClicks: emails.filter(e => e.clicked).length,
      totalReplies: emails.filter(e => e.replied).length,
      overallOpenRate: emails.length ? ((emails.filter(e => e.opened).length / emails.filter(e => e.sentAt).length) * 100).toFixed(2) : 0,
      overallClickRate: emails.length ? ((emails.filter(e => e.clicked).length / emails.filter(e => e.sentAt).length) * 100).toFixed(2) : 0,
      overallReplyRate: emails.length ? ((emails.filter(e => e.replied).length / emails.filter(e => e.sentAt).length) * 100).toFixed(2) : 0
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/campaigns', authenticateToken, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.userId }).sort({ createdAt: -1 });

    const performanceData = await Promise.all(
      campaigns.map(async (campaign) => {
        const emails = await Email.find({ campaignId: campaign._id });
        return {
          _id: campaign._id,
          name: campaign.name,
          brand: campaign.brand,
          status: campaign.status,
          totalEmails: emails.length,
          sent: emails.filter(e => e.sentAt).length,
          opened: emails.filter(e => e.opened).length,
          clicked: emails.filter(e => e.clicked).length,
          replied: emails.filter(e => e.replied).length,
          openRate: emails.length ? ((emails.filter(e => e.opened).length / emails.filter(e => e.sentAt).length) * 100).toFixed(2) : 0,
          clickRate: emails.length ? ((emails.filter(e => e.clicked).length / emails.filter(e => e.sentAt).length) * 100).toFixed(2) : 0,
          replyRate: emails.length ? ((emails.filter(e => e.replied).length / emails.filter(e => e.sentAt).length) * 100).toFixed(2) : 0,
          createdAt: campaign.createdAt
        };
      })
    );

    res.json(performanceData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/timeline/:campaignId', authenticateToken, async (req, res) => {
  try {
    const emails = await Email.find({ campaignId: req.params.campaignId }).sort({ sentAt: 1 });

    const timeline = emails.map(email => ({
      _id: email._id,
      recipientEmail: email.recipientEmail,
      sentAt: email.sentAt,
      openedAt: email.openedAt,
      clickedAt: email.clickedAt,
      repliedAt: email.repliedAt,
      status: email.replied ? 'replied' : email.clicked ? 'clicked' : email.opened ? 'opened' : email.bounced ? 'bounced' : 'sent'
    }));

    res.json(timeline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/replies', authenticateToken, async (req, res) => {
  try {
    const replies = await Email.find({ 
      userId: req.userId,
      replied: true 
    }).sort({ repliedAt: -1 });

    const replyData = replies.map(email => ({
      _id: email._id,
      campaignId: email.campaignId,
      recipientEmail: email.recipientEmail,
      recipientName: email.recipientName,
      repliedAt: email.repliedAt,
      replyFrom: email.replyFrom,
      replySubject: email.replySubject,
      replyBody: email.replyBody,
      status: 'new'
    }));

    res.json(replyData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
