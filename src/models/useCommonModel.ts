export interface CommonModel {
  yearCopy: () => number
  getOwnProperty: <T, K extends keyof T>(o: T, name: K) => T[K]
}

export default (): CommonModel => {
  const yearCopy = (): number => {
    const date = new Date()
    const curYear = date.getFullYear()
    return curYear
  }

  const getOwnProperty = <T, K extends keyof T>(o: T, name: K): T[K] => {
    return o[name]
  }

  return {
    yearCopy,
    getOwnProperty,
  }
}
