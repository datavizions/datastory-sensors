import { getColumns, mapCharts } from '../scripts/charts'
import _allRows from '$data/rows.json'
import _allCols from '$data/columns.json'

const colsMeta = Object.fromEntries(
  Object.entries(_allCols).map(([k, v]) => [
    k,
    { label: v.label, category: v.category, description: v.description }
  ])
)

class StoryFilter {
  filters = $state({})
  selectedPersonaId = $state(null)

  get filteredRows() {
    const f = this.filters
    const activeKeys = Object.keys(f).filter(k => f[k] != null)
    if (activeKeys.length === 0) return _allRows
    return _allRows.filter(row =>
      activeKeys.every(k => String(row[k]) === String(f[k]))
    )
  }

  get n() {
    const f = this.filters
    const activeKeys = Object.keys(f).filter(k => f[k] != null)
    if (activeKeys.length === 0) return _allRows.length
    return _allRows.filter(row =>
      activeKeys.every(k => String(row[k]) === String(f[k]))
    ).length
  }

  get allN() { return _allRows.length }

  get charts() {
    return mapCharts(getColumns(this.filteredRows, colsMeta))
  }

  selectPersona(id, personaFilters) {
    this.selectedPersonaId = id
    this.filters = personaFilters ? { ...personaFilters } : {}
  }

  toggleFilter(key, value) {
    const next = { ...this.filters }
    if (next[key] === value) {
      delete next[key]
    } else {
      next[key] = value
    }
    this.filters = next
  }

  clearFilters() {
    this.filters = {}
    this.selectedPersonaId = null
  }
}

export const storyFilter = new StoryFilter()