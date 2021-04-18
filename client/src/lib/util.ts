export const timestampToDate = (timestamp: string) =>
  new Date(timestamp.replace(' ', 'T'))
