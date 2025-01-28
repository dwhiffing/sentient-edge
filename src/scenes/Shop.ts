import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { IUpgradeKeys, registry } from '../utils/registry'
import { INode, ITEMS, MAP_DATA } from '../utils/constants'

export class Shop extends Scene {
  background: Phaser.GameObjects.Sprite
  shopkeep: Phaser.GameObjects.Sprite
  player: Player
  items: Phaser.Physics.Arcade.Sprite[]
  activeItemKey?: IUpgradeKeys
  allowPurchase: boolean
  node: INode

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

    this.activeItemKey = undefined
    this.allowPurchase = true

    this.player = new Player(this, { x: width / 2, y: height - 20 })

    this.node = MAP_DATA.find((d) => d.id === registry.values.activeNode)!

    const nodeItems = this.node.items ?? []
    this.items = nodeItems.map((key, i) =>
      this.createItem(key, i, nodeItems.length),
    )

    this.input.on('pointerdown', () => {
      if (this.activeItemKey) {
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
      this.activeItemKey = undefined
    }
  }

  createItem = (key: string, index: number, itemCount: number) => {
    const _item = ITEMS.find((i) => i.key === key)!

    const { width, height } = this.cameras.main
    let xo = 0
    if (itemCount === 2) {
      xo = index === 0 ? -25 : 25
    } else if (itemCount === 3) {
      xo = index === 0 ? -50 : index === 1 ? 0 : 50
    }

    // player/sword icon
    this.add.sprite(
      width / 2 + xo - 8,
      height / 2 + 10,
      'spritesheet',
      _item.temporary ? 53 : 40,
    )
    // upgrade icon
    this.add.sprite(
      width / 2 + xo + 8,
      height / 2 + 10,
      'spritesheet',
      _item.frame,
    )

    return this.physics.add
      .sprite(width / 2 + xo, height / 2 + 10, 'spritesheet', 10)
      .setVisible(false)
      .setOrigin(0.5, 0.5)
      .setSize(30, 20)
      .setData('key', key)
  }

  buyItem = (key: string) => {
    if (!this.allowPurchase) return

    this.allowPurchase = false

    this.time.delayedCall(1500, () => {
      this.allowPurchase = true
    })

    const _item = ITEMS.find((i) => i.key === key)!
    const currentGold = registry.values.gold

    // TODO: check if player is at max effect and disable if so
    const level = registry.values.upgrades[key as IUpgradeKeys]
    const cost = _item.effects[level]?.cost
    if (level >= _item.effects.length) {
      this.shopkeepTalk("You've already maxed it out")
    } else if (currentGold >= cost) {
      registry.set('gold', currentGold - cost)
      const currentUpgrade = registry.values.upgrades
      registry.set('upgrades', {
        ...currentUpgrade,
        [key]: (currentUpgrade[key as keyof typeof currentUpgrade] ?? 0) + 1,
      })
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
    this.activeItemKey = item.getData('key') as IUpgradeKeys
    const itemData = ITEMS.find((i) => i.key === this.activeItemKey)!
    const level = registry.values.upgrades[this.activeItemKey]
    const effect = itemData.effects[level]
    const cost = effect?.cost
    // TODO: display all effects if there is more than 1
    const change = effect.effects[0].change
    if (registry.values.hudText === '') {
      if (level < itemData.effects.length) {
        this.shopkeepTalk(
          itemData.text
            .replace('{cost}', `${cost}`)
            .replace('{change}', `${change}`),
        )
      } else {
        this.shopkeepTalk("You've already maxed it out")
      }
    }
  }

  backToMap() {
    this.scene.start('CellMap')
  }
}
