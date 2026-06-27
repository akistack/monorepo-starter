export const DRYRUN = Boolean(process.env.DRYRUN === 'true');

export const DEV = Boolean(process.env.NODE_ENV === 'development');

export function withDryrun<T>(fn: () => T, dryRunFn: () => T = () => undefined as T) {
  if (DRYRUN) {
    return dryRunFn();
  }

  return fn();
}
