import { Incident, Resources } from "@/app/types/allocation"

export function buildPrompt(incident: Incident, resources: Resources) {
  return `
You are an expert disaster management strategist.

Incident Details:
${JSON.stringify(incident, null, 2)}

Available Resources:
${JSON.stringify(resources, null, 2)}

Instructions:
1. Prioritize life-saving measures.
2. Allocate only from available resources.
3. Be realistic and strategic.
4. Return STRICT JSON in this format:

{
  "priority_level": "",
  "allocation_plan": {
    "ambulances": number,
    "fire_trucks": number,
    "rescue_boats": number,
    "medical_teams": number,
    "police_units": number,
    "relief_kits": number,
    "nearby_shelters": number
  },
  "shelter_strategy": "",
  "reasoning": ""
}
`
}