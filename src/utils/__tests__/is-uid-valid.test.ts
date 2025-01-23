import { isUidValid } from '../is-uid-valid';

describe('isUidValid', () => {
  it('should return true for a valid UID', () => {
    expect(isUidValid('validUid123')).toBe(true);
  });

  it('should return false for an empty UID', () => {
    expect(isUidValid('')).toBe(false);
  });

  it('should return false for a UID containing "admin"', () => {
    expect(isUidValid('adminUser')).toBe(false);
  });

  it('should return false for a UID containing "login"', () => {
    expect(isUidValid('userLogin')).toBe(false);
  });

  it('should return false for a UID containing "wp"', () => {
    expect(isUidValid('wpUser')).toBe(false);
  });

  it('should return false for a UID containing ".php"', () => {
    expect(isUidValid('user.php')).toBe(false);
  });

  it('should return true for a UID that does not contain invalid substrings', () => {
    expect(isUidValid('user123')).toBe(true);
  });

  it('should return true for a UID that contains parts of invalid substrings', () => {
    expect(isUidValid('admi')).toBe(true);
    expect(isUidValid('log')).toBe(true);
    expect(isUidValid('w')).toBe(true);
    expect(isUidValid('.ph')).toBe(true);
  });
});
