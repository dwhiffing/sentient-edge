import { Scene, GameObjects } from 'phaser'

export class Menu extends Scene {
  title: GameObjects.Text

  constructor() {
    super('Menu')
  }

  create() {
    this.title = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'Sentient Edge',
      )
      .setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('WorldMap')
    })
  }
}
