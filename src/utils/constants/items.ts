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
    text: 'That costs {cost} gold.  It will\nupgrade your health.',
    effects: [
      { cost: 10, effects: [{ statKey: 'healthMax', change: 20 }] },
      { cost: 20, effects: [{ statKey: 'healthMax', change: 40 }] },
      { cost: 30, effects: [{ statKey: 'healthMax', change: 60 }] },
    ],
  },
  {
    key: 'speedMoveMulti',
    type: 'random',
    frame: 52,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nupgrade your speed.',
    effects: [
      { cost: 10, effects: [{ statKey: 'speedMoveMulti', change: 0.25 }] },
      { cost: 20, effects: [{ statKey: 'speedMoveMulti', change: 0.25 }] },
      { cost: 30, effects: [{ statKey: 'speedMoveMulti', change: 0.25 }] },
    ],
  },
  {
    key: 'damageMeleeBase',
    type: 'random',
    frame: 52,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nupgrade your melee strength.',
    effects: [
      { cost: 10, effects: [{ statKey: 'damageMeleeBase', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'damageMeleeBase', change: 2 }] },
      { cost: 30, effects: [{ statKey: 'damageMeleeBase', change: 3 }] },
    ],
  },
  {
    key: 'damageMeleeFreq',
    type: 'random',
    frame: 52,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nupgrade your melee frequency.',
    effects: [
      { cost: 10, effects: [{ statKey: 'damageMeleeFreq', change: -50 }] },
      { cost: 20, effects: [{ statKey: 'damageMeleeFreq', change: -50 }] },
      { cost: 30, effects: [{ statKey: 'damageMeleeFreq', change: -50 }] },
    ],
  },
  {
    key: 'durationMeleeBase',
    type: 'random',
    frame: 52,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nupgrade your melee duration.',
    effects: [
      { cost: 10, effects: [{ statKey: 'durationMeleeBase', change: 200 }] },
      { cost: 20, effects: [{ statKey: 'durationMeleeBase', change: 200 }] },
      { cost: 30, effects: [{ statKey: 'durationMeleeBase', change: 200 }] },
    ],
  },
  {
    key: 'damageMeleeMulti',
    type: 'ring',
    frame: 53,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nupgrade your strength.',
    effects: [
      { cost: 20, effects: [{ statKey: 'damageMeleeMulti', change: 0.2 }] },
      { cost: 30, effects: [{ statKey: 'damageMeleeMulti', change: 0.3 }] },
      { cost: 40, effects: [{ statKey: 'damageMeleeMulti', change: 0.4 }] },
    ],
  },

  {
    key: 'defenseMelee',
    type: 'random',
    frame: 52,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nupgrade your melee defense.',
    effects: [
      { cost: 10, effects: [{ statKey: 'defenseMelee', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'defenseMelee', change: 2 }] },
      { cost: 30, effects: [{ statKey: 'defenseMelee', change: 3 }] },
    ],
  },
  {
    key: 'defenseRanged',
    type: 'random',
    frame: 52,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nupgrade your ranged defense.',
    effects: [
      { cost: 10, effects: [{ statKey: 'defenseRanged', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'defenseRanged', change: 3 }] },
      { cost: 30, effects: [{ statKey: 'defenseRanged', change: 6 }] },
    ],
  },
  {
    key: 'damageRangeBase',
    type: 'random',
    frame: 52,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nupgrade your ranged strength.',
    effects: [
      { cost: 10, effects: [{ statKey: 'damageRangeBase', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'damageRangeBase', change: 2 }] },
      { cost: 30, effects: [{ statKey: 'damageRangeBase', change: 3 }] },
    ],
  },
  {
    key: 'damageRangeMulti',
    type: 'random',
    frame: 52,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nupgrade your ranged strength multi.',
    effects: [
      { cost: 10, effects: [{ statKey: 'damageRangeMulti', change: 0.1 }] },
      { cost: 20, effects: [{ statKey: 'damageRangeMulti', change: 0.2 }] },
      { cost: 30, effects: [{ statKey: 'damageRangeMulti', change: 0.3 }] },
    ],
  },
  {
    key: 'rangeCount',
    type: 'random',
    frame: 52,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nupgrade your range count.',
    effects: [
      { cost: 10, effects: [{ statKey: 'rangeCount', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'rangeCount', change: 1 }] },
      { cost: 30, effects: [{ statKey: 'rangeCount', change: 1 }] },
    ],
  },
  {
    key: 'earnRateBase',
    type: 'random',
    frame: 52,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nupgrade your earn rate.',
    effects: [
      { cost: 10, effects: [{ statKey: 'earnRateBase', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'earnRateBase', change: 1 }] },
      { cost: 30, effects: [{ statKey: 'earnRateBase', change: 1 }] },
    ],
  },
  {
    key: 'earnRateMulti',
    type: 'random',
    frame: 52,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nupgrade your earn rate multi.',
    effects: [
      { cost: 10, effects: [{ statKey: 'earnRateMulti', change: 0.1 }] },
      { cost: 20, effects: [{ statKey: 'earnRateMulti', change: 0.1 }] },
      { cost: 30, effects: [{ statKey: 'earnRateMulti', change: 0.1 }] },
    ],
  },
  {
    key: 'speedMeleeBase',
    type: 'random',
    frame: 52,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nupgrade your attack speed.',
    effects: [
      { cost: 10, effects: [{ statKey: 'speedMeleeBase', change: -100 }] },
      { cost: 20, effects: [{ statKey: 'speedMeleeBase', change: -100 }] },
      { cost: 30, effects: [{ statKey: 'speedMeleeBase', change: -100 }] },
    ],
  },
  {
    key: 'speedMeleeMulti',
    type: 'random',
    frame: 52,
    temporary: true,
    text: 'That costs {cost} gold.  It will\nupgrade your attack speed multi.',
    effects: [
      { cost: 10, effects: [{ statKey: 'speedMeleeMulti', change: -0.1 }] },
      { cost: 20, effects: [{ statKey: 'speedMeleeMulti', change: -0.1 }] },
      { cost: 30, effects: [{ statKey: 'speedMeleeMulti', change: -0.1 }] },
    ],
  },
  {
    key: 'sizeBase',
    type: 'random',
    frame: 52,
    temporary: false,
    text: 'That costs {cost} gold.  It will\nupgrade your size.',
    effects: [
      { cost: 10, effects: [{ statKey: 'sizeBase', change: 1 }] },
      { cost: 20, effects: [{ statKey: 'sizeBase', change: 1 }] },
      { cost: 30, effects: [{ statKey: 'sizeBase', change: 1 }] },
    ],
  },
]
