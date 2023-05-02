export const classnames = (
  ...classes: Array<string | boolean | null | undefined>
) => classes.filter(Boolean).join(' ')

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
