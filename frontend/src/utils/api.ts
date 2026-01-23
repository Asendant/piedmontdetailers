// API utility for backend integration

interface ApiEndpoints {
  baseUrl: string
  subscribe: string
  contact: string
  gallery: string
  galleryUploadUrl: string
}

let cachedEndpoints: ApiEndpoints | null = null

/**
 * Load API endpoints from the JSON configuration file
 */
export async function getApiEndpoints(): Promise<ApiEndpoints> {
  if (cachedEndpoints) {
    return cachedEndpoints
  }

  try {
    const response = await fetch('/api-endpoints.json')
    if (!response.ok) {
      throw new Error('Failed to load API endpoints')
    }
    cachedEndpoints = await response.json()
    return cachedEndpoints
  } catch (error) {
    console.error('Error loading API endpoints:', error)
    // Fallback to placeholder (will fail gracefully)
    return {
      baseUrl: '',
      subscribe: '',
      contact: '',
      gallery: '',
      galleryUploadUrl: '',
    }
  }
}

/**
 * Subscribe email to notification list
 */
export async function subscribeEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const endpoints = await getApiEndpoints()
    if (!endpoints.subscribe) {
      throw new Error('API endpoint not configured')
    }

    const response = await fetch(endpoints.subscribe, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to subscribe')
    }

    return { success: true, message: data.message || 'Successfully subscribed' }
  } catch (error) {
    console.error('Subscribe error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe',
    }
  }
}

/**
 * Submit contact form
 */
export async function submitContactForm(formData: {
  name: string
  phone: string
  vehicle: string
  service: string
  location: string
  notes?: string
}): Promise<{ success: boolean; message: string }> {
  try {
    const endpoints = await getApiEndpoints()
    if (!endpoints.contact) {
      throw new Error('API endpoint not configured')
    }

    const response = await fetch(endpoints.contact, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      // Include the error code if available for better debugging
      const errorMsg = data.error || 'Failed to submit contact form'
      const errorCode = data.errorCode ? ` (${data.errorCode})` : ''
      throw new Error(`${errorMsg}${errorCode}`)
    }

    return { success: true, message: data.message || 'Form submitted successfully' }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit form',
    }
  }
}

/**
 * Get all gallery items
 */
export async function getGalleryItems(): Promise<{
  success: boolean
  items: Array<{
    id: string
    title: string
    packageType: string
    imageUrl: string
    description: string
    createdAt?: string
  }>
  error?: string
}> {
  try {
    const endpoints = await getApiEndpoints()
    if (!endpoints.gallery) {
      throw new Error('API endpoint not configured')
    }

    const response = await fetch(endpoints.gallery, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch gallery items')
    }

    return {
      success: true,
      items: data.items || [],
    }
  } catch (error) {
    console.error('Gallery fetch error:', error)
    return {
      success: false,
      items: [],
      error: error instanceof Error ? error.message : 'Failed to fetch gallery',
    }
  }
}
