// =================================================== //
//      User gives story → remix to unique versions    //
// =================================================== //

interface DATADT {
  story: string;
  type: string;
}

import { AI } from "@/lib/AI";
import { remixPrompt, structurePrompt } from "@/utils/Prompt";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { story, type }: DATADT = await req.json();
  const prompt = remixPrompt(story, type);

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
