import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { MAP_DATA, NODE_FRAMES } from '../utils/constants'
import { registry } from '../utils/registry'

export class CellMap extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  nodes: Phaser.GameObjects.Group

  constructor() {
    super('CellMap')
  }

  init() {
    if (this.player) registry.set('health', this.player.stats.healthMax)
  }

  create() {
    const zoomIndex = registry.values.activeZoom
    const w = this.cameras.main.width
    const zoomX = zoomIndex % 3
    const zoomY = Math.floor(zoomIndex / 3)

    this.background = this.add
      .sprite(-w * zoomX, -w * zoomY, 'map', 0)
      .setOrigin(0)
      .setScale(3)

    this.nodes = this.add.group({ defaultKey: 'spritesheet' })
    this.updateNodes()

    this.player = new Player(this, { sword: true })
    registry.set('health', this.player.stats.healthMax)

    this.input.on(
      'pointerdown',
      (_pointer: Phaser.Input.Pointer, targets: any[]) => {
        if (this.scene.isActive('Stats')) return
        if (targets.length === 0) this.enterNearbyNode()
      },
    )
  }

  update() {
    this.player.update()

    if (this.player.isNearEdge()) {
      this.unzoom()
    }

    const nearSpotName = this.getNearestNode()?.getData('name') ?? ''
    if (nearSpotName && nearSpotName !== registry.values.hudText)
      registry.set('hudText', nearSpotName)
  }

  updateNodes() {
    const { width, height } = this.cameras.main
    const zoomIndex = registry.values.activeZoom

    MAP_DATA.filter((d) => d.cellIndex === zoomIndex).forEach((d) => {
      const spot = this.nodes.get(d.x * width, d.y * height)
      const frame = NODE_FRAMES[d.type]

      spot
        .setFrame(frame)
        .setData('name', d.name)
        .setData('type', d.type)
        .setData('id', d.id)
        .setVisible(registry.values.unlockedNodes?.includes(d.id))
    })
  }

  enterNearbyNode = () => {
    const spot = this.getNearestNode()
    if (!spot) return

    registry.set('hudText', '')

    const id = spot.getData('id')
    registry.set('activeNode', id)

    const unlocked = registry.values.unlockedNodes ?? []
    const uniq = Array.from(new Set([...unlocked, id]))
    registry.set('unlockedNodes', uniq)

    const newScene = spot.getData('type').includes('fight') ? 'Fight' : 'Shop'
    this.scene.switch(newScene)
  }

  unzoom() {
    registry.set('lastZoom', registry.values.activeZoom)
    registry.set('activeZoom', -1)
    this.scene.start('WorldMap')
  }

  getNearestNode = () =>
    this.nodes.getChildren().find((_s) => {
      const spot = _s as Phaser.GameObjects.Sprite

      const dist = Phaser.Math.Distance.BetweenPoints(spot, this.player.sprite)
      if (dist > 15) return false

      if (spot.getData('type') === 'fight-boss') {
        return this.getClearedAllCellFightNodes()
      }

      return true
    })

  getClearedAllCellFightNodes = () =>
    this.getCellFightNodes().every((n) =>
      (registry.values.clearedNodes ?? []).includes(n.id),
    )

  getCellFightNodes = () =>
    MAP_DATA.filter(
      (d) => d.cellIndex === registry.values.activeZoom && d.type === 'fight',
    )
}
