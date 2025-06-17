const emailRegex =
  /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;

export function isEmailValid(email: string): boolean {
  // Check if the email is defined and not too long
  if (!email || email.length > 254) return false;

  // Use a single regex check for the standard email parts
  if (!emailRegex.test(email)) return false;

  // Split once and perform length checks on the parts
  const parts = email.split('@');
  if (parts[0].length > 64) return false;

  // Perform length checks on domain parts
  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 63)) return false;

  // If all checks pass, the email is valid
  return true;
}
