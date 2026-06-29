declare module '$runes/storyFilter.svelte.js' {
  export type PersonaFilters = Record<string, string>

  export interface StoryFilterCharts {
    [key: string]: any
  }

  export interface StoryFilter {
    charts: StoryFilterCharts
    n: number
    selectedPersonaId: string | null
    selectPersona: (id: string, filters: PersonaFilters) => void
    toggleFilter: (key: string, value: string) => void
    clearFilters: () => void
  }

  export const storyFilter: StoryFilter
}
