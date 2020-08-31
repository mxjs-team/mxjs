import wrap from '../../src/diff/wrap'
import perform from '../../src/diff/perform'

describe('perform', () => {
  const examples = [
    /*  0 */ [{}, {}],
    /*  1 */ [{ property: 'value' }, { property: 'value' }],
    /*  2 */ [{ property: 'value' }, { property: 'different value' }],
    /*  3 */ [{ property: 'value' }, {}],
    /*  4 */ [{}, { property: 'value' }],
    /*  5 */ [
      {
        invariant: 'invariant',
        property: 'value',
        otherProperty: 'other value'
      },
      {
        invariant: 'invariant',
        property: 'different value',
        anotherProperty: 'another value'
      }
    ],
    /*  6 */ [[], []],
    /*  7 */ [['value'], ['value']],
    /*  8 */ [['invariant', 'value'], ['invariant', 'different value', 'other value']],
    /*  9 */ [['invariant', 'value', 'other value'], ['invariant', 'different value']],
    /* 10 */ [
      {
        property: 'value',
        otherProperty: {
          property: {
            otherProperty: 'other value'
          }
        }
      },
      {
        property: 'value',
        otherProperty: {
          property: {
            otherProperty: 'other value'
          }
        }
      }
    ],
    /* 11 */ [
      {
        invariant: 'invariant',
        property: {
          invariant: 'invariant',
          property: {
            invariant: 'invariant',
            property: 'value',
            otherProperty: 'other value'
          },
          otherProperty: 'other value'
        },
        otherProperty: 'other value'
      },
      {
        invariant: 'invariant',
        property: {
          invariant: 'invariant',
          property: {
            invariant: 'invariant',
            property: 'different value',
            anotherProperty: 'another value'
          },
          anotherProperty: 'another value'
        },
        anotherProperty: 'another value'
      }
    ],
    /* 12 */ [
      ['value', ['other value', ['another value']]],
      ['value', ['other value', ['another value']]]
    ],
    /* 13 */ [
      ['invariant', ['invariant', 'value', ['another value']]],
      ['invariant', ['invariant', 'different value'], 'another value']
    ],
    /* 14 */ [
      {
        invariant: 'invariant',
        property: ['invariant', ['value', {
          invariant: 'invariant',
          property: 'value',
          otherProperty: 'other value'
        }]]
      },
      {
        invariant: 'invariant',
        property: ['invariant', ['different value', {
          invariant: 'invariant',
          property: 'different value',
          anotherProperty: 'another value'
        }]]
      }
    ],
    /* 15 */ [
      [
        'value',
        {
          invariant: 'invariant',
          property: 'value',
          otherProperty: 'other value'
        },
        'other value'
      ],
      [
        'different value',
        {
          invariant: 'invariant',
          property: 'different value',
          anotherProperty: 'another value'
        }
      ]
    ]
  ].map(objects => objects.map(object => wrap(object)))

  const expectations = [
    /*  0 */ [],
    /*  1 */ [],
    /*  2 */ [
      {
        type: 'change',
        path: '.property',
        previous: 'value',
        value: 'different value'
      }
    ],
    /*  3 */ [
      {
        type: 'deletion',
        path: '.property',
        previous: 'value'
      }
    ],
    /*  4 */ [
      {
        type: 'definition',
        path: '.property',
        value: 'value'
      }
    ],
    /*  5 */ [
      {
        type: 'change',
        path: '.property',
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: '.otherProperty',
        previous: 'other value'
      },
      {
        type: 'definition',
        path: '.anotherProperty',
        value: 'another value'
      }
    ],
    /*  6 */ [],
    /*  7 */ [],
    /*  8 */ [
      {
        type: 'change',
        path: '[1]',
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'definition',
        path: '[2]',
        value: 'other value'
      }
    ],
    /*  9 */ [
      {
        type: 'change',
        path: '[1]',
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: '[2]',
        previous: 'other value'
      }
    ],
    /* 10 */ [],
    /* 11 */ [
      {
        type: 'change',
        path: '.property.property.property',
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: '.property.property.otherProperty',
        previous: 'other value'
      },
      {
        type: 'definition',
        path: '.property.property.anotherProperty',
        value: 'another value'
      },
      {
        type: 'deletion',
        path: '.property.otherProperty',
        previous: 'other value'
      },
      {
        type: 'definition',
        path: '.property.anotherProperty',
        value: 'another value'
      },
      {
        type: 'deletion',
        path: '.otherProperty',
        previous: 'other value'
      },
      {
        type: 'definition',
        path: '.anotherProperty',
        value: 'another value'
      },
    ],
    /* 12 */ [],
    /* 13 */ [
      {
        type: 'change',
        path: '[1][1]',
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: '[1][2]',
        previous: ['another value']
      },
      {
        type: 'definition',
        path: '[2]',
        value: 'another value'
      }
    ],
    /* 14 */ [
      {
        type: 'change',
        path: '.property[1][0]',
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'change',
        path: '.property[1][1].property',
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: '.property[1][1].otherProperty',
        previous: 'other value'
      },
      {
        type: 'definition',
        path: '.property[1][1].anotherProperty',
        value: 'another value'
      }
    ],
    /* 15 */ [
      {
        type: 'change',
        path: '[0]',
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'change',
        path: '[1].property',
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: '[1].otherProperty',
        previous: 'other value'
      },
      {
        type: 'definition',
        path: '[1].anotherProperty',
        value: 'another value'
      },
      {
        type: 'deletion',
        path: '[2]',
        previous: 'other value'
      }
    ]
  ]

  it('returns a list of differences between two objects', () => {
    examples.forEach((example, i) => {
      expect(perform(...example)).toEqual(expectations[i])
    })
  })
})
