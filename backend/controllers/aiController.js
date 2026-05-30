const OpenAI = require('openai');

const getOpenAIClient = () => {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

// Helper to call OpenAI
const callAI = async (prompt) => {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });
    return response.choices[0].message.content.trim();
  } catch (err) {
    throw new Error('AI service unavailable: ' + err.message);
  }
};

// @desc   Generate professional summary
// @route  POST /api/ai/generate-summary
const generateSummary = async (req, res) => {
  try {
    const { skills, experience, education, projects, name } = req.body;

    const prompt = `Generate a professional ATS-friendly resume summary (3-4 sentences) for ${name || 'a candidate'} with the following profile:
Skills: ${skills?.join(', ') || 'Not provided'}
Experience: ${experience?.map(e => `${e.role} at ${e.company}`).join(', ') || 'Fresher'}
Education: ${education?.map(e => `${e.degree} in ${e.branch} from ${e.college}`).join(', ') || 'Not provided'}
Projects: ${projects?.map(p => p.title).join(', ') || 'Not provided'}

Write a compelling, professional summary that highlights key strengths. Keep it concise, impactful, and ATS-optimized. Return only the summary text, no labels.`;

    const summary = await callAI(prompt);
    res.json({ success: true, data: summary });
  } catch (err) {
    // Fallback summary if AI fails
    const { name, skills } = req.body;
    const fallback = `${name || 'A motivated professional'} with expertise in ${skills?.slice(0, 3).join(', ') || 'software development'}. Passionate about building innovative solutions and delivering high-quality results. Quick learner with strong analytical skills and ability to work effectively in collaborative environments. Committed to continuous learning and professional growth.`;
    res.json({ success: true, data: fallback, fallback: true });
  }
};

// @desc   Generate career objective
// @route  POST /api/ai/generate-objective
const generateObjective = async (req, res) => {
  try {
    const { skills, education, name } = req.body;

    const prompt = `Generate a concise career objective (2-3 sentences) for a fresher/entry-level candidate:
Name: ${name || 'Candidate'}
Skills: ${skills?.join(', ') || 'Not provided'}
Education: ${education?.map(e => `${e.degree} in ${e.branch}`).join(', ') || 'Not provided'}

Write a professional, enthusiastic career objective suitable for a fresher. Return only the objective text.`;

    const objective = await callAI(prompt);
    res.json({ success: true, data: objective });
  } catch (err) {
    const { skills, education } = req.body;
    const degree = education?.[0]?.degree || 'Computer Science';
    const fallback = `Motivated ${degree} graduate seeking an entry-level position to leverage my skills in ${skills?.slice(0, 2).join(' and ') || 'software development'}. Eager to contribute to a dynamic team while expanding my technical expertise and growing professionally. Committed to delivering quality work and making meaningful contributions to organizational goals.`;
    res.json({ success: true, data: fallback, fallback: true });
  }
};

// @desc   Analyze resume and give suggestions
// @route  POST /api/ai/analyze-resume
const analyzeResume = async (req, res) => {
  try {
    const { resumeData } = req.body;
    const { personalInfo, skills, experience, projects, education } = resumeData;

    const prompt = `Analyze this resume and provide actionable improvement suggestions:
Summary: ${personalInfo?.summary || 'Missing'}
Skills: ${skills?.join(', ') || 'Missing'}
Experience entries: ${experience?.length || 0}
Projects: ${projects?.length || 0}
Education: ${education?.length || 0}

Provide a JSON response with:
{
  "atsScore": <number 0-100>,
  "strengths": [<3 strengths>],
  "improvements": [<3 specific improvements>],
  "missingSkills": [<3 relevant skills to add>],
  "tips": [<2 ATS tips>]
}
Return only valid JSON.`;

    const result = await callAI(prompt);
    let parsed;
    try {
      parsed = JSON.parse(result.replace(/```json|```/g, '').trim());
    } catch {
      parsed = {
        atsScore: 65,
        strengths: ['Has relevant skills listed', 'Project experience included', 'Education section complete'],
        improvements: ['Add more quantified achievements', 'Expand project descriptions', 'Include more relevant keywords'],
        missingSkills: ['Docker', 'AWS', 'CI/CD'],
        tips: ['Use action verbs to start bullet points', 'Include keywords from job descriptions']
      };
    }
    res.json({ success: true, data: parsed });
  } catch (err) {
    res.json({
      success: true,
      data: {
        atsScore: 60,
        strengths: ['Good structure', 'Skills section present', 'Contact info complete'],
        improvements: ['Add quantified achievements', 'Improve project descriptions', 'Add more relevant keywords'],
        missingSkills: ['Docker', 'AWS', 'REST APIs'],
        tips: ['Use industry keywords', 'Keep resume to one page for freshers']
      },
      fallback: true
    });
  }
};

module.exports = { generateSummary, generateObjective, analyzeResume };
