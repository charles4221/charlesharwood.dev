import { isEmailValid } from '../is-email-valid';

const validEmails = [
  'test@example.com', // standard
  'test@example.dev', // new TLDs
  'test@sub.example.com', // subdomains
  'test+1@example.com', // plus addressing
];

describe('isEmailValid', () => {
  it.each(validEmails)('should return true for a valid email: %s', (email) => {
    expect(isEmailValid(email)).toBe(true);
  });

  it('should return false for an email without "@"', () => {
    expect(isEmailValid('testexample.com')).toBe(false);
  });

  it('should return false for an email with multiple "@"', () => {
    expect(isEmailValid('test@@example.com')).toBe(false);
  });

  it('should return false for an email with invalid characters', () => {
    expect(isEmailValid('test@exa mple.com')).toBe(false);
  });

  it('should return false for an email that is too long', () => {
    const longEmail = 'a'.repeat(243) + '@example.com';
    expect(isEmailValid(longEmail)).toBe(false);
  });

  it('should return false for an email with an address part that is too long', () => {
    const longEmail = 'a'.repeat(65) + '@example.com';
    expect(isEmailValid(longEmail)).toBe(false);
  });

  it('should return false for an email with a domain part that is too long', () => {
    const longDomainEmail = 'test@' + 'a'.repeat(64) + '.com';
    expect(isEmailValid(longDomainEmail)).toBe(false);
  });

  it('should return false for an email with a domain sub-part that is too long', () => {
    const longDomainEmail = 'test@example.' + 'a'.repeat(64) + '.com';
    expect(isEmailValid(longDomainEmail)).toBe(false);
  });
});
