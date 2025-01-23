import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { MAP_DATA } from '../constants'

export class CellMap extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  spots: Phaser.GameObjects.Group

  constructor() {
    super('CellMap')
  }

  init() {
    this.registry.set('health', 10)
  }

  create() {
    const zoomIndex = this.registry.get('active-zoom')
    const w = this.cameras.main.width / 3
    const zoomX = zoomIndex % 3
    const zoomY = Math.floor(zoomIndex / 3)
    this.background = this.add
      .image(-w * 3 * zoomX, -w * 3 * zoomY, 'map')
      .setOrigin(0)
      .setScale(3)

    this.spots = this.add.group({ defaultKey: 'spritesheet' })
    this.updateSpots()

    this.player = new Player(this, 0.5 * w + w * zoomX, 0.5 * w + w * zoomY)
    this.player.sword.setVisible(false)
    this.player.speed = 70
    this.player.sprite.setScale(2)

    this.input.on('pointerdown', this.onPointerDown)
  }

  updateSpots() {
    const { width, height } = this.cameras.main
    const zoomIndex = this.registry.get('active-zoom')

    MAP_DATA.filter((d) => d.cellIndex === zoomIndex).forEach((d) => {
      const spot = this.spots.get(d.x * width, d.y * height)
      const frame = d.type.includes('fight') ? 4 : 5

      spot
        .setFrame(frame)
        .setScale(2)
        .setData('name', d.name)
        .setData('type', d.type)
        .setData('id', d.id)
        .setVisible(this.registry.get('unlocked-nodes')?.includes(d.id))
    })
  }

  onPointerDown = () => {
    const spot = this.getNearestSpot()
    if (!spot) return

    this.registry.set('hud-text', '')

    const id = spot.getData('id')
    this.registry.set('active-node', id)

    const unlocked = this.registry.get('unlocked-nodes') ?? []
    const uniq = Array.from(new Set([...unlocked, id]))
    this.registry.set('unlocked-nodes', uniq)

    const newScene = spot.getData('type').includes('fight') ? 'Fight' : 'Shop'
    this.scene.switch(newScene)
  }

  update() {
    this.player.update()

    if (this.player.isNearEdge() && this.player.hasKilledABoss()) {
      this.unzoom()
    }

    const nearSpotName = this.getNearestSpot()?.getData('name') ?? ''
    this.registry.set('hud-text', nearSpotName)
  }

  unzoom() {
    this.registry.set('active-zoom', -1)
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
      (d) =>
        d.cellIndex === this.registry.get('active-zoom') && d.type === 'fight',
    )
}
