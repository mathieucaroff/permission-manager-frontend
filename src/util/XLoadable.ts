export type XLoadable<T> = XLoadableHasValue<T> | XLoadableHasError | XLoadableLoading

export interface XLoadableHasValue<T> {
   state: 'hasValue'
   value: T
}

export interface XLoadableHasError {
   state: 'hasError'
   errorMessage: string
}

export interface XLoadableLoading {
   state: 'loading'
}
