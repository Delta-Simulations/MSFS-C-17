export const createArray = (length: number): number[] => {
  const array = new Array(length)
  for (let i = 0; i < length; i++) {
    array[i] = i
  }
  return array
}
