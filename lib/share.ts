const MAX_BYTES = 8 * 1024 * 1024;

const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function shareEndpoint(): string {
  return process.env.NEXT_PUBLIC_SHARE_ENDPOINT?.trim() ?? "";
}

export function imageError(file: File): string {
  const name = file.name.toLowerCase();
  const allowedType = TYPES.has(file.type);
  const allowedName = /\.(jpe?g|png|webp)$/.test(name);
  if (!allowedType && !allowedName) return "Use a JPG, PNG, or WebP.";
  if (file.size > MAX_BYTES) return "That image is too large. Use one under 8 MB.";
  return "";
}

export async function sendBanner(fields: {
  teamName: string;
  email: string;
  note: string;
  file: File;
}): Promise<void> {
  const endpoint = shareEndpoint();
  if (!endpoint) throw new Error("Sharing isn't set up yet.");

  const body = new FormData();
  body.append("Team name", fields.teamName.trim());
  if (fields.email.trim()) body.append("Email", fields.email.trim());
  if (fields.note.trim()) body.append("Note", fields.note.trim());
  body.append("Permission", "Yes. Banner art, fine for a youth soccer site.");
  body.append("Banner", fields.file, fields.file.name);

  const response = await fetch(endpoint, {
    method: "POST",
    body,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) throw new Error("That didn't send.");
}
