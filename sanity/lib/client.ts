import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl: process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}/studio`
    : "https://my-shopr.netlify.app/studio"
  }  
})
