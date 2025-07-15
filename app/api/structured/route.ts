interface DATADT {
  topic: string;
  mood: string;
}

import { AI } from "@/lib/AI";
import { structurePrompt } from "@/utils/Prompt";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { topic, mood }: DATADT = await req.json();
  const prompt = structurePrompt(topic, mood);

  try {
    const result = await AI(prompt);
    return NextResponse.json({ result });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios/Groq error: ",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error: ", (error as Error).message);
    }

    return NextResponse.json(
      { error: "AI failed to respond" },
      { status: 500 }
    );
  }
}
