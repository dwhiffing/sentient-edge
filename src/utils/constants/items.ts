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
      fixedCosts: [10, 50, 100, 200, 500, 750],
      maxLevel: 20,
      factor: 1.3,
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
      fixedCosts: [10, 50, 100, 200, 400, 750, 1500],
      maxLevel: 7,
      factor: 1.15,
      statChangePerLevel: 0.15,
    }),
  },
  {
    key: 'healthMax',
    type: 'potion',
    frame: 51,
    temporary: true,
    text: 'That costs {cost} gold.\nIt will increase your\nmax health by {change}',
    effects: getEffects('healthMax', {
      fixedCosts: [50, 100, 175, 300, 500, 750, 1000, 2500, 5000],
      maxLevel: 9,
      factor: 1.15,
      statChangePerLevel: 10,
    }),
  },
  {
    key: 'sizeBase',
    type: 'up',
    frame: 55,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase your\nsize by {change}',
    effects: getEffects('sizeBase', {
      fixedCosts: [500, 2500, 5000, 10000],
      maxLevel: 4,
      factor: 2,
      statChangePerLevel: 1,
    }),
  },
  {
    key: 'damageMulti',
    type: 'glove',
    frame: 71,
    temporary: true,
    percent: true,
    text: 'That costs {cost} gold.\nIt will increase your\ndamage multiplier by {change}',
    effects: getEffects('damageMulti', {
      fixedCosts: [50, 100, 175, 300, 500, 750],
      maxLevel: 20,
      factor: 1.15,
      statChangePerLevel: 0.1,
    }),
  },
  {
    key: 'rangeCount',
    type: 'fire',
    frame: 68,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase your\nrange count by {change}',
    effects: getEffects('rangeCount', {
      fixedCosts: [1000, 10000, 100000],
      maxLevel: 3,
      factor: 2,
      statChangePerLevel: 1,
    }),
  },
  {
    key: 'speedMeleeMulti',
    type: 'lightning',
    frame: 54,
    temporary: true,
    percent: true,
    text: 'That costs {cost} gold.\nIt will increase your\nattack speed multi by {change}',
    effects: getEffects('speedMeleeMulti', {
      fixedCosts: [50, 100, 250, 500],
      maxLevel: 20,
      factor: 1.15,
      statChangePerLevel: 0.15,
    }),
  },
  {
    key: 'defenseMelee',
    type: 'shield-round',
    frame: 65,
    temporary: true,
    text: 'That costs {cost} gold.\nIt will decrease the\nmelee damage you take by {change}',
    effects: getEffects('defenseMelee', {
      fixedCosts: [50, 100, 250, 500],
      maxLevel: 20,
      factor: 1.15,
      statChangePerLevel: 1,
    }),
  },
  {
    key: 'defenseRanged',
    type: 'shield-kite',
    frame: 66,
    temporary: true,
    text: 'That costs {cost} gold.\nIt will increase your\nranged defense by {change}',
    effects: getEffects('defenseRanged', {
      fixedCosts: [50, 100, 250, 500],
      maxLevel: 20,
      factor: 1.15,
      statChangePerLevel: 1,
    }),
  },
  {
    key: 'damageRangeBase',
    type: 'bow',
    frame: 67,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase your\nranged strength by {change}',
    effects: getEffects('damageRangeBase', {
      fixedCosts: [10, 50, 100, 200, 500, 750],
      maxLevel: 20,
      factor: 1.3,
      statChangePerLevel: 1,
    }),
  },
  {
    key: 'earnRateMulti',
    type: 'bag',
    frame: 69,
    temporary: false,
    percent: true,
    text: 'That costs {cost} gold.\nIt will increase your\nearn rate multi by {change}',
    effects: getEffects('earnRateMulti', {
      fixedCosts: [1000, 2500, 6000],
      maxLevel: 12,
      factor: 1.3,
      statChangePerLevel: 0.25,
    }),
  },
  {
    key: 'damageMeleeFreq',
    type: 'lightning',
    frame: 54,
    temporary: false,
    text: 'That costs {cost} gold.\nIt will increase the number\nof times your sword hits\nper attack by {change}',
    effects: getEffects('damageMeleeFreq', {
      fixedCosts: [5000, 50000, 500000],
      maxLevel: 3,
      factor: 1.3,
      statChangePerLevel: 1,
    }),
  },
]
