export type INodeType = 'fight' | 'fight-boss' | 'shop'
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

const LEVEL_1: INode[] = [
  {
    type: 'fight',
    id: 'desert-1',
    name: 'Desert 1',
    cellIndex: 6,
    x: 0.3,
    y: 0.5,
    enemies: { pool: ['snake'], min: 1, max: 1 },
  },
  {
    type: 'fight',
    id: 'desert-2',
    name: 'Desert 2',
    cellIndex: 6,
    x: 0.4,
    y: 0.5,
    enemies: { pool: ['snake'], min: 2, max: 2 },
  },
  {
    type: 'fight',
    id: 'desert-3',
    name: 'Desert 3',
    cellIndex: 6,
    x: 0.5,
    y: 0.5,
    enemies: { pool: ['snake'], min: 3, max: 3 },
  },
  {
    type: 'fight-boss',
    id: 'desert-4',
    name: 'Desert Boss',
    cellIndex: 6,
    x: 0.6,
    y: 0.5,
    enemies: { pool: ['snake'], min: 4, max: 4 },
  },
  {
    type: 'shop',
    id: 'desert-5',
    name: 'Desert Shop',
    cellIndex: 6,
    x: 0.4,
    y: 0.8,
  },
]

const LEVEL_2: INode[] = [
  {
    type: 'fight',
    id: 'desert-6',
    name: 'Desert 4',
    cellIndex: 7,
    x: 0.3,
    y: 0.8,
    enemies: { pool: ['snake'], min: 1, max: 1 },
  },
  {
    type: 'fight',
    id: 'desert-7',
    name: 'Desert 5',
    cellIndex: 7,
    x: 0.4,
    y: 0.8,
    enemies: { pool: ['snake'], min: 2, max: 2 },
  },
  {
    type: 'fight',
    id: 'desert-8',
    name: 'Desert 6',
    cellIndex: 7,
    x: 0.5,
    y: 0.8,
    enemies: { pool: ['snake'], min: 3, max: 3 },
  },
  {
    type: 'fight-boss',
    id: 'desert-9',
    name: 'Desert Boss',
    cellIndex: 7,
    x: 0.6,
    y: 0.5,
    enemies: { pool: ['snake'], min: 4, max: 4 },
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

export const MAP_DATA: INode[] = [...LEVEL_1, ...LEVEL_2]
