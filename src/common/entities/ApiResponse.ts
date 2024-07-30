import Failure from './Failure';

type ApiResponse<T> = Promise<{ data?: T; error?: Failure }>;

export default ApiResponse;
