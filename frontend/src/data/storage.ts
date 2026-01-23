import type { BlogPost, GalleryItem, VideoItem } from '../types'
import { seedBlogs, seedGallery, seedVideos } from './seed'

export const STORAGE_KEYS = {
  gallery: 'pd_gallery',
  blogs: 'pd_blogs',
  videos: 'pd_videos',
}

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback
  }
  const stored = window.localStorage.getItem(key)
  if (!stored) {
    return fallback
  }
  try {
    return JSON.parse(stored) as T
  } catch {
    return fallback
  }
}

const writeStorage = <T,>(key: string, value: T) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const loadGallery = (): GalleryItem[] =>
  (() => {
    const items = readStorage(STORAGE_KEYS.gallery, seedGallery)

    // Migration: older versions seeded default gallery items with IDs gallery-1..gallery-5.
    // If a user has only those legacy defaults stored, treat it as "empty gallery".
    const legacyIds = new Set([
      'gallery-1',
      'gallery-2',
      'gallery-3',
      'gallery-4',
      'gallery-5',
    ])
    const storedIds = new Set(items.map((item) => item.id))
    const isLegacySeedOnly =
      items.length === legacyIds.size &&
      storedIds.size === legacyIds.size &&
      items.every((item) => legacyIds.has(item.id))

    return isLegacySeedOnly ? [] : items
  })()

export const saveGallery = (items: GalleryItem[]) =>
  writeStorage(STORAGE_KEYS.gallery, items)

export const loadBlogs = (): BlogPost[] =>
  readStorage(STORAGE_KEYS.blogs, seedBlogs)

export const saveBlogs = (items: BlogPost[]) =>
  writeStorage(STORAGE_KEYS.blogs, items)

export const loadVideos = (): VideoItem[] =>
  readStorage(STORAGE_KEYS.videos, seedVideos)

export const saveVideos = (items: VideoItem[]) =>
  writeStorage(STORAGE_KEYS.videos, items)
