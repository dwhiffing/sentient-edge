import { INodeType } from './nodes'

export { ENEMIES } from './enemies'
export { ITEMS } from './items'
export { type INode, MAP_DATA } from './nodes'

export const PLAYER_ATTACK_DELAY = 1200
export const PLAYER_ATTACK_DURATION = 500
export const CELL_ORDER = [6, 7, 8, 5, 4, 3, 0, 1, 2]
export const NODE_FRAMES: Record<INodeType, number> = {
  shop: 56,
  fight: 57,
  'fight-boss': 58,
}
