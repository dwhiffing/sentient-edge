import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { CELL_ORDER, MAP_DATA } from '../utils/constants'
import { registry } from '../utils/registry'

export class WorldMap extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  covers: Phaser.GameObjects.Rectangle[]

  constructor() {
    super('WorldMap')
  }

  create() {
    this.background = this.add.image(0, 0, 'map').setOrigin(0)
    this.covers = this.createCovers()
    this.updateCovers()

    registry.set('hudText', '')

    this.player = new Player(this, {
      x: 0,
      y: 0,
      scale: 0.5,
      speedMultiplier: 0.4,
    })
    const cx = registry.values.lastZoom % 3
    const cy = Math.floor(registry.values.lastZoom / 3)
    const { x, y } = registry.values.lastPlayerPosition
    this.player.sprite.setPosition(cx * 66 + x / 3, cy * 66 + y / 3)

    if (registry.values.activeZoom !== -1) {
      this.goToCell(registry.values.activeZoom, false)
    } else {
      this.cameras.main.fadeFrom(250, 0, 0, 0)
    }

    this.input.once('pointerdown', () => {
      this.sound.play('player-enter', { volume: 0.5 })
      this.cameras.main.fadeOut(250, 0, 0, 0, (_event: any, p: number) => {
        if (p === 1) {
          this.goToCell(this.getPlayerCellIndex())
        }
      })
    })
  }

  update() {
    this.player.update()
    this.physics.collide(this.covers, this.player.sprite)
  }

  createCovers() {
    const w = this.cameras.main.width / 3

    return Array.from({ length: 9 }).map((_, i) => {
      const rectangle = this.add
        .rectangle(w * (i % 3), w * Math.floor(i / 3), w, w, 0x000000)
        .setOrigin(0)

      this.physics.add.existing(rectangle, true)

      return rectangle
    })
  }

  updateCovers() {
    registry.unlockedCellIndexes.forEach(this.removeCover)
  }

  removeCover = (index: number) => {
    this.covers[index].setAlpha(0)
    const body = this.covers[index].body! as Phaser.Physics.Arcade.Body
    body.enable = false
  }

  getPlayerCellIndex() {
    const { width, height } = this.cameras.main
    const xIndex = Math.floor(this.player.sprite.x / (width / 3))
    const yIndex = Math.floor(this.player.sprite.y / (height / 3))
    return (xIndex % 3) + yIndex * 3
  }

  goToCell(cellIndex: number, setPlayerPostion = true) {
    const w = this.cameras.main.width
    const o = 30
    registry.set('activeZoom', cellIndex)
    registry.set('lastNode', '')
    this.scene.start('CellMap')
    const cx = (cellIndex % 3) * 66.66
    const cy = Math.floor(cellIndex / 3) * 66.66
    if (setPlayerPostion) {
      registry.set('lastPlayerPosition', {
        x: Phaser.Math.Clamp((this.player.sprite.x - cx) * 3, o, w - o),
        y: Phaser.Math.Clamp((this.player.sprite.y - cy) * 3, o, w - o),
      })
    }
  }
}
