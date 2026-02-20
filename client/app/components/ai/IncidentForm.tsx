"use client"

import { useState } from "react"

export default function IncidentForm({ onResult }: any) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    const incident = {
      type: "Flood",
      severity: "High",
      location: "Zone 4",
      affected_population: 2500,
      infrastructure_damage: "Severe",
      weather_forecast: "Heavy rain next 24 hours"
    }

    const resources = {
      ambulances: 8,
      fire_trucks: 4,
      rescue_boats: 6,
      medical_teams: 5,
      police_units: 10,
      relief_kits: 1200,
      nearby_shelters: 3
    }

    const res = await fetch("/api/ai-allocation", {
      method: "POST",
      body: JSON.stringify({ incident, resources })
    })

    const data = await res.json()

    onResult(data)
    setLoading(false)
  }

  return (
    <button
      onClick={handleSubmit}
      className="px-6 py-3 bg-blue-600 rounded-xl text-white"
    >
      {loading ? "Analyzing..." : "Generate AI Allocation"}
    </button>
  )
}