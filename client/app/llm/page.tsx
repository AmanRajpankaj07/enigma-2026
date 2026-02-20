"use client"

import { useState } from "react"
import IncidentForm from "@/app/components/ai/IncidentForm"
import AllocationResult from "@/app/components/ai/AllocationResult"

export default function Dashboard() {
  const [result, setResult] = useState(null)

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        AI Resource Allocation Engine
      </h1>

      <IncidentForm onResult={setResult} />
      <AllocationResult result={result} />
    </main>
  )
}