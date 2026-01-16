import { createContext, useContext } from 'react'
import type { SEOProps } from './seo'

export type SEOCollector = {
  set: (props: SEOProps) => void
}

export const SEOCollectorContext = createContext<SEOCollector | null>(null)

export const useSEOCollector = () => useContext(SEOCollectorContext)

