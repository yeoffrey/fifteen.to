export type Result<T, E> = [data: T, error: null] | [data: null, error: E];

export type ErrorCode = 'missing_id' | 'not_found' | 'error';
