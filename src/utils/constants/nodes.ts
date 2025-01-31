import { IUpgradeKeys } from '../registry'

export type INodeType = 'fight' | 'fight-boss' | 'shop'
export type INode = {
  type: INodeType
  id: string
  name: string
  cellIndex: number
  cellMapFrame: number
  x: number
  y: number
  enemies?: { key: string; chance: number; min: number; max: number }[]
  items?: IUpgradeKeys[]
}

const RARE_ENEMY_RATE = 0.2
const LEVEL_1: INode[] = [
  {
    type: 'fight',
    id: 'desert-1a',
    name: 'Desert 1a',
    cellIndex: 6,
    cellMapFrame: 1,
    x: 0.45,
    y: 0.77,
    enemies: [
      { key: 'bug', chance: 1, min: 1, max: 1 },
      { key: 'bug-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'desert-1b',
    name: 'Desert 1b',
    cellIndex: 6,
    cellMapFrame: 1,
    x: 0.8,
    y: 0.6,
    enemies: [
      { key: 'bug', chance: 1, min: 2, max: 4 },
      { key: 'bug-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'desert-2a',
    name: 'Desert 2a',
    cellIndex: 7,
    cellMapFrame: 1,
    x: 0.2,
    y: 0.53,
    enemies: [
      { key: 'snake', chance: 1, min: 1, max: 1 },
      { key: 'snake-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'desert-2b',
    name: 'Desert 2b',
    cellIndex: 7,
    cellMapFrame: 1,
    x: 0.85,
    y: 0.54,
    enemies: [
      { key: 'snake', chance: 1, min: 2, max: 3 },
      { key: 'bug-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
      { key: 'snake-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'desert-3a',
    name: 'Desert 3a',
    cellIndex: 8,
    cellMapFrame: 1,
    x: 0.15,
    y: 0.55,
    enemies: [
      { key: 'snake', chance: 1, min: 2, max: 3 },
      { key: 'bug', chance: 1, min: 1, max: 2 },
      { key: 'bug-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
      { key: 'snake-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'desert-3b',
    name: 'Desert 3b',
    cellIndex: 8,
    cellMapFrame: 1,
    x: 0.55,
    y: 0.4,
    enemies: [
      { key: 'snake', chance: 1, min: 3, max: 4 },
      { key: 'bug', chance: 1, min: 2, max: 4 },
      { key: 'bug-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
      { key: 'snake-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight-boss',
    id: 'desert-3c',
    name: 'Desert Boss',
    cellIndex: 8,
    cellMapFrame: 1,
    x: 0.45,
    y: 0.17,
    enemies: [{ key: 'anubis', chance: 1, min: 1, max: 1 }],
  },
  {
    type: 'shop',
    id: 'desert-s1',
    name: 'Desert Shop',
    cellIndex: 6,
    cellMapFrame: 1,
    x: 0.1,
    y: 0.85,
    items: ['damageMeleeBase', 'speedMoveMulti'],
  },

  {
    type: 'shop',
    id: 'desert-s2',
    name: 'Desert Shop 2',
    cellIndex: 8,
    cellMapFrame: 1,
    x: 0.44,
    y: 0.65,
    items: ['healthMax', 'damageMulti', 'sizeBase'],
  },
]

const LEVEL_2: INode[] = [
  {
    type: 'fight',
    id: 'forest-1a',
    name: 'Forest 1a',
    cellIndex: 5,
    cellMapFrame: 2,
    x: 0.575,
    y: 0.8,
    enemies: [
      { key: 'spider', chance: 1, min: 1, max: 1 },
      { key: 'spider-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'forest-1b',
    name: 'Forest 1b',
    cellIndex: 5,
    cellMapFrame: 2,
    x: 0.16,
    y: 0.58,
    enemies: [
      { key: 'spider', chance: 1, min: 2, max: 4 },
      { key: 'spider-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'forest-2a',
    name: 'Forest 2a',
    cellIndex: 4,
    cellMapFrame: 2,
    x: 0.8,
    y: 0.58,
    enemies: [
      { key: 'snail', chance: 1, min: 2, max: 2 },
      { key: 'snail-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'forest-2b',
    name: 'Forest 2b',
    cellIndex: 4,
    cellMapFrame: 2,
    x: 0.15,
    y: 0.62,
    enemies: [
      { key: 'snail', chance: 1, min: 2, max: 3 },
      { key: 'spider-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
      { key: 'snail-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'forest-3a',
    name: 'Forest 3a',
    cellIndex: 3,
    cellMapFrame: 2,
    x: 0.7,
    y: 0.67,
    enemies: [
      { key: 'snail', chance: 1, min: 2, max: 3 },
      { key: 'spider', chance: 1, min: 2, max: 3 },
      { key: 'spider-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
      { key: 'snail-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'forest-3b',
    name: 'Forest 3b',
    cellIndex: 3,
    cellMapFrame: 2,
    x: 0.18,
    y: 0.5,
    enemies: [
      { key: 'snail', chance: 1, min: 3, max: 4 },
      { key: 'spider', chance: 1, min: 2, max: 4 },
      { key: 'spider-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
      { key: 'snail-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight-boss',
    id: 'forest-3d',
    name: 'Forest Boss',
    cellIndex: 3,
    cellMapFrame: 2,
    x: 0.2,
    y: 0.2,
    enemies: [{ chance: 1, min: 1, max: 1, key: 'knight' }],
  },

  {
    type: 'shop',
    id: 'forest-s1',
    name: 'Forest Shop',
    cellIndex: 4,
    cellMapFrame: 2,
    x: 0.5,
    y: 0.65,
    items: ['rangeCount', 'speedMeleeMulti', 'defenseMelee'],
  },
]

const LEVEL_3: INode[] = [
  {
    type: 'fight',
    id: 'mountain-1a',
    name: 'Mountain 1a',
    cellIndex: 0,
    cellMapFrame: 4,
    x: 0.45,
    y: 0.6,
    enemies: [
      { key: 'roller', chance: 1, min: 2, max: 3 },
      { key: 'roller-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'mountain-1b',
    name: 'Mountain 1b',
    cellIndex: 0,
    cellMapFrame: 4,
    x: 0.6,
    y: 0.4,
    enemies: [
      { key: 'ogre', chance: 1, min: 2, max: 3 },
      { key: 'ogre-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },

  {
    type: 'fight',
    id: 'mountain-2a',
    name: 'Mountain 2a',
    cellIndex: 1,
    cellMapFrame: 4,
    x: 0.36,
    y: 0.5,
    enemies: [
      { key: 'roller', chance: 1, min: 1, max: 2 },
      { key: 'ogre', chance: 1, min: 1, max: 2 },
      { key: 'roller-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
      { key: 'ogre-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'mountain-2b',
    name: 'Mountain 2b',
    cellIndex: 1,
    cellMapFrame: 4,
    x: 0.63,
    y: 0.7,
    enemies: [
      { key: 'roller', chance: 1, min: 2, max: 3 },
      { key: 'ogre', chance: 1, min: 2, max: 3 },
      { key: 'roller-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
      { key: 'ogre-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight-boss',
    id: 'mountain-2c',
    name: 'Mountain Boss',
    cellIndex: 1,
    cellMapFrame: 4,
    x: 0.8,
    y: 0.87,
    enemies: [{ chance: 1, min: 1, max: 1, key: 'golem' }],
  },
  {
    type: 'shop',
    id: 'mountain-s1',
    name: 'Mountain Shop',
    cellIndex: 0,
    cellMapFrame: 4,
    x: 0.35,
    y: 0.8,
    items: ['damageRangeBase', 'defenseRanged', 'earnRateMulti'],
  },
]

const LEVEL_4: INode[] = [
  {
    type: 'fight',
    id: 'castle-2a',
    name: 'Castle 2a',
    cellIndex: 2,
    cellMapFrame: 5,
    x: 0.52,
    y: 0.8,
    enemies: [
      { key: 'zombie', chance: 1, min: 2, max: 3 },
      { key: 'zombie-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'castle-2b',
    name: 'Castle 2b',
    cellIndex: 2,
    cellMapFrame: 5,
    x: 0.52,
    y: 0.55,
    enemies: [
      { key: 'skeleton', chance: 1, min: 2, max: 3 },
      { key: 'skeleton-rare', chance: RARE_ENEMY_RATE, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight',
    id: 'castle-2c',
    name: 'Castle 2c',
    cellIndex: 2,
    cellMapFrame: 5,
    x: 0.52,
    y: 0.4,
    enemies: [
      { key: 'zombie', chance: 1, min: 2, max: 3 },
      { key: 'skeleton', chance: 1, min: 2, max: 3 },
      { key: 'zombie-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
      { key: 'skeleton-rare', chance: RARE_ENEMY_RATE / 2, min: 1, max: 1 },
    ],
  },
  {
    type: 'fight-boss',
    id: 'castle-2e',
    name: 'Castle Boss',
    cellIndex: 2,
    cellMapFrame: 5,
    x: 0.52,
    y: 0.2,
    enemies: [{ chance: 1, min: 1, max: 1, key: 'death' }],
  },
  {
    type: 'shop',
    id: 'castle-s1',
    name: 'Castle Shop',
    cellIndex: 2,
    cellMapFrame: 5,
    x: 0.1,
    y: 0.85,
    items: ['damageMeleeFreq'],
  },
]

export const MAP_DATA: INode[] = [
  ...LEVEL_1,
  ...LEVEL_2,
  ...LEVEL_3,
  ...LEVEL_4,
]
