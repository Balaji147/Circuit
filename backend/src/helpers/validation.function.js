export const isValidString = (name) => /^[A-Za-z ]+$/.test(name);

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidNumbers = (value) => /^\d+$/.test(value);