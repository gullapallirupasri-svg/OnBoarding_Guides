const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { generateGuide } = require('../services/llm');
const { buildSystemPrompt, buildUserPrompt, generateTitle } = require('../utils/promptBuilder');
const Guide = require('../models/Guide');

const router = express.Router();

// @route   POST /api/generate
// @desc    Generate an onboarding guide using LLM
// @access  Private
router.post(
  '/',
  auth,
  [
    body('companyName').optional().trim(),
    body('role').optional().trim(),
    body('tone')
      .optional()
      .isIn(['professional', 'friendly', 'casual', 'corporate'])
      .withMessage('Invalid tone selection'),
    body('guideLength')
      .optional()
      .isIn(['concise', 'standard', 'comprehensive'])
      .withMessage('Invalid guide length'),
  ],
  validate,
  async (req, res) => {
    try {
      const formData = {
        companyName: req.body.companyName || '',
        industry: req.body.industry || '',
        companySize: req.body.companySize || '',
        role: req.body.role || '',
        department: req.body.department || '',
        seniorityLevel: req.body.seniorityLevel || '',
        workMode: req.body.workMode || '',
        tools: req.body.tools || [],
        platforms: req.body.platforms || [],
        cultureNotes: req.body.cultureNotes || '',
        policies: req.body.policies || '',
        dressCode: req.body.dressCode || '',
        workingHours: req.body.workingHours || '',
        customInstructions: req.body.customInstructions || '',
        tone: req.body.tone || 'professional',
        guideLength: req.body.guideLength || 'standard',
      };

      const systemPrompt = buildSystemPrompt(formData.tone, formData.guideLength);
      const userPrompt = buildUserPrompt(formData);

      console.log(`📝 Generating guide for: ${formData.companyName || 'Unknown'} — ${formData.role || 'Unknown Role'}`);

      const result = await generateGuide(systemPrompt, userPrompt);

      const title = generateTitle(formData);

      res.json({
        message: 'Guide generated successfully!',
        title,
        content: result.content,
        provider: result.provider,
        formData,
      });
    } catch (error) {
      console.error('Generate error:', error);
      res.status(500).json({
        message: error.message || 'Failed to generate guide. Please try again.',
      });
    }
  }
);

// @route   POST /api/generate/save
// @desc    Save a generated guide to database
// @access  Private
router.post(
  '/save',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Guide content is required'),
  ],
  validate,
  async (req, res) => {
    try {
      const {
        title,
        content,
        provider,
        companyName,
        industry,
        companySize,
        role,
        department,
        seniorityLevel,
        workMode,
        tools,
        platforms,
        cultureNotes,
        policies,
        dressCode,
        workingHours,
        customInstructions,
        tone,
        guideLength,
      } = req.body;

      const guide = new Guide({
        userId: req.user._id,
        title,
        content,
        llmProvider: provider || 'unknown',
        companyName: companyName || '',
        industry: industry || '',
        companySize: companySize || '',
        role: role || '',
        department: department || '',
        seniorityLevel: seniorityLevel || '',
        workMode: workMode || '',
        tools: tools || [],
        platforms: platforms || [],
        cultureNotes: cultureNotes || '',
        policies: policies || '',
        dressCode: dressCode || '',
        workingHours: workingHours || '',
        customInstructions: customInstructions || '',
        tone: tone || 'professional',
        guideLength: guideLength || 'standard',
      });

      await guide.save();

      res.status(201).json({
        message: 'Guide saved successfully!',
        guide,
      });
    } catch (error) {
      console.error('Save guide error:', error);
      res.status(500).json({ message: 'Server error while saving guide.' });
    }
  }
);

// @route   POST /api/generate/section
// @desc    Regenerate a single section of a guide
// @access  Private
router.post('/section', auth, async (req, res) => {
  try {
    const { sectionTitle, sectionContent, guideContext, tone } = req.body;

    if (!sectionTitle) {
      return res.status(400).json({ message: 'sectionTitle is required.' });
    }

    const systemPrompt = `You are an expert onboarding specialist and technical writer. You need to rewrite/regenerate a single section of an onboarding guide. Keep the same topic and heading but create fresh, improved content.

TONE: ${tone || 'professional'}

RULES:
- Output ONLY the section content (no main heading, just sub-content under the section)
- Keep the same markdown formatting style
- Make it practical and actionable
- Do NOT include any meta-commentary
- Do NOT include the section heading itself (## heading) — just the content below it`;

    const userPrompt = `Regenerate this section of an onboarding guide:

SECTION TITLE: ${sectionTitle}

CURRENT CONTENT:
${sectionContent || 'No existing content'}

GUIDE CONTEXT (for reference):
${guideContext ? guideContext.substring(0, 2000) : 'No additional context'}

Please rewrite the section content with fresh, improved text.`;

    const result = await generateGuide(systemPrompt, userPrompt);

    res.json({
      message: 'Section regenerated successfully!',
      sectionTitle,
      content: result.content,
      provider: result.provider,
    });
  } catch (error) {
    console.error('Section regenerate error:', error);
    res.status(500).json({ message: 'Failed to regenerate section.' });
  }
});

module.exports = router;
