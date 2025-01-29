import {
  IMoveConfig,
  IMoveOrder,
  moveConfigHornet,
  moveConfigSnake,
  moveConfigWasp,
  movementNormal,
} from './moveConfigs'
import { IShootConfig, shootNone } from './shootConfigs'

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
      label: 'wasp',
      color: 0xffff00,
      frame: 24,
      health: [4, 4],
      meleeDamage: [1, 1],
      gold: [4, 8],
      moveConfigs: moveConfigWasp,
    },
    { color: 0xff0000, label: 'hornet', moveConfigs: moveConfigHornet },
  ),
  ...getEnemy(
    {
      key: 'snake',
      frame: 25,
      color: 0x00ff00,
      health: [10, 10],
      meleeDamage: [3, 3],
      rangeDamage: [1, 1],
      gold: [10, 20],
      moveConfigs: moveConfigSnake,
    },
    { color: 0x00ff00 },
  ),
  ...getEnemy({
    key: 'anubis',
    frame: 26,
    health: [100, 100],
    meleeDamage: [10, 30],
    gold: [100, 120],
    rangeDamage: [2, 4],
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
