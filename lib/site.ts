// Site-wide constants for Lisa Wood Studio.

export const site = {
  name: "Lisa Wood Studio",
  shortName: "Lisa Wood Studio",
  url: "https://lisawoodstudio.com",
  description:
    "Lisa Wood Studio — a visual-first artist portfolio of field-based photography, writing, installation, and conceptual work made through a practice of sustained attention and discomfort.",
  artist: "Lisa Wood",
  location: "Sun Valley, Idaho",
  email: "lisa@lisawoodstudio.com",
  phone: "208.720.2433",
  ogImage: "/assets/social/winterblue-share.jpg",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}
