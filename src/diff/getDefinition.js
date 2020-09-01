export default function getDefinitions (originalWrapped, derivedWrapped) {
  if (originalWrapped !== undefined || derivedWrapped === undefined) return

  return {
    type: 'definition',
    path: `${derivedWrapped}`,
    value: derivedWrapped.value
  }
}
