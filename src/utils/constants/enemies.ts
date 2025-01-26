type IEnemyStats = {
  key: string
  frame: number
  shootRate: number
  color: number
  damage: number[]
  health: number[]
}

export const ENEMIES: IEnemyStats[] = [
  {
    color: 0xffffff,
    key: 'bug',
    frame: 24,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    color: 0x00ff00,
    key: 'snake',
    frame: 25,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    color: 0xffffff,
    key: 'anubis',
    frame: 26,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    color: 0xffffff,
    key: 'spider',
    frame: 27,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    color: 0xffffff,
    key: 'snail',
    frame: 28,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    color: 0xffffff,
    key: 'knight',
    frame: 29,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    color: 0xffffff,
    key: 'roller',
    frame: 30,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    color: 0xffffff,
    key: 'ogre',
    frame: 31,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    color: 0xffffff,
    key: 'golem',
    frame: 32,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    color: 0xffffff,
    key: 'zombie',
    frame: 33,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
  {
    key: 'skeleton',
    frame: 34,
    shootRate: 0,
    health: [10, 10],
    color: 0xffffff,
    damage: [1, 1],
  },
  {
    color: 0xffffff,
    key: 'death',
    frame: 35,
    shootRate: 0,
    health: [10, 10],
    damage: [1, 1],
  },
]
