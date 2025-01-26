type IEnemyStats = {
  key: string
  frame: number
  shootRate: number
  meleeDamage: number[]
  rangeDamage: number[]
  health: number[]
  gold: number[]
  color: number

  moveTarget: IMoveTargets
  speed: number
  moveEventDelay: number
  moveSpreadBias: number
  moveMaxDistance: number
}
type IMoveTargets = 'player' | 'center' | 'random' | 'spawn'
const defaultStats = {
  shootRate: 0,
  health: [10, 10],
  meleeDamage: [1, 1],
  rangeDamage: [1, 1],
  gold: [1, 10],
  speed: 20,
  moveTarget: 'center' as IMoveTargets,
  moveEventDelay: 500,
  moveSpreadBias: 0.2,
  moveMaxDistance: 200,
}

export const ENEMIES: IEnemyStats[] = [
  {
    ...defaultStats,
    color: 0xffffff,
    key: 'bug',
    frame: 24,
    shootRate: 0,
    health: [4, 4],
    meleeDamage: [1, 4],
    rangeDamage: [1, 1],
    gold: [1, 10],
    speed: 40,
    moveTarget: 'spawn',
    moveEventDelay: 200,
    moveSpreadBias: 0.7,
    moveMaxDistance: 50,
  },
  {
    ...defaultStats,
    color: 0x00ff00,
    key: 'snake',
    frame: 25,
    shootRate: 0,
    health: [10, 10],
    meleeDamage: [2, 8],
    rangeDamage: [1, 1],
    gold: [10, 20],
  },
  {
    ...defaultStats,
    color: 0xffffff,
    key: 'anubis',
    frame: 26,
    shootRate: 1,
    health: [100, 100],
    meleeDamage: [10, 30],
    rangeDamage: [2, 4],
    gold: [100, 120],
  },
  { ...defaultStats, color: 0xffffff, key: 'spider', frame: 27 },
  { ...defaultStats, color: 0xffffff, key: 'snail', frame: 28 },
  { ...defaultStats, color: 0xffffff, key: 'knight', frame: 29 },
  { ...defaultStats, color: 0xffffff, key: 'roller', frame: 30 },
  { ...defaultStats, color: 0xffffff, key: 'ogre', frame: 31 },
  { ...defaultStats, color: 0xffffff, key: 'golem', frame: 32 },
  { ...defaultStats, color: 0xffffff, key: 'zombie', frame: 33 },
  { ...defaultStats, color: 0xffffff, key: 'skeleton', frame: 34 },
  { ...defaultStats, color: 0xffffff, key: 'death', frame: 35 },
]
