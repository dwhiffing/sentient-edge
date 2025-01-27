type IMoveConfig = {
  moveTarget: IMoveTargets
  speed: number
  moveEventDelay: number
  moveSpreadBias: number
  moveMaxDistance: number
}
type IShootConfig = {
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
type IEnemyStats = IMoveConfig &
  IShootConfig & {
    key: string
    label: string
    frame: number
    shootRate: number
    meleeDamage: number[]
    rangeDamage: number[]
    health: number[]
    gold: number[]
    color: number
  }

type IShootTargets = 'player' | 'random'
type IMoveTargets = 'player' | 'center' | 'random' | 'spawn'

const movementNormal: IMoveConfig = {
  moveTarget: 'center' as IMoveTargets,
  moveEventDelay: 500,
  moveSpreadBias: 0.2,
  moveMaxDistance: 200,
  speed: 20,
}

const movementErratic: IMoveConfig = {
  speed: 10,
  moveTarget: 'player',
  moveEventDelay: 600,
  moveSpreadBias: 0,
  moveMaxDistance: 200,
}

const shootNone: IShootConfig = {
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

const shootRandom: IShootConfig = {
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

const shootPlayer: IShootConfig = {
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

const defaultStats = {
  ...shootNone,
  ...movementNormal,

  health: [10, 10],
  meleeDamage: [1, 1],
  rangeDamage: [1, 1],
  gold: [1, 10],
  color: 0xffffff,
}

const getEnemy = (
  _enemy: Partial<IEnemyStats>,
  _rare?: Partial<IEnemyStats>,
) => {
  const normal = {
    ...defaultStats,
    label: _enemy.key,
    ..._enemy,
  } as IEnemyStats
  // by default, rare enemies should have 5x health, 10x money, and do 5x damage
  const rare = {
    ...normal,
    label: `${_enemy.key}-rare`,
    key: `${_enemy.key}-rare`,
    color: 0xffff00,
    health: [normal.health[0] * 5, normal.health[1] * 5],
    meleeDamage: [normal.meleeDamage[0] * 5, normal.meleeDamage[1] * 5],
    rangeDamage: [normal.rangeDamage[0] * 5, normal.rangeDamage[1] * 5],
    gold: [normal.gold[0] * 10, normal.gold[1] * 10],
    ...(_rare ?? {}),
  } as IEnemyStats
  return [normal, rare]
}

export const ENEMIES: IEnemyStats[] = [
  ...getEnemy(
    {
      key: 'bug',
      frame: 24,
      health: [4, 4],
      meleeDamage: [1, 4],
      rangeDamage: [1, 1],
      gold: [1, 10],
      ...shootPlayer,
      ...movementErratic,
    },
    { color: 0x00ff00 },
  ),
  ...getEnemy(
    {
      key: 'snake',
      frame: 25,
      health: [10, 10],
      meleeDamage: [2, 8],
      rangeDamage: [1, 1],
      gold: [10, 20],
    },
    { color: 0x00ff00 },
  ),
  ...getEnemy({
    key: 'anubis',
    frame: 26,
    health: [100, 100],
    meleeDamage: [10, 30],
    rangeDamage: [2, 4],
    gold: [100, 120],
  }),
  ...getEnemy({ key: 'spider', frame: 27 }),
  ...getEnemy({ key: 'snail', frame: 28 }),
  ...getEnemy({ key: 'knight', frame: 29 }),
  ...getEnemy({ key: 'roller', frame: 30 }),
  ...getEnemy({ key: 'ogre', frame: 31 }),
  ...getEnemy({ key: 'golem', frame: 32 }),
  ...getEnemy({ key: 'zombie', frame: 33 }),
  ...getEnemy({ key: 'skeleton', frame: 34 }),
  ...getEnemy({ key: 'death', frame: 35 }),
]
