import { ok, err } from 'neverthrow';

export const createSuccessResult = <T>(value: T) => ok(value);
export const createFailureResult = <E>(error: E) => err(error);
