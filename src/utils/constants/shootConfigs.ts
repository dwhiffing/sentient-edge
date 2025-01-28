export type IShootConfig = {
  rangeSpeed: number
  rangeBulletSpeed: number
  rangeBulletSize: number
  rangeCount: number
  rangeSpread: number
  rangeAccuracy: number
  rangeShootChance: number
  rangeCountDelay: number
  rangeStartDelay: number
  rangeTarget: IShootTargets
}

export type IShootTargets = 'player' | 'random'

export const shootNone: IShootConfig = {
  rangeTarget: 'random',
  rangeAccuracy: 0,
  rangeSpeed: 0,
  rangeCount: 0,
  rangeBulletSpeed: 120,
  rangeBulletSize: 1,
  rangeCountDelay: 0,
  rangeShootChance: 1,
  rangeStartDelay: 0,
  rangeSpread: 0,
}

export const shootRandom: IShootConfig = {
  rangeTarget: 'random',
  rangeAccuracy: 50,
  rangeSpeed: 1500,
  rangeBulletSpeed: 120,
  rangeBulletSize: 1,
  rangeCount: 1,
  rangeCountDelay: 0,
  rangeShootChance: 1,
  rangeStartDelay: 500,
  rangeSpread: 20,
}

export const shootPlayer: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 50,
  rangeSpeed: 500,
  rangeBulletSpeed: 200,
  rangeBulletSize: 3,
  rangeCount: 3,
  rangeShootChance: 0.2,
  rangeCountDelay: 100,
  rangeStartDelay: 500,
  rangeSpread: 0,
}
