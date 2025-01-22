import { Scene, GameObjects } from 'phaser'

export class Menu extends Scene {
  title: GameObjects.BitmapText

  constructor() {
    super('Menu')
  }

  create() {
    this.title = this.add
      .bitmapText(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'clarity',
        'Sentient\nEdge',
        16,
      )
      .setCenterAlign()
      .setOrigin(0.5)

    this.scene.launch('Hud')
    this.scene.start('WorldMap')
    this.registry.set('gold', 0)
    this.registry.set('health', 10)
    this.registry.set('enemy-health', -1)
    this.input.once('pointerdown', () => {
      this.scene.start('WorldMap')
    })
  }
}
