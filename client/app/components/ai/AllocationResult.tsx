"use client"

interface AllocationResultProps {
  result: any
}

export default function AllocationResult({ result }: AllocationResultProps) {
  if (!result?.allocation) return null

  return (
    <div className="mt-8 bg-gray-900 border border-gray-700 rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">
        Optimized Resource Allocation
      </h2>

      <div className="space-y-3">
        {Object.entries(result.allocation).map(([resource, sector]) => (
          <div
            key={resource}
            className="flex justify-between bg-gray-800 p-3 rounded-lg"
          >
            <span className="font-medium">{resource}</span>
            <span className="text-green-400">→ {sector as string}</span>
          </div>
        ))}
      </div>
    </div>
  )
}