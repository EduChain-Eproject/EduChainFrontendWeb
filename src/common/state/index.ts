import { ValidationError } from './ValidationFailure';

export interface CommonState<T> {
  data: T | undefined;
  status: string | null;
  error?: string;
  errors?: Record<string, string>;
}

export const initCommonState = {
  data: undefined,
  status: null,
  error: undefined,
  errors: undefined,
};
