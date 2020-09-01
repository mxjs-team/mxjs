import apply from './apply'

class Mix {
  constructor (Class) {
    this.Class = Class
  }

  with (...mixins) {
    return mixins.reduce(
      (Class, mixin) => apply(mixin, Class),
      this.Class
    )
  }
}

export default function mix (Class) {
  return new Mix(Class || class {})
}
