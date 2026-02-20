import { Resources } from "@/app/types/allocation"

export function validateAllocation(
  allocation: Resources,
  available: Resources
) {
  const validated: any = {}

  for (const key in allocation) {
    validated[key] = Math.min(
      allocation[key as keyof Resources],
      available[key as keyof Resources]
    )
  }

  return validated
}