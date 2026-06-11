/** Strip HTML and normalize whitespace — reviews are plain text only. */
export function sanitizeReviewText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeShortText(input: string): string {
  return sanitizeReviewText(input).slice(0, 80);
}
