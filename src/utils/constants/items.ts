import { IUpgradeKeys } from '../registry'

type IEffectBase = {
  statKey: IUpgradeKeys
  change: number
}
type IPurchasable = {
  key: string
  type: string
  text: string
  temporary: boolean
  percent?: boolean
  frame: number
  effects: { cost: number; effects: IEffectBase[] }[]
}

const getCost = (startCost: number, level: number, factor = 1.15) =>
  Math.round(startCost * Math.pow(factor, level))

const getEffect = (
  statKey: IUpgradeKeys,
  cost: number,
  statChangePerLevel: number,
) => ({
  cost,
  effects: [{ statKey, change: statChangePerLevel }],
})

const getEffects = (
  statKey: IUpgradeKeys,
  {
    fixedCosts,
    maxLevel,
    statChangePerLevel,
    factor,
  }: {
    fixedCosts: number[]
    maxLevel: number
    statChangePerLevel: number | ((level: number) => number)
    factor: number
  },
) => {
  const _statChangePerLevel = (level: number) => {
    if (typeof statChangePerLevel === 'number') return statChangePerLevel
    return statChangePerLevel(level)
  }
  let result = fixedCosts.map((c, i) => {
    const change = _statChangePerLevel(i)
    return getEffect(statKey, c, change)
  })

  for (let i = fixedCosts.length; i < maxLevel; i++) {
    result.push(
      getEffect(
        statKey,
        getCost(fixedCosts[fixedCosts.length - 1], i, factor),
        _statChangePerLevel(i),
      ),
    )
  }

  return result
}

export const ITEMS: IPurchasable[] = [
  {
    key: 'damageMeleeBase',
    type: 'glove',
    frame: 71,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase your\nsword damage by {change}',
    effects: getEffects('damageMeleeBase', {
      fixedCosts: [10, 50, 100, 200],
      maxLevel: 20,
      factor: 1.25,
      statChangePerLevel: 1,
    }),
  },
  {
    key: 'speedMoveMulti',
    type: 'wing',
    frame: 70,
    temporary: true,
    percent: true,
    text: 'That costs {cost} gold.\nIt will increase your\nspeed by {change}',
    effects: getEffects('speedMoveMulti', {
      fixedCosts: [10, 50, 100, 200],
      maxLevel: 10,
      factor: 1.3,
      statChangePerLevel: 0.1,
    }),
  },
  {
    key: 'healthMax',
    type: 'potion',
    frame: 51,
    temporary: true,
    text: 'That costs {cost} gold.\nIt will increase your\nmax health by {change}',
    effects: getEffects('healthMax', {
      fixedCosts: [10, 50, 100, 200],
      maxLevel: 20,
      factor: 1.3,
      statChangePerLevel: (l) => (l + 1) * 10,
    }),
  },
  {
    key: 'damageMeleeFreq',
    type: 'lightning',
    frame: 54,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase the number\nof times your sword hits\nper attack by {change}',
    effects: getEffects('damageMeleeFreq', {
      fixedCosts: [10, 50, 100],
      maxLevel: 3,
      factor: 1.3,
      statChangePerLevel: 1,
    }),
  },
  {
    key: 'damageMulti',
    type: 'glove',
    frame: 71,
    temporary: true,
    text: 'That costs {cost} gold.\nIt will increase your\nstrength by {change}',
    effects: [
      { cost: 20, effects: [{ statKey: 'damageMulti', change: 0.2 }] },
      { cost: 30, effects: [{ statKey: 'damageMulti', change: 0.3 }] },
      { cost: 40, effects: [{ statKey: 'damageMulti', change: 0.4 }] },
    ],
  },
  {
    key: 'defenseMelee',
    type: 'shield-round',
    frame: 65,
    temporary: true,
    text: 'That costs {cost} gold.\nIt will increase your\nmelee defense by {change}',
    effects: [
      { cost: 10, effects: [{ statKey: 'defenseMelee', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'defenseMelee', change: 2 }] },
      { cost: 30, effects: [{ statKey: 'defenseMelee', change: 3 }] },
    ],
  },
  {
    key: 'defenseRanged',
    type: 'shield-kite',
    frame: 66,
    temporary: true,
    text: 'That costs {cost} gold.\nIt will increase your\nranged defense by {change}',
    effects: [
      { cost: 10, effects: [{ statKey: 'defenseRanged', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'defenseRanged', change: 3 }] },
      { cost: 30, effects: [{ statKey: 'defenseRanged', change: 6 }] },
    ],
  },
  {
    key: 'damageRangeBase',
    type: 'bow',
    frame: 67,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase your\nranged strength by {change}',
    effects: [
      { cost: 10, effects: [{ statKey: 'damageRangeBase', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'damageRangeBase', change: 2 }] },
      { cost: 30, effects: [{ statKey: 'damageRangeBase', change: 3 }] },
    ],
  },
  {
    key: 'rangeCount',
    type: 'fire',
    frame: 68,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase your\nrange count by {change}',
    effects: [
      { cost: 10, effects: [{ statKey: 'rangeCount', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'rangeCount', change: 1 }] },
      { cost: 30, effects: [{ statKey: 'rangeCount', change: 1 }] },
    ],
  },
  {
    key: 'earnRateMulti',
    type: 'bag',
    frame: 69,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase your\nearn rate multi by {change}',
    effects: [
      { cost: 10, effects: [{ statKey: 'earnRateMulti', change: 0.1 }] },
      { cost: 20, effects: [{ statKey: 'earnRateMulti', change: 0.1 }] },
      { cost: 30, effects: [{ statKey: 'earnRateMulti', change: 0.1 }] },
    ],
  },
  {
    key: 'speedMeleeMulti',
    type: 'lightning',
    frame: 54,
    temporary: true,
    text: 'That costs {cost} gold.\nIt will increase your\nattack speed multi by {change}',
    effects: [
      { cost: 10, effects: [{ statKey: 'speedMeleeMulti', change: -0.1 }] },
      { cost: 20, effects: [{ statKey: 'speedMeleeMulti', change: -0.1 }] },
      { cost: 30, effects: [{ statKey: 'speedMeleeMulti', change: -0.1 }] },
    ],
  },
  {
    key: 'sizeBase',
    type: 'up',
    frame: 55,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase your\nsize by {change}',
    effects: [
      { cost: 10, effects: [{ statKey: 'sizeBase', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'sizeBase', change: 1 }] },
      { cost: 30, effects: [{ statKey: 'sizeBase', change: 1 }] },
    ],
  },
]
