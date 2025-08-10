// ====================================================== //
//   Suggest trending content from web + create similar   //
// =======================================================//

interface DATADT {
  topic: string;
  mood: string;
}

import { AI } from "@/lib/AI";
import { fetchTrendingShorts } from "@/utils/scraper";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { keyword } = await req.json();

    if(!keyword) {
        return NextResponse.json(
            {error: "Keyword is required"},
            {status: 400}
        );
    }

    const shortsData = await fetchTrendingShorts(keyword);
    const shortsText = JSON.stringify(shortsData, null, 2);
    const result = await AI(shortsText);


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
