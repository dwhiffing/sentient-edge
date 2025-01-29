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

export const shootPlayer: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 10,
  rangeSpeed: 2000,
  rangeBulletSpeed: 180,
  rangeBulletSize: 1,
  rangeCount: 1,
  rangeShootChance: 1,
  rangeCountDelay: 0,
  rangeStartDelay: 500,
  rangeSpread: 0,
  rangeStopOnShoot: false,
}

// move around slowly, tanky, stops for a second, then flashes and shoots big, fast, bullet (slow snake, but with stopping to shoot)
export const shootPlayerOgre: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 10,
  rangeSpeed: 2000,
  rangeBulletSpeed: 180,
  rangeBulletSize: 3,
  rangeCount: 1,
  rangeShootChance: 1,
  rangeCountDelay: 0,
  rangeStartDelay: 500,
  rangeSpread: 0,
  rangeStopOnShoot: false,
}

// dashes toward player 5 times, then waits and shoots circular burst around self
export const shootPlayerGolem: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 10,
  rangeSpeed: 2000,
  rangeBulletSpeed: 180,
  rangeBulletSize: 3,
  rangeCount: 1,
  rangeShootChance: 1,
  rangeCountDelay: 0,
  rangeStartDelay: 500,
  rangeSpread: 0,
  rangeStopOnShoot: false,
}

// dash around randomly and shoot bullets (like snake but with many bullets)
export const shootPlayerSkeleton: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 10,
  rangeSpeed: 2000,
  rangeBulletSpeed: 180,
  rangeBulletSize: 3,
  rangeCount: 1,
  rangeShootChance: 1,
  rangeCountDelay: 0,
  rangeStartDelay: 500,
  rangeSpread: 0,
  rangeStopOnShoot: false,
}

export const shootPlayerDeath: IShootConfig = {
  rangeTarget: 'player',
  rangeAccuracy: 10,
  rangeSpeed: 2000,
  rangeBulletSpeed: 180,
  rangeBulletSize: 3,
  rangeCount: 1,
  rangeShootChance: 1,
  rangeCountDelay: 0,
  rangeStartDelay: 500,
  rangeSpread: 0,
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

// circle + sin wave + bullet hell
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
