export interface Incident {
  type: string
  severity: string
  location: string
  affected_population: number
  infrastructure_damage: string
  weather_forecast: string
}

export interface Resources {
  ambulances: number
  fire_trucks: number
  rescue_boats: number
  medical_teams: number
  police_units: number
  relief_kits: number
  nearby_shelters: number
}

export interface AllocationResponse {
  priority_level: string
  allocation_plan: Resources
  shelter_strategy: string
  reasoning: string
}