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
  rangeStopOnShoot: boolean
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
  rangeStopOnShoot: false,
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
  rangeStopOnShoot: false,
}

export const shootPlayerSpider: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 10,
  rangeSpeed: 3000,
  rangeBulletSpeed: 120,
  rangeBulletSize: 1,
  rangeCount: 1,
  rangeShootChance: 1,
  rangeCountDelay: 0,
  rangeStartDelay: 500,
  rangeSpread: 0,
  rangeStopOnShoot: false,
}

export const shootPlayerOgre: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 10,
  rangeSpeed: 2000,
  rangeBulletSpeed: 120,
  rangeBulletSize: 3,
  rangeCount: 1,
  rangeShootChance: 0.5,
  rangeCountDelay: 0,
  rangeStartDelay: 750,
  rangeSpread: 0,
  rangeStopOnShoot: false,
}

// TODO: dashes toward player 5 times, then waits and shoots circular burst around self
export const shootPlayerGolem: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 0,
  rangeSpeed: 3000,
  rangeBulletSpeed: 110,
  rangeBulletSize: 3,
  rangeCount: 5,
  rangeShootChance: 0.66,
  rangeCountDelay: 0,
  rangeStartDelay: 750,
  rangeSpread: 30,
  rangeStopOnShoot: false,
}

// TODO: dash around randomly and shoot bullets (like snake but with many bullets)
export const shootPlayerSkeleton: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 20,
  rangeSpeed: 2500,
  rangeBulletSpeed: 130,
  rangeBulletSize: 2,
  rangeCount: 3,
  rangeShootChance: 0.66,
  rangeCountDelay: 150,
  rangeStartDelay: 500,
  rangeSpread: 0,
  rangeStopOnShoot: false,
}

// TODO: circle + sin wave + bullet hell
export const shootPlayerDeath: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 10,
  rangeSpeed: 1500,
  rangeBulletSpeed: 150,
  rangeBulletSize: 3,
  rangeCount: 7,
  rangeShootChance: 0.33,
  rangeCountDelay: 0,
  rangeStartDelay: 500,
  rangeSpread: 50,
  rangeStopOnShoot: false,
}

export const shootPlayerKnight: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 60,
  rangeSpeed: 2500,
  rangeBulletSpeed: 150,
  rangeBulletSize: 2,
  rangeCount: 3,
  rangeShootChance: 1,
  rangeCountDelay: 100,
  rangeStartDelay: 500,
  rangeSpread: 0,
  rangeStopOnShoot: false,
}

export const shootPlayerBurst: IShootConfig = {
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
  rangeStopOnShoot: false,
}
