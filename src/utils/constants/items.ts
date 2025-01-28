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
  frame: number
  effects: { cost: number; effects: IEffectBase[] }[]
}

export const ITEMS: IPurchasable[] = [
  {
    key: 'healthMax',
    type: 'potion',
    frame: 51,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nchange your health\nby {change}.',
    effects: [
      { cost: 10, effects: [{ statKey: 'healthMax', change: 20 }] },
      { cost: 20, effects: [{ statKey: 'healthMax', change: 40 }] },
      { cost: 30, effects: [{ statKey: 'healthMax', change: 60 }] },
    ],
  },
  {
    key: 'speedMoveMulti',
    type: 'wing',
    frame: 70,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nchange your speed\nby {change}.',
    effects: [
      { cost: 10, effects: [{ statKey: 'speedMoveMulti', change: 0.25 }] },
      { cost: 20, effects: [{ statKey: 'speedMoveMulti', change: 0.25 }] },
      { cost: 30, effects: [{ statKey: 'speedMoveMulti', change: 0.25 }] },
    ],
  },
  {
    key: 'damageMeleeBase',
    type: 'glove',
    frame: 71,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nchange your melee strength\nby {change}.',
    effects: [
      { cost: 10, effects: [{ statKey: 'damageMeleeBase', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'damageMeleeBase', change: 2 }] },
      { cost: 30, effects: [{ statKey: 'damageMeleeBase', change: 3 }] },
    ],
  },
  {
    key: 'damageMeleeFreq',
    type: 'lightning',
    frame: 54,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nchange your melee frequency\nby {change}.',
    effects: [
      { cost: 10, effects: [{ statKey: 'damageMeleeFreq', change: -50 }] },
      { cost: 20, effects: [{ statKey: 'damageMeleeFreq', change: -50 }] },
      { cost: 30, effects: [{ statKey: 'damageMeleeFreq', change: -50 }] },
    ],
  },
  {
    key: 'durationMeleeBase',
    type: 'hourglass',
    frame: 64,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nchange your melee duration\nby {change}.',
    effects: [
      { cost: 10, effects: [{ statKey: 'durationMeleeBase', change: 200 }] },
      { cost: 20, effects: [{ statKey: 'durationMeleeBase', change: 200 }] },
      { cost: 30, effects: [{ statKey: 'durationMeleeBase', change: 200 }] },
    ],
  },
  {
    key: 'damageMulti',
    type: 'glove',
    frame: 71,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nchange your strength\nby {change}.',
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
    temporary: false,
    text: 'That costs {cost} gold.  It will\nchange your melee defense\nby {change}.',
    effects: [
      { cost: 10, effects: [{ statKey: 'defenseMelee', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'defenseMelee', change: 2 }] },
      { cost: 30, effects: [{ statKey: 'defenseMelee', change: 3 }] },
    ],
  },
  {
    // face + kite shield
    key: 'defenseRanged',
    type: 'shield-kite',
    frame: 66,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nchange your ranged defense\nby {change}.',
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
    text: 'That costs {cost} gold.  It will\nchange your ranged strength\nby {change}.',
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
    text: 'That costs {cost} gold.  It will\nchange your range count\nby {change}.',
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
    temporary: true,
    text: 'That costs {cost} gold.  It will\nchange your earn rate multi\nby {change}.',
    effects: [
      { cost: 10, effects: [{ statKey: 'earnRateMulti', change: 0.1 }] },
      { cost: 20, effects: [{ statKey: 'earnRateMulti', change: 0.1 }] },
      { cost: 30, effects: [{ statKey: 'earnRateMulti', change: 0.1 }] },
    ],
  },
  {
    key: 'speedMeleeBase',
    type: 'lightning',
    frame: 54,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nchange your attack speed\nby {change}.',
    effects: [
      { cost: 10, effects: [{ statKey: 'speedMeleeBase', change: -100 }] },
      { cost: 20, effects: [{ statKey: 'speedMeleeBase', change: -100 }] },
      { cost: 30, effects: [{ statKey: 'speedMeleeBase', change: -100 }] },
    ],
  },
  {
    key: 'speedMeleeMulti',
    type: 'lightning',
    frame: 54,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nchange your attack speed multi\nby {change}.',
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
    text: 'That costs {cost} gold.  It will\nchange your size\nby {change}.',
    effects: [
      { cost: 10, effects: [{ statKey: 'sizeBase', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'sizeBase', change: 1 }] },
      { cost: 30, effects: [{ statKey: 'sizeBase', change: 1 }] },
    ],
  },
]
