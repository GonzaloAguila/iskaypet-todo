import { EMAIL_REGEX, PHONE_REGEX, NAME_REGEX } from './regex';

describe('regex', () => {
  describe('EMAIL_REGEX', () => {
    it('should match valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user123@example-domain.com',
        'a@b.co',
      ];

      validEmails.forEach((email) => {
        expect(email).toMatch(EMAIL_REGEX);
      });
    });

    it('should not match invalid email addresses', () => {
      const invalidEmails = [
        'invalid',
        '@example.com',
        'user@',
        'user@example',
        'user name@example.com',
        '',
      ];

      invalidEmails.forEach((email) => {
        expect(email).not.toMatch(EMAIL_REGEX);
      });
    });
  });

  describe('PHONE_REGEX', () => {
    it('should match valid phone numbers', () => {
      const validPhones = [
        '1234567890',
        '+1234567890',
        '(123)456-7890',
        '123-456-7890',
        '123.456.7890',
        '123456789',
        '+123456789',
        '(123) 456-7890',
      ];

      validPhones.forEach((phone) => {
        expect(phone).toMatch(PHONE_REGEX);
      });
    });

    it('should not match invalid phone numbers', () => {
      const invalidPhones = [
        'abc123',
        '12',
        '',
        'phone',
        'abc',
      ];

      invalidPhones.forEach((phone) => {
        expect(phone).not.toMatch(PHONE_REGEX);
      });
    });
  });

  describe('NAME_REGEX', () => {
    it('should match valid names with only letters', () => {
      const validNames = [
        'Juan',
        'María',
        'José',
        'Ana',
        'Pedro',
        'María José',
        'José María',
        'Ángel',
        'Niño',
        'Muñoz',
        'Güemes',
      ];

      validNames.forEach((name) => {
        expect(name).toMatch(NAME_REGEX);
      });
    });

    it('should not match names with numbers or special characters', () => {
      const invalidNames = [
        'Juan123',
        'María2',
        'José-',
        'Ana.',
        'Pedro_',
        '123',
        'Juan@',
        'María#',
        '',
      ];

      invalidNames.forEach((name) => {
        expect(name).not.toMatch(NAME_REGEX);
      });
    });
  });
});

