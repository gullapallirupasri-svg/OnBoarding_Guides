const Groq = require('groq-sdk');
const axios = require('axios');

// Initialize Groq client
let groqClient = null;
const getGroqClient = () => {
  if (!groqClient && process.env.GROQ_API_KEY) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
};

/**
 * Generate content using Groq API (Primary LLM)
 */
const generateWithGroq = async (systemPrompt, userPrompt) => {
  const client = getGroqClient();
  if (!client) {
    throw new Error('Groq API key not configured');
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 8000,
      top_p: 0.9,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from Groq');
    }

    return { content, provider: 'groq' };
  } catch (error) {
    console.error('Groq API Error:', error.message);
    throw error;
  }
};

/**
 * Generate content using NVIDIA NIM API (Fallback LLM)
 */
const generateWithNvidia = async (systemPrompt, userPrompt) => {
  if (!process.env.NVIDIA_API_KEY) {
    throw new Error('NVIDIA API key not configured');
  }

  try {
    const response = await axios.post(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        model: 'meta/llama-3.1-405b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
        top_p: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 120000,
      }
    );

    const content = response.data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from NVIDIA');
    }

    return { content, provider: 'nvidia' };
  } catch (error) {
    console.error('NVIDIA API Error:', error.message);
    throw error;
  }
};

/**
 * Generate guide with automatic fallback
 * Tries Groq first, falls back to NVIDIA, returns graceful error if both fail
 */
const generateGuide = async (systemPrompt, userPrompt) => {
  // Try Groq first
  try {
    console.log('🤖 Attempting generation with Groq...');
    const result = await generateWithGroq(systemPrompt, userPrompt);
    console.log('✅ Successfully generated with Groq');
    return result;
  } catch (groqError) {
    console.warn('⚠️ Groq failed, falling back to NVIDIA NIM...', groqError.message);
  }

  // Fallback to NVIDIA NIM
  try {
    console.log('🤖 Attempting generation with NVIDIA NIM...');
    const result = await generateWithNvidia(systemPrompt, userPrompt);
    console.log('✅ Successfully generated with NVIDIA NIM');
    return result;
  } catch (nvidiaError) {
    console.error('❌ NVIDIA NIM also failed:', nvidiaError.message);
  }

  // Both failed
  throw new Error(
    'Both LLM providers (Groq and NVIDIA NIM) failed to generate content. Please check your API keys and try again later.'
  );
};

module.exports = {
  generateWithGroq,
  generateWithNvidia,
  generateGuide,
};
