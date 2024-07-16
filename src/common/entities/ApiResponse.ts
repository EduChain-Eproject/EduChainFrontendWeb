import Failure from "./Failure";

export type ApiResponse<T> = Promise<{data?: T; error?: Failure}>