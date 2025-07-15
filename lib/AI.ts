import axios from "axios";

const endpoint = "https://api.groq.com/openai/v1/chat/completions";
const model = "mixtral-8x7b-32768";
const apikey = process.env.GITHUB_TOKEN;

if (!apikey) {
  throw new Error("Missing GITHUB_TOKEN in env variables.");
}

export async function AI(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      endpoint,
      {
        model,
        messages: [{ role: "user", contents: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apikey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;
    if (!content) {
      throw new Error("AI resonse content is null or empty");
    }

    return content;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Groq API error:", error.response?.data || error.message);
    } else {
        console.error("Unknown error: ", (error as Error).message)
    }
    throw new Error("Failed to fetch response from Groq API");
  }
}
