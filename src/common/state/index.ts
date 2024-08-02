export interface CommonState<T> {
  data: T | undefined;
  status: string | null;
  error: string | undefined;
  errors: { [key: string]: string } | undefined;
}

export const initCommonState = {
  data: undefined,
  status: null,
  error: undefined,
  errors: undefined,
};
