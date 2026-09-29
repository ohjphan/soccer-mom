const BLOCKED =
  /\b(fuck|shit|bitch|asshole|cunt|nigger|nigga|faggot|fag|slut|whore|dick|cock|pussy)\b/i;

export function isProfane(value: string): boolean {
  const normalized = value.normalize("NFKC").replace(/[\u200B-\u200D\uFEFF]/g, "");
  return BLOCKED.test(normalized);
}
