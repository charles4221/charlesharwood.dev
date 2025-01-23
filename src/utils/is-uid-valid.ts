const INVALID_UID_INCLUDES = ['admin', 'login', 'wp', '.php'] as const;

export function isUidValid(uid: string): boolean {
  return (
    uid.length > 0 &&
    !INVALID_UID_INCLUDES.some((invalid) => uid.toLowerCase().includes(invalid))
  );
}
