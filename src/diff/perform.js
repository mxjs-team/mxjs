import getChange from './getChange'
import getDefinition from './getDefinition'
import getDeletion from './getDeletion'
import getProperties from './getProperties'
import heap from './heap'

export default function perform (originalWrapped, derivedWrapped) {
  const properties = getProperties(originalWrapped.value, derivedWrapped.value)

  return properties.reduce((result, property) => {
    const heaped = [originalWrapped, derivedWrapped].map(wrapped => heap(wrapped, property))

    return [...result, ...(
      heaped.every(item => item && item.type === 'object')
        ? perform(...heaped)
        : [getChange(...heaped) || getDeletion(...heaped) || getDefinition(...heaped)].filter(Boolean)
    )]
  }, [])
}
