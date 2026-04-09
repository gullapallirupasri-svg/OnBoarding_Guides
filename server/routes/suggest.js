const express = require('express');
const auth = require('../middleware/auth');
const { generateWithGroq } = require('../services/llm');

const router = express.Router();

// @route   POST /api/suggest
// @desc    Get AI-powered form suggestions
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { field, value, context } = req.body;

    if (!field || !value) {
      return res.status(400).json({ message: 'field and value are required.' });
    }

    let prompt = '';

    switch (field) {
      case 'industry':
        prompt = `Given the industry "${value}", suggest in JSON format:
{"companySizes": ["list of 2-3 typical company size ranges"], "departments": ["list of 3-5 common departments"]}
Only return the JSON, nothing else.`;
        break;

      case 'tools':
        prompt = `Given that someone uses the tool/technology "${value}"${context?.tools?.length ? ` along with ${context.tools.join(', ')}` : ''}, suggest 5 related tools or technologies they likely also use. Return as JSON:
{"suggestions": ["tool1", "tool2", "tool3", "tool4", "tool5"]}
Only return the JSON, nothing else.`;
        break;

      case 'workMode':
        prompt = `Given a "${value}" work mode${context?.industry ? ` in the ${context.industry} industry` : ''}, suggest company culture notes. Return as JSON:
{"suggestions": ["culture note 1", "culture note 2", "culture note 3"]}
Keep each note under 15 words. Only return the JSON, nothing else.`;
        break;

      default:
        return res.status(400).json({ message: 'Unsupported field for suggestions.' });
    }

    // Use the shared Groq service with low token system prompt
    const systemPrompt = 'You are a helpful assistant that returns only valid JSON. No markdown, no explanation, no code fences, just the raw JSON object.';

    const result = await generateWithGroq(systemPrompt, prompt);
    const responseText = result.content || '{}';

    // Parse JSON safely — strip markdown fences if LLM wraps them
    let suggestions;
    try {
      const cleaned = responseText.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      suggestions = JSON.parse(cleaned);
    } catch {
      console.warn('Failed to parse suggestion JSON:', responseText);
      suggestions = { suggestions: [] };
    }

    res.json({ field, suggestions });
  } catch (error) {
    console.error('Suggestion error:', error.message);
    // Don't fail hard on suggestions — they're optional enhancement
    res.json({ field: req.body.field, suggestions: {} });
  }
});

module.exports = router;
