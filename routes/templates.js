const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, subject, htmlContent, brand, variables } = req.body;

    const template = new Template({
      userId: req.userId,
      name,
      subject,
      htmlContent,
      brand: brand || 'ingredient-list',
      variables: variables || [],
      createdAt: new Date()
    });

    await template.save();
    res.json({ message: 'Template created', template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const templates = await Template.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    if (template.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    if (template.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    Object.assign(template, req.body);
    await template.save();
    res.json({ message: 'Template updated', template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    if (template.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Template.deleteOne({ _id: req.params.id });
    res.json({ message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/render', authenticateToken, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const { data } = req.body;
    let htmlContent = template.htmlContent;
    let subject = template.subject;

    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      htmlContent = htmlContent.replace(regex, value || '');
      subject = subject.replace(regex, value || '');
    }

    res.json({
      subject,
      htmlContent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
