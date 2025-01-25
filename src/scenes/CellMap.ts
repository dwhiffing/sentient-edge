import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { MAP_DATA } from '../utils/constants'
import { registry } from '../utils/registry'

export class CellMap extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  spots: Phaser.GameObjects.Group

  constructor() {
    super('CellMap')
  }

  init() {
    registry.set('health', 10)
  }

  create() {
    const zoomIndex = registry.values.activeZoom
    const w = this.cameras.main.width
    const zoomX = zoomIndex % 3
    const zoomY = Math.floor(zoomIndex / 3)
    this.background = this.add
      .image(-w * zoomX, -w * zoomY, 'map')
      .setOrigin(0)
      .setScale(3)

    this.spots = this.add.group({ defaultKey: 'spritesheet' })
    this.updateSpots()

    this.player = new Player(this, w / 2, w / 2)
    this.player.sword.setVisible(false)
    this.player.speed = 70
    this.player.sprite.setScale(2)

    this.input.on('pointerdown', this.onPointerDown)
  }

  update() {
    this.player.update()

    if (this.player.isNearEdge() && this.player.hasKilledABoss()) {
      this.unzoom()
    }

    const nearSpotName = this.getNearestSpot()?.getData('name') ?? ''
    registry.set('hudText', nearSpotName)
  }

  updateSpots() {
    const { width, height } = this.cameras.main
    const zoomIndex = registry.values.activeZoom

    MAP_DATA.filter((d) => d.cellIndex === zoomIndex).forEach((d) => {
      const spot = this.spots.get(d.x * width, d.y * height)
      const frame = d.type.includes('fight') ? 4 : 5

      spot
        .setFrame(frame)
        .setScale(2)
        .setData('name', d.name)
        .setData('type', d.type)
        .setData('id', d.id)
        .setVisible(registry.values.unlockedNodes?.includes(d.id))
    })
  }

  onPointerDown = () => {
    const spot = this.getNearestSpot()
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
    registry.set('activeZoom', -1)
    this.scene.start('WorldMap')
  }

  getNearestSpot = () =>
    this.spots.getChildren().find((_s) => {
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
      this.player.getClearedNodes().includes(n.id),
    )

  getCellFightNodes = () =>
    MAP_DATA.filter(
      (d) => d.cellIndex === registry.values.activeZoom && d.type === 'fight',
    )
}
