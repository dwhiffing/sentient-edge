export const CELL_ORDER = [6, 7, 8, 5, 4, 3, 0, 1, 2]
export const NODE_FRAMES: Record<INodeType, number> = {
  shop: 56,
  fight: 57,
  'fight-boss': 58,
}

type IPurchasable = {
  key: number
  cost: number
  type: string
  text: string
  frame: number
}
export const ITEMS: IPurchasable[] = [
  {
    key: 0,
    cost: 5,
    type: 'potion',
    frame: 51,
    text: 'That costs {cost} gold.  It will\nupgrade your health.',
  },
  {
    key: 1,
    cost: 10,
    type: 'random',
    frame: 52,
    text: 'That costs {cost} gold.  It will\nupgrade your speed.',
  },
  {
    key: 2,
    cost: 20,
    type: 'ring',
    frame: 53,
    text: 'That costs {cost} gold.  It will\nupgrade your strength.',
  },
]

type INodeType = 'fight' | 'fight-boss' | 'shop'
export type INode = {
  type: INodeType
  id: string
  name: string
  cellIndex: number
  x: number
  y: number
  enemies?: {
    pool: string[]
    min: number
    max: number
  }
}
export const MAP_DATA: INode[] = [
  // LEVEL 1
  {
    type: 'fight',
    id: 'desert-1',
    name: 'Desert 1',
    cellIndex: 6,
    x: 0.3,
    y: 0.5,
    enemies: { pool: ['enemy-1'], min: 1, max: 1 },
  },
  {
    type: 'fight',
    id: 'desert-2',
    name: 'Desert 2',
    cellIndex: 6,
    x: 0.4,
    y: 0.5,
    enemies: { pool: ['enemy-1'], min: 2, max: 2 },
  },
  {
    type: 'fight',
    id: 'desert-3',
    name: 'Desert 3',
    cellIndex: 6,
    x: 0.5,
    y: 0.5,
    enemies: { pool: ['enemy-1'], min: 3, max: 3 },
  },
  {
    type: 'fight-boss',
    id: 'desert-4',
    name: 'Desert Boss',
    cellIndex: 6,
    x: 0.6,
    y: 0.5,
    enemies: { pool: ['enemy-1'], min: 4, max: 4 },
  },
  {
    type: 'shop',
    id: 'desert-5',
    name: 'Desert Shop',
    cellIndex: 6,
    x: 0.4,
    y: 0.8,
  },
  // LEVEL 2
  {
    type: 'fight',
    id: 'desert-6',
    name: 'Desert 4',
    cellIndex: 7,
    x: 0.3,
    y: 0.8,
    enemies: { pool: ['enemy-1'], min: 1, max: 1 },
  },
  {
    type: 'fight',
    id: 'desert-7',
    name: 'Desert 5',
    cellIndex: 7,
    x: 0.4,
    y: 0.8,
    enemies: { pool: ['enemy-1'], min: 2, max: 2 },
  },
  {
    type: 'fight',
    id: 'desert-8',
    name: 'Desert 6',
    cellIndex: 7,
    x: 0.5,
    y: 0.8,
    enemies: { pool: ['enemy-1'], min: 3, max: 3 },
  },
  {
    type: 'fight-boss',
    id: 'desert-9',
    name: 'Desert Boss',
    cellIndex: 7,
    x: 0.6,
    y: 0.5,
    enemies: { pool: ['enemy-1'], min: 4, max: 4 },
  },
  {
    type: 'shop',
    id: 'desert-10',
    name: 'Desert Shop 2',
    cellIndex: 7,
    x: 0.1,
    y: 0.8,
  },
]
