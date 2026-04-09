const express = require('express');
const Guide = require('../models/Guide');
const auth = require('../middleware/auth');
const { generateGuide } = require('../services/llm');

const router = express.Router();

// @route   GET /api/guides
// @desc    Get all guides for current user (with search/filter)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { search, department, sort = '-createdAt', page = 1, limit = 20 } = req.query;

    const query = { userId: req.user._id };

    // Search by text
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by department
    if (department) {
      query.department = { $regex: department, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Guide.countDocuments(query);
    const guides = await Guide.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content -chatHistory'); // Exclude heavy fields from list

    res.json({
      guides,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Get guides error:', error);
    res.status(500).json({ message: 'Server error while fetching guides.' });
  }
});

// @route   GET /api/guides/stats
// @desc    Get guide stats for dashboard
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const totalGuides = await Guide.countDocuments({ userId: req.user._id });
    const recentGuides = await Guide.find({ userId: req.user._id })
      .sort('-createdAt')
      .limit(5)
      .select('title role department createdAt slug');

    const departmentStats = await Guide.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      totalGuides,
      recentGuides,
      departmentStats,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error while fetching stats.' });
  }
});

// @route   GET /api/guides/manager/overview
// @desc    Get all guides with checklist progress for manager dashboard
// @access  Private
router.get('/manager/overview', auth, async (req, res) => {
  try {
    const guides = await Guide.find({ userId: req.user._id })
      .sort('-createdAt')
      .select('title role department assignedTo checklist createdAt slug companyName');

    const overview = guides.map((guide) => {
      const total = guide.checklist.length;
      const completed = guide.checklist.filter((c) => c.status === 'complete').length;
      const inProgress = guide.checklist.filter((c) => c.status === 'in_progress').length;
      const notStarted = guide.checklist.filter((c) => c.status === 'not_started').length;

      return {
        _id: guide._id,
        title: guide.title,
        role: guide.role,
        department: guide.department,
        companyName: guide.companyName,
        assignedTo: guide.assignedTo,
        slug: guide.slug,
        createdAt: guide.createdAt,
        progress: {
          total,
          completed,
          inProgress,
          notStarted,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        },
      };
    });

    res.json({ overview });
  } catch (error) {
    console.error('Manager overview error:', error);
    res.status(500).json({ message: 'Server error while fetching manager overview.' });
  }
});

// @route   GET /api/guides/shared/:slug
// @desc    Get a public guide by slug (no auth required)
// @access  Public
router.get('/shared/:slug', async (req, res) => {
  try {
    const guide = await Guide.findOne({
      slug: req.params.slug,
      isPublic: true,
    }).populate('userId', 'name companyName');

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found or is not public.' });
    }

    res.json({ guide });
  } catch (error) {
    console.error('Get shared guide error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   GET /api/guides/:id
// @desc    Get a single guide
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const guide = await Guide.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found.' });
    }

    res.json({ guide });
  } catch (error) {
    console.error('Get guide error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   PUT /api/guides/:id
// @desc    Update guide metadata and/or content
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, isPublic, content, assignedTo } = req.body;
    const update = {};
    if (title !== undefined) update.title = title;
    if (isPublic !== undefined) update.isPublic = isPublic;
    if (content !== undefined) update.content = content;
    if (assignedTo !== undefined) update.assignedTo = assignedTo;

    const guide = await Guide.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      update,
      { new: true, runValidators: true }
    );

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found.' });
    }

    res.json({ message: 'Guide updated successfully.', guide });
  } catch (error) {
    console.error('Update guide error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   PATCH /api/guides/:id/toggle-public
// @desc    Toggle guide public/private
// @access  Private
router.patch('/:id/toggle-public', auth, async (req, res) => {
  try {
    const guide = await Guide.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found.' });
    }

    guide.isPublic = !guide.isPublic;
    await guide.save();

    res.json({
      message: guide.isPublic ? 'Guide is now public.' : 'Guide is now private.',
      guide,
    });
  } catch (error) {
    console.error('Toggle public error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   PATCH /api/guides/:id/checklist
// @desc    Update a checklist item status
// @access  Private
router.patch('/:id/checklist', auth, async (req, res) => {
  try {
    const { itemId, status } = req.body;

    if (!itemId || !status) {
      return res.status(400).json({ message: 'itemId and status are required.' });
    }

    if (!['not_started', 'in_progress', 'complete'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const guide = await Guide.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found.' });
    }

    const item = guide.checklist.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Checklist item not found.' });
    }

    item.status = status;
    item.completedAt = status === 'complete' ? new Date() : null;

    await guide.save();

    const total = guide.checklist.length;
    const completed = guide.checklist.filter((c) => c.status === 'complete').length;

    res.json({
      message: 'Checklist updated.',
      checklist: guide.checklist,
      progress: {
        total,
        completed,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      },
    });
  } catch (error) {
    console.error('Update checklist error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   POST /api/guides/:id/checklist/generate
// @desc    Auto-generate checklist from guide content
// @access  Private
router.post('/:id/checklist/generate', auth, async (req, res) => {
  try {
    const guide = await Guide.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found.' });
    }

    // Parse H2 headings from markdown content
    const lines = guide.content.split('\n');
    const sections = [];
    const dueMappings = {
      'first day': 'day1',
      'day 1': 'day1',
      'day one': 'day1',
      'day 3': 'day3',
      'day three': 'day3',
      'first week': 'week1',
      'week 1': 'week1',
      'week one': 'week1',
      'second week': 'week2',
      'week 2': 'week2',
      'first month': 'month1',
      'month 1': 'month1',
      'second month': 'month2',
      'month 2': 'month2',
      'third month': 'month3',
      'month 3': 'month3',
      'welcome': 'day1',
      'setup': 'day1',
      'getting started': 'day1',
      'tools': 'day1',
      'team': 'day3',
      'meet': 'day3',
      'introduction': 'day1',
      'culture': 'week1',
      'policies': 'week1',
      'resources': 'week1',
      'review': 'month1',
      'goals': 'month1',
      'development': 'month2',
      'growth': 'month3',
    };

    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)/);
      if (h2Match) {
        const title = h2Match[1].trim();
        const titleLower = title.toLowerCase();

        // Determine due category from title keywords
        let dueCategory = 'week1'; // default
        for (const [keyword, category] of Object.entries(dueMappings)) {
          if (titleLower.includes(keyword)) {
            dueCategory = category;
            break;
          }
        }

        sections.push({
          sectionTitle: title,
          status: 'not_started',
          dueCategory,
          completedAt: null,
        });
      }
    }

    guide.checklist = sections;
    await guide.save();

    res.json({
      message: `Generated ${sections.length} checklist items.`,
      checklist: guide.checklist,
    });
  } catch (error) {
    console.error('Generate checklist error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   POST /api/guides/:id/chat
// @desc    Chat with AI about a specific guide
// @access  Private
router.post('/:id/chat', auth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required.' });
    }

    const guide = await Guide.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found.' });
    }

    // Build system prompt with guide context
    const systemPrompt = `You are a helpful onboarding assistant. You have access to the following onboarding guide and should answer questions based on its content. Be concise, helpful, and reference specific sections when relevant.

ONBOARDING GUIDE TITLE: ${guide.title}
COMPANY: ${guide.companyName || 'Not specified'}
ROLE: ${guide.role || 'Not specified'}
DEPARTMENT: ${guide.department || 'Not specified'}

FULL GUIDE CONTENT:
${guide.content}

---
Answer the user's question based on the guide above. If the answer isn't in the guide, say so and provide general onboarding advice. Keep responses concise (2-3 paragraphs max).`;

    // Build conversation history for context (last 10 messages)
    const recentHistory = guide.chatHistory.slice(-10).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add current message
    const messages = [
      { role: 'system', content: systemPrompt },
      ...recentHistory,
      { role: 'user', content: message },
    ];

    // Generate response using LLM with fallback
    const result = await generateGuide(
      systemPrompt,
      recentHistory.length > 0
        ? recentHistory.map((m) => `${m.role}: ${m.content}`).join('\n') + `\nuser: ${message}`
        : message
    );

    // Save both messages to history
    guide.chatHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: result.content }
    );

    // Keep only last 50 messages to prevent bloat
    if (guide.chatHistory.length > 50) {
      guide.chatHistory = guide.chatHistory.slice(-50);
    }

    await guide.save();

    res.json({
      response: result.content,
      provider: result.provider,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Failed to get AI response. Please try again.' });
  }
});

// @route   DELETE /api/guides/:id
// @desc    Delete a guide
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const guide = await Guide.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found.' });
    }

    res.json({ message: 'Guide deleted successfully.' });
  } catch (error) {
    console.error('Delete guide error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
