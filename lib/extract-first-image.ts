/**
 * Universal image extractor that works in both server and client environments
 * @param htmlContent HTML string to parse
 * @returns First image src or null if none found
 */
export function extractFirstImage(htmlContent: string): string | null {
  if (typeof htmlContent !== 'string' || !htmlContent.trim()) {
    return null
  }

  // Use regex approach for universal compatibility
  try {
    // Improved regex to handle:
    // - Different quote types (", ')
    // - Self-closing tags
    // - Various attribute orders
    // - Relative and absolute URLs
    const imgRegex = /<img[^>]*src=(?:"([^"]*)"|'([^']*)'|([^"'\s>]*))[^>]*>?/i
    const match = htmlContent.match(imgRegex)
    
    // Return the first non-empty capture group (accounts for different quote styles)
    return match?.slice(1).find(Boolean) || null
  } catch (error) {
    console.error('Error extracting image:', error)
    return null
  }
}