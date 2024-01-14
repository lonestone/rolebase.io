export const AVATAR_SM_WIDTH = 72
export const AVATAR_HEADING_WIDTH = 240
export const AVATAR_GRAPH_WIDTH = 240

// Add with to image url
// Warning: It works only with images from storage
export function getResizedImageUrl<
  Url extends string | null | undefined,
  Return = Url extends null ? Exclude<Url, null> | undefined : Url,
>(url: Url, width: number): Return {
  if (url === undefined || url === null) {
    return undefined as Return
  }
  return `${url}${url.indexOf('?') === -1 ? '?' : '&'}w=${width}` as Return
}
