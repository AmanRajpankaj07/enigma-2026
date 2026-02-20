import { NextResponse } from "next/server"
import { buildPrompt } from "@/app/lib/buildPrompt"
import { validateAllocation } from "@/app/lib/validateAllocation"

export async function POST(req: Request) {
  try {
    const { incident, resources } = await req.json()

    console.log("Incident:", incident)
    console.log("Resources:", resources)

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing")
    }

    const prompt = buildPrompt(incident, resources)

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    const data = await response.json()

    console.log("Gemini raw response:", JSON.stringify(data, null, 2))

    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid Gemini response structure")
    }

    let text = data.candidates[0].content.parts[0].text

    // Clean markdown JSON if Gemini wraps it
    text = text.replace(/```json|```/g, "").trim()

    const parsed = JSON.parse(text)

    parsed.allocation_plan = validateAllocation(
      parsed.allocation_plan,
      resources
    )

    return NextResponse.json({
      allocation: parsed.allocation_plan
    })

  } catch (error: any) {
    console.error("AI Route Error:", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}