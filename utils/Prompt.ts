export const ideaPrompt = (category: string) => `
You are a viral video content strategist. Give me a short-form video idea in the ${category} category that:
- is trending or newly explored
- includes a catchy title
- has a script (under 60s)
- includes 3 scene breakdowns
- suggests a background music style or sound effect
- includes 3 hashtags
`;

export const structurePrompt = (topic: string, mood: string) => `
Take the topic: "${topic}" and create a short-form video script in a ${mood} tone.

Provide:
- Hook line (first 3 seconds)
- Main script body
- Suggested background music type
- Suggested caption
- 3 Hashtags
`;

export const remixPrompt = (story: string, type: string) => `
Remix this story with a ${type} twist:

${story}

Make it under 60s, with a hook and emotional turn.
`;
