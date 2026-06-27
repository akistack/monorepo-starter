import { error } from './logger';

const AllowedCharactersRegex = /^[a-zA-Z0-9-_]+$/;

export function validate<T>(
  condition: T | (() => T),
  errorMessage: string,
  logger = error,
): asserts condition {
  const valid = typeof condition === 'function' ? (condition as () => T)() : condition;

  if (!valid) {
    logger(errorMessage);
    process.exit(1);
  }
}

export function notEmpty(value: string, field = 'Field'): string | true {
  return value.length > 0 ? true : `${field} is required`;
}

export function allowedCharacters(value: string, field = 'Field'): string | true {
  return AllowedCharactersRegex.test(value)
    ? true
    : `${field} must contain only letters, numbers, hyphens, and underscores`;
}

export function startsWith(value: string, prefix: string, field = 'Field'): string | true {
  return value.startsWith(prefix) ? true : `${field} must start with ${prefix}`;
}
