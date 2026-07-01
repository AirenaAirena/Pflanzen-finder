const API_KEY = import.meta.env.VITE_PERENUAL_API_KEY

export async function searchPlants(query, { signal } = {}) {
  try {
    const res = await fetch(
      `https://perenual.com/api/v2/species-list?key=${API_KEY}&q=${encodeURIComponent(query)}`,
      { signal },
    )

    if (res.status === 429) {
      console.warn('Rate limit reached')
      return []
    }
    if (!res.ok) {
      console.warn(`API error: ${res.status}`)
      throw new Error('API request failed')
    }

    const data = await res.json()

    if (!data?.data) return []

    return data.data.map((plant) => ({
      id: plant.id,
      name: plant.common_name || plant.scientific_name?.[0] || 'Unknown plant',
      genus: plant.scientific_name?.[0] || '',
      family: plant.family || '',
      description: 'Description is not available.',
      image:
        plant.default_image?.medium_url ||
        plant.default_image?.original_url ||
        '',
    }))
  } catch (e) {
    if (e.name === 'AbortError') return []
    console.error('API error:', e)
    throw e
  }
}
// export async function searchPlants(query, { signal } = {}) {
//   await new Promise((r) => setTimeout(r, 800))
//   return [
//     {
//       id: 1,
//       name: 'Test Rose',
//       genus: 'Rosa',
//       family: 'Rosaceae',
//       description: 'Description is not available.',
//       image: 'https://via.placeholder.com/300',
//     },
//     {
//       id: 2,
//       name: 'Test Cactus',
//       genus: 'Cactaceae',
//       family: 'Cactaceae',
//       description: 'Description is not available.',
//       image: 'https://via.placeholder.com/300',
//     },
//   ]
// }
