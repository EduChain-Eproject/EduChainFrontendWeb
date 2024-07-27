import { ValidationError } from './ValidationFailure';

export interface CommonState<T> {
  data: T | undefined;
  status: string | null;
  error: string | ValidationError | any | undefined;
}

export const initCommonState = {
  data: undefined,
  status: null,
  error: undefined,
};
