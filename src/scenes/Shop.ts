import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { registry } from '../utils/registry'

type IPurchasable = {
  key: number
  cost: number
  type: string
  text: string
  frame: number
}
const ITEMS: IPurchasable[] = [
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

export class Shop extends Scene {
  background: Phaser.GameObjects.Sprite
  shopkeep: Phaser.GameObjects.Sprite
  player: Player
  items: Phaser.Physics.Arcade.Sprite[]
  activeItemKey: number
  allowPurchase: boolean

  constructor() {
    super('Shop')
  }

  create() {
    const { width, height } = this.cameras.main
    this.background = this.add.sprite(width / 2, height / 2, 'map', 5)
    this.shopkeep = this.add
      .sprite(width / 2, height / 2 - 10, 'spritesheet', 0)
      .play('shopkeep-idle')
      .setOrigin(0.5, 1)
    this.items = [
      this.createItem(0, 0),
      this.createItem(1, 1),
      this.createItem(2, 2),
    ]

    this.activeItemKey = -1
    this.allowPurchase = true

    this.player = new Player(this, { speed: 60 })

    this.input.on('pointerdown', () => {
      if (this.activeItemKey !== -1) {
        this.buyItem(this.activeItemKey)
      }
    })
  }

  update() {
    this.player.update()

    if (this.player.isNearEdge()) this.backToMap()

    const overlap = this.physics.overlap(
      this.player.sprite,
      this.items,
      this.hitPlayerItem,
    )
    if (!overlap) {
      registry.set('hudText', '')
      this.shopkeep.play('shopkeep-idle')
      this.activeItemKey = -1
    }
  }

  createItem = (key: number, index: number) => {
    const _item = ITEMS.find((i) => i.key === key)!

    const { width, height } = this.cameras.main
    const xo = index === 0 ? -50 : index === 1 ? 0 : 50
    return this.physics.add
      .sprite(width / 2 + xo, height / 2 + 10, 'spritesheet', _item.frame)
      .setOrigin(0.5, 0.5)
      .setSize(20, 20)
      .setData('key', key)
      .setData('cost', _item.cost)
      .setData('text', _item.text.replace('{cost}', `${_item.cost}`))
  }

  buyItem = (key: number) => {
    if (!this.allowPurchase) return

    this.allowPurchase = false

    this.time.delayedCall(1500, () => {
      this.allowPurchase = true
    })

    const _item = ITEMS.find((i) => i.key === key)!
    const currentGold = registry.values.gold
    if (currentGold >= _item.cost) {
      registry.set('gold', currentGold - _item.cost)
      this.shopkeepTalk('Pleasure doing business\nwith you! :)', 1500)
    } else {
      this.shopkeepTalk("You can't afford that", 1500)
    }
  }

  shopkeepTalk = (text: string, timeout?: number) => {
    registry.set('hudText', text)
    this.shopkeep.play('shopkeep-talk', true)
    if (timeout)
      this.time.delayedCall(timeout, () => {
        registry.set('hudText', '')
      })
  }

  hitPlayerItem = (_player: unknown, _item: unknown) => {
    const item = _item as Phaser.Physics.Arcade.Sprite
    if (registry.values.hudText === '') this.shopkeepTalk(item.getData('text'))
    this.activeItemKey = item.getData('key') as number
  }

  backToMap() {
    this.scene.start('CellMap')
  }
}
