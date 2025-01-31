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
  const rare = {
    ...normal,
    label: `${_enemy.key}-rare`,
    key: `${_enemy.key}-rare`,
    health: [normal.health[0] * 3, normal.health[1] * 3],
    meleeDamage: [normal.meleeDamage[0] * 2, normal.meleeDamage[1] * 2],
    rangeDamage: [normal.rangeDamage[0] * 2, normal.rangeDamage[1] * 2],
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
      gold: [50, 75],
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
      label: 'snail',
      health: [45, 45],
      gold: [75, 100],
      meleeDamage: [6, 6],
      moveConfigs: moveConfigSnail,
    },
    { color: 0x36c5f4, label: 'cone snail' },
  ),
  ...getEnemy({
    key: 'knight',
    frame: 29,
    color: 0xb0a7b8,
    health: [200, 200],
    gold: [500, 500],
    meleeDamage: [10, 10],
    rangeDamage: [6, 6],
    moveConfigs: moveConfigKnight,
    ...shootPlayerKnight,
  }),
  ...getEnemy(
    {
      key: 'roller',
      label: 'roller',
      frame: 30,
      color: 0xde5d3a,
      health: [75, 75],
      gold: [125, 200],
      meleeDamage: [12, 12],
      moveConfigs: moveConfigRoller,
    },
    { label: 'speed demon', color: 0x6b2643 },
  ),
  ...getEnemy(
    {
      key: 'ogre',
      label: 'troll',
      frame: 31,
      color: 0xa26d3f,
      health: [100, 100],
      gold: [175, 250],
      meleeDamage: [12, 12],
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
    health: [400, 400],
    gold: [2000, 2000],
    meleeDamage: [15, 15],
    rangeDamage: [15, 15],
    moveConfigs: moveConfigGolem,
    ...shootPlayerGolem,
  }),
  ...getEnemy(
    {
      key: 'zombie',
      label: 'shambler',
      frame: 33,
      color: 0x9de64e,
      health: [200, 200],
      gold: [500, 1000],
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
      health: [150, 150],
      gold: [500, 1000],
      meleeDamage: [10, 10],
      rangeDamage: [12, 12],
      ...shootPlayerSkeleton,
      moveConfigs: moveConfigSkeleton,
    },
    { label: 'bone walker', color: 0xa6cb96 },
  ),
  ...getEnemy({
    key: 'death',
    frame: 35,
    color: 0x6b2643,
    health: [1000, 1000],
    gold: [1000, 2000],
    meleeDamage: [27, 27],
    rangeDamage: [20, 20],
    ...shootPlayerDeath,
    moveConfigs: moveConfigDeath,
  }),
]
