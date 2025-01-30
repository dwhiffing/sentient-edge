import {
  IMoveConfig,
  IMoveOrder,
  moveConfigAnubis,
  moveConfigDeath,
  moveConfigGolem,
  moveConfigKnight,
  moveConfigOgre,
  moveConfigRoller,
  moveConfigSkeleton,
  moveConfigSnail,
  moveConfigSnake,
  moveConfigWasp,
  moveConfigZombie,
  movementNormal,
} from './moveConfigs'
import {
  IShootConfig,
  shootNone,
  shootPlayerSpider,
  shootPlayerDeath,
  shootPlayerGolem,
  shootPlayerKnight,
  shootPlayerOgre,
  shootPlayerSkeleton,
} from './shootConfigs'

type IEnemyStats = IShootConfig & {
  key: string
  label: string
  frame: number
  shootRate: number
  meleeDamage: number[]
  rangeDamage: number[]
  health: number[]
  gold: number[]
  color: number
  moveOrder: IMoveOrder
  moveConfigs: IMoveConfig[]
}

const defaultStats = {
  ...shootNone,
  moveOrder: 'sequence',
  moveConfigs: [movementNormal],
  health: [9, 9],
  meleeDamage: [1, 1],
  rangeDamage: [1, 1],
  gold: [8, 12],
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
      label: 'wasp',
      color: 0xf3a833,
      frame: 24,
      health: [4, 4],
      gold: [8, 12],
      moveConfigs: moveConfigWasp,
    },
    { color: 0xec273f, label: 'hornet' },
  ),
  ...getEnemy(
    {
      key: 'snake',
      label: 'cobra',
      frame: 25,
      color: 0x5ab552,
      meleeDamage: [2, 2],
      health: [9, 9],
      gold: [18, 25],
      moveConfigs: moveConfigSnake,
    },
    { color: 0xac2847, label: 'copperhead' },
  ),
  ...getEnemy({
    key: 'anubis',
    frame: 26,
    health: [60, 60],
    meleeDamage: [4, 4],
    gold: [250, 250],
    color: 0xec273f,
    moveConfigs: moveConfigAnubis,
  }),
  ...getEnemy(
    {
      key: 'spider',
      frame: 27,
      label: 'tarantula',
      color: 0xa26d3f,
      health: [25, 25],
      gold: [40, 50],
      rangeDamage: [6, 6],
      meleeDamage: [4, 4],
      moveConfigs: moveConfigWasp,
      ...shootPlayerSpider,
    },
    { color: 0x2c1e31, label: 'widow' },
  ),
  ...getEnemy(
    {
      key: 'snail',
      frame: 28,
      color: 0xcc99ff,
      label: 'land snail',
      health: [60, 60],
      gold: [50, 60],
      meleeDamage: [6, 6],
      moveConfigs: moveConfigSnail,
    },
    { color: 0x36c5f4, label: 'cone snail' },
  ),
  ...getEnemy({
    key: 'knight',
    frame: 29,
    color: 0xb0a7b8,
    health: [150, 150],
    gold: [200, 250],
    meleeDamage: [6, 6],
    rangeDamage: [2, 2],
    moveConfigs: moveConfigKnight,
    ...shootPlayerKnight,
  }),
  ...getEnemy(
    {
      key: 'roller',
      label: 'roller',
      frame: 30,
      color: 0xde5d3a,
      health: [60, 60],
      gold: [80, 100],
      meleeDamage: [10, 10],
      moveConfigs: moveConfigRoller,
    },
    { label: 'speed demon', color: 0x10121c },
  ),
  ...getEnemy(
    {
      key: 'ogre',
      label: 'troll',
      frame: 31,
      color: 0xa26d3f,
      health: [120, 120],
      gold: [120, 150],
      meleeDamage: [15, 15],
      rangeDamage: [15, 15],
      moveConfigs: moveConfigOgre,
      ...shootPlayerOgre,
    },
    { label: 'ogre', color: 0x5ab552 },
  ),
  ...getEnemy({
    key: 'golem',
    frame: 32,
    color: 0xa6cb96,
    health: [300, 300],
    gold: [300, 500],
    meleeDamage: [15, 15],
    moveConfigs: moveConfigGolem,
    ...shootPlayerGolem,
  }),
  ...getEnemy(
    {
      key: 'zombie',
      label: 'shambler',
      frame: 33,
      color: 0x9de64e,
      health: [120, 120],
      gold: [150, 200],
      meleeDamage: [15, 15],
      moveConfigs: moveConfigZombie,
    },
    { label: 'ghoul', color: 0x36c5f4 },
  ),
  ...getEnemy(
    {
      key: 'skeleton',
      label: 'skeleton',
      frame: 34,
      color: 0xdeceed,
      health: [120, 120],
      gold: [150, 200],
      meleeDamage: [15, 15],
      rangeDamage: [15, 15],
      ...shootPlayerSkeleton,
      moveConfigs: moveConfigSkeleton,
    },
    { label: 'bone walker', color: 0xa6cb96 },
  ),
  ...getEnemy({
    key: 'death',
    frame: 35,
    color: 0x2c1e31,
    health: [500, 500],
    gold: [1000, 2000],
    meleeDamage: [15, 15],
    rangeDamage: [15, 15],
    ...shootPlayerDeath,
    moveConfigs: moveConfigDeath,
  }),
]
