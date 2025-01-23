import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { CELL_ORDER, MAP_DATA } from '../constants'

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
    this.player = new Player(this, 32, this.cameras.main.height - 32)
    this.player.sword.setVisible(false)
    this.updateCovers()

    this.input.on('pointerdown', this.onPointerDown)

    if (this.registry.get('active-zoom') !== -1) {
      this.goToCell(this.registry.get('active-zoom'))
    } else {
      this.registry.set('active-zoom', CELL_ORDER[0])
    }
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
    CELL_ORDER.forEach((cellIndex, index) => {
      if (cellIndex === 6) return this.revealCell(cellIndex)

      const prevCellBossId = MAP_DATA.find(
        (d) => d.cellIndex === CELL_ORDER[index - 1] && d.type === 'fight-boss',
      )?.id
      if (this.registry.values['cleared-nodes']?.includes(prevCellBossId)) {
        this.revealCell(cellIndex)
      }
    })
  }

  onPointerDown = () => {
    const { width, height } = this.cameras.main
    const xIndex = Math.floor(this.player.sprite.x / (width / 3))
    const yIndex = Math.floor(this.player.sprite.y / (height / 3))
    const cellIndex = (xIndex % 3) + yIndex * 3
    this.goToCell(cellIndex)
  }

  goToCell(cellIndex: number) {
    this.registry.set('active-zoom', cellIndex)
    this.scene.start('CellMap')
  }

  revealCell(index: number) {
    if (!this.covers) return

    this.covers[index].setAlpha(0)
    const body = this.covers[index].body! as Phaser.Physics.Arcade.Body
    body.enable = false
  }

  update() {
    this.player.update()
    this.physics.collide(this.covers, this.player.sprite)
  }
}
