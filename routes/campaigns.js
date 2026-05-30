const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, brand, targetList, templateId, schedule } = req.body;

    const campaign = new Campaign({
      userId: req.userId,
      name,
      description,
      brand: brand || 'ingredient-list',
      targetList,
      templateId,
      schedule,
      status: 'draft',
      sentCount: 0,
      openCount: 0,
      clickCount: 0,
      replyCount: 0,
      createdAt: new Date()
    });

    await campaign.save();
    res.json({ message: 'Campaign created', campaign });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    if (campaign.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    if (campaign.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    Object.assign(campaign, req.body);
    await campaign.save();
    res.json({ message: 'Campaign updated', campaign });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/launch', authenticateToken, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    if (campaign.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    campaign.status = 'active';
    campaign.launchedAt = new Date();
    await campaign.save();

    res.json({ message: 'Campaign launched', campaign });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/pause', authenticateToken, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    if (campaign.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    campaign.status = 'paused';
    await campaign.save();
    res.json({ message: 'Campaign paused', campaign });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
