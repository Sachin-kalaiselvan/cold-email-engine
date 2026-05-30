const express = require('express');
const router = express.Router();
const Email = require('../models/Email');
const { authenticateToken } = require('../middleware/auth');

router.post('/test', authenticateToken, async (req, res) => {
  try {
    const { recipientEmail, templateContent, brand } = req.body;
    res.json({ message: 'Test email would be sent', success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/campaign/:campaignId', authenticateToken, async (req, res) => {
  try {
    const emails = await Email.find({ 
      campaignId: req.params.campaignId 
    }).sort({ sentAt: -1 });

    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }

    res.json(email);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/track/open/:id', async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (email) {
      email.opened = true;
      email.openedAt = new Date();
      await email.save();
    }

    res.setHeader('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
  } catch (error) {
    res.status(500).send('Error');
  }
});

router.post('/:id/reply', async (req, res) => {
  try {
    const { senderEmail, subject, body } = req.body;

    const email = await Email.findById(req.params.id);
    if (email) {
      email.replied = true;
      email.repliedAt = new Date();
      email.replyFrom = senderEmail;
      email.replySubject = subject;
      email.replyBody = body;
      await email.save();
    }

    res.json({ message: 'Reply logged' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/analytics/:campaignId', authenticateToken, async (req, res) => {
  try {
    const emails = await Email.find({ campaignId: req.params.campaignId });

    const summary = {
      total: emails.length,
      sent: emails.filter(e => e.sentAt).length,
      opened: emails.filter(e => e.opened).length,
      clicked: emails.filter(e => e.clicked).length,
      replied: emails.filter(e => e.replied).length,
      bounced: emails.filter(e => e.bounced).length,
      openRate: emails.length ? ((emails.filter(e => e.opened).length / emails.length) * 100).toFixed(2) : 0,
      clickRate: emails.length ? ((emails.filter(e => e.clicked).length / emails.length) * 100).toFixed(2) : 0,
      replyRate: emails.length ? ((emails.filter(e => e.replied).length / emails.length) * 100).toFixed(2) : 0
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
