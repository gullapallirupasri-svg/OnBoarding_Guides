const mongoose = require('mongoose');
const crypto = require('crypto');

const checklistItemSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'complete'],
    default: 'not_started',
  },
  dueCategory: {
    type: String,
    enum: ['day1', 'day3', 'week1', 'week2', 'month1', 'month2', 'month3'],
    default: 'week1',
  },
  completedAt: { type: Date, default: null },
}, { _id: true });

const chatMessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { _id: true });

const guideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    // Form data fields
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    industry: {
      type: String,
      trim: true,
      default: '',
    },
    companySize: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      trim: true,
      default: '',
    },
    department: {
      type: String,
      trim: true,
      default: '',
    },
    seniorityLevel: {
      type: String,
      enum: ['intern', 'junior', 'mid', 'senior', 'lead', ''],
      default: '',
    },
    workMode: {
      type: String,
      enum: ['remote', 'hybrid', 'onsite', ''],
      default: '',
    },
    tools: {
      type: [String],
      default: [],
    },
    platforms: {
      type: [String],
      default: [],
    },
    cultureNotes: {
      type: String,
      default: '',
    },
    policies: {
      type: String,
      default: '',
    },
    dressCode: {
      type: String,
      default: '',
    },
    workingHours: {
      type: String,
      default: '',
    },
    customInstructions: {
      type: String,
      default: '',
    },
    tone: {
      type: String,
      enum: ['professional', 'friendly', 'casual', 'corporate'],
      default: 'professional',
    },
    guideLength: {
      type: String,
      enum: ['concise', 'standard', 'comprehensive'],
      default: 'standard',
    },
    // Generated content
    content: {
      type: String,
      required: [true, 'Guide content is required'],
    },
    // Sharing
    isPublic: {
      type: Boolean,
      default: false,
    },
    llmProvider: {
      type: String,
      enum: ['groq', 'nvidia', 'unknown'],
      default: 'unknown',
    },
    // ===== NEW: Checklist tracking =====
    checklist: {
      type: [checklistItemSchema],
      default: [],
    },
    assignedTo: {
      type: String,
      trim: true,
      default: '',
    },
    // ===== NEW: Chat history =====
    chatHistory: {
      type: [chatMessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: checklist progress percentage
guideSchema.virtual('checklistProgress').get(function () {
  if (!this.checklist || this.checklist.length === 0) return 0;
  const completed = this.checklist.filter((item) => item.status === 'complete').length;
  return Math.round((completed / this.checklist.length) * 100);
});

// Generate unique slug before saving
guideSchema.pre('save', function (next) {
  if (!this.slug) {
    const base = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
    const uniqueId = crypto.randomBytes(4).toString('hex');
    this.slug = `${base}-${uniqueId}`;
  }
  next();
});

// Index for search
guideSchema.index({ title: 'text', role: 'text', department: 'text', companyName: 'text' });

module.exports = mongoose.model('Guide', guideSchema);
