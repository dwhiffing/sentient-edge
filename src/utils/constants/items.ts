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
