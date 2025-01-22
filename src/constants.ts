type INode = {
  type: 'fight' | 'fight-boss' | 'shop'
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
