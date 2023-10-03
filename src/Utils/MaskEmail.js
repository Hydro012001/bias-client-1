export function MaskEmail(email) {
  const [username, domain] = email.split("@");
  const maskUsername = username.slice(0, 4) + "*****";
  return `${maskUsername}@${domain}`;
}
