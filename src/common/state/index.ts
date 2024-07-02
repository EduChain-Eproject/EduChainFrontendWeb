export interface CommonState<T> {
    data: T | undefined,
    status: string | null
    error: string | undefined,
}

export const initCommonState = {
    data: undefined,
    status: null,
    error: undefined,
}