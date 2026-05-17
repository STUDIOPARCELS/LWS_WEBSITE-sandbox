// Supabase Storage wiring for Lisa Wood Studio.
//
// All site media lives in the public Storage bucket "LISA WOOD STUDIO WEBSITE"
// in the SURFACE SURVEYS Supabase project. Images are referenced by their
// in-bucket path; `bucketUrl` builds the public object URL.
//
// The bucket is public, so no API key is needed to read objects.

export const SUPABASE_PROJECT_REF = "aawnkxnnrymqbysgimqj";
export const SUPABASE_URL = `https://${SUPABASE_PROJECT_REF}.supabase.co`;
export const MEDIA_BUCKET = "LISA WOOD STUDIO WEBSITE";

// Encode each path segment so spaces, "&", parentheses, etc. survive — the
// bucket name and many folders contain spaces and special characters.
function encodePath(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");
}

/** Public URL for an object stored in the media bucket. */
export function bucketUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${encodeURIComponent(
    MEDIA_BUCKET,
  )}/${encodePath(path)}`;
}
