export const withIndex = <T>(v: T, k: number): [T, number] => [v, k]
export const withoutIndex = <T>([v, _]: [T, number]) => v
