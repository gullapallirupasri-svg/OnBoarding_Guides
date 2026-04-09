/**
 * Build the system prompt for the LLM
 */
const buildSystemPrompt = (tone, guideLength) => {
  const toneMap = {
    professional: 'Use a professional, formal, and polished tone throughout. Be authoritative yet welcoming.',
    friendly: 'Use a warm, friendly, and approachable tone. Be conversational and encouraging while remaining informative.',
    casual: 'Use a casual, relaxed tone. Feel free to use contractions and a conversational style. Be personable and fun.',
    corporate: 'Use a corporate, executive-level tone. Be formal, structured, and business-oriented with precise language.',
  };

  const lengthMap = {
    concise: 'Keep the guide concise and to-the-point. Aim for approximately 1500-2000 words. Focus on essentials only.',
    standard: 'Create a standard-length guide of approximately 3000-4000 words. Balance detail with readability.',
    comprehensive: 'Create a comprehensive, detailed guide of approximately 5000-7000 words. Cover every topic in depth with examples and explanations.',
  };

  return `You are an expert onboarding specialist and technical writer with years of experience creating world-class onboarding documentation for top companies. Your task is to generate a comprehensive, well-structured onboarding guide in Markdown format.

TONE INSTRUCTIONS:
${toneMap[tone] || toneMap.professional}

LENGTH INSTRUCTIONS:
${lengthMap[guideLength] || lengthMap.standard}

FORMAT REQUIREMENTS:
- Use proper Markdown formatting with headers (##, ###), bullet points, numbered lists, tables, and emphasis.
- Start with a warm welcome section.
- Organize content into clear, logical sections.
- Include actionable checklists where appropriate (use - [ ] syntax).
- Add practical tips, best practices, and pro tips in blockquotes.
- Include a "First Day", "First Week", and "First Month" timeline section.
- End with helpful resources and key contacts section.
- Make the guide feel personalized to the specific role, company, and context provided.
- Do NOT include any meta-commentary or notes about the generation process.
- Output ONLY the Markdown content of the guide. Do not wrap it in code fences.`;
};

/**
 * Build the user prompt from form data
 */
const buildUserPrompt = (formData) => {
  const {
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
  } = formData;

  let prompt = `Generate an onboarding guide with the following details:\n\n`;

  // Basic Info
  prompt += `## Company Information\n`;
  if (companyName) prompt += `- **Company/Organization:** ${companyName}\n`;
  if (industry) prompt += `- **Industry:** ${industry}\n`;
  if (companySize) prompt += `- **Company Size:** ${companySize}\n`;
  prompt += `\n`;

  // Role Details
  prompt += `## Role Details\n`;
  if (role) prompt += `- **Role/Position:** ${role}\n`;
  if (department) prompt += `- **Department:** ${department}\n`;
  if (seniorityLevel) prompt += `- **Seniority Level:** ${seniorityLevel}\n`;
  if (workMode) prompt += `- **Work Mode:** ${workMode}\n`;
  prompt += `\n`;

  // Tools & Tech
  if ((tools && tools.length > 0) || (platforms && platforms.length > 0)) {
    prompt += `## Tools & Technologies\n`;
    if (tools && tools.length > 0) {
      prompt += `- **Tools/Technologies Used:** ${tools.join(', ')}\n`;
    }
    if (platforms && platforms.length > 0) {
      prompt += `- **Communication Platforms:** ${platforms.join(', ')}\n`;
    }
    prompt += `\n`;
  }

  // Culture & Policies
  if (cultureNotes || policies || dressCode || workingHours) {
    prompt += `## Culture & Policies\n`;
    if (cultureNotes) prompt += `- **Company Culture:** ${cultureNotes}\n`;
    if (policies) prompt += `- **Key Policies:** ${policies}\n`;
    if (dressCode) prompt += `- **Dress Code:** ${dressCode}\n`;
    if (workingHours) prompt += `- **Working Hours:** ${workingHours}\n`;
    prompt += `\n`;
  }

  // Custom Instructions
  if (customInstructions) {
    prompt += `## Additional Instructions\n`;
    prompt += `${customInstructions}\n\n`;
  }

  prompt += `---\n\nPlease generate the complete onboarding guide now based on all the above information. Make it practical, actionable, and welcoming.`;

  return prompt;
};

/**
 * Generate guide title from form data
 */
const generateTitle = (formData) => {
  const parts = [];
  if (formData.companyName) parts.push(formData.companyName);
  if (formData.role) parts.push(formData.role);
  if (formData.department) parts.push(`(${formData.department})`);
  
  if (parts.length === 0) return 'Onboarding Guide';
  return `${parts.join(' - ')} Onboarding Guide`;
};

module.exports = {
  buildSystemPrompt,
  buildUserPrompt,
  generateTitle,
};
