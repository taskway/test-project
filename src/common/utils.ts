export const compose = (...fns: Function[]) => (arg: any) => fns.reduce((composed, f) => f(composed), arg)

export const shuffleArr = (arr: any[]) => arr.sort(() => Math.random() - 0.5)
