export interface CommonState<T> {
    data: T | undefined,
    status: string | null
    error: string | undefined,
}