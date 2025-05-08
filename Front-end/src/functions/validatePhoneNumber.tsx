import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const validatePhoneNumber = (phone: string): boolean => {
  const cleanedPhone = phone.trim();

  // Check if the number starts with '+' and is a valid international number
  if (!cleanedPhone.startsWith('+')) {
    return false; // Invalid if it doesn't start with '+'
  }

  const phoneNumber = parsePhoneNumberFromString(cleanedPhone);

  return phoneNumber?.isValid() ?? false; // Return true if valid, false otherwise
};
