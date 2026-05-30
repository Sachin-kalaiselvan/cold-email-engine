const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.post('/company', authenticateToken, async (req, res) => {
  try {
    const { companyName, companyWebsite, founderName } = req.body;

    const mockResearch = {
      companyName,
      companyWebsite,
      companyInfo: {
        description: `${companyName} is a technology company`,
        website: companyWebsite
      },
      recentNews: [],
      founderProfile: {
        name: founderName,
        linkedinProfile: ''
      },
      researchedAt: new Date()
    };

    res.json({
      message: 'Research completed',
      data: mockResearch
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/milestones', authenticateToken, async (req, res) => {
  try {
    const { companyName, companyWebsite, founderEmail } = req.body;

    res.json({
      message: 'Milestones search started',
      milestones: []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/bulk', authenticateToken, async (req, res) => {
  try {
    const { companies } = req.body;

    const results = companies.map(company => ({
      ...company,
      success: true
    }));

    res.json({
      message: 'Bulk research completed',
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/person', authenticateToken, async (req, res) => {
  try {
    const { founderName, companyName } = req.body;

    res.json({
      message: 'Person info retrieved',
      data: {
        name: founderName,
        linkedinProfile: ''
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
