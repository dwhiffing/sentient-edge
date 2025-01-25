import { Scene, GameObjects } from 'phaser'

export class Menu extends Scene {
  title: GameObjects.BitmapText

  constructor() {
    super('Menu')
  }

  create() {
    const { width, height } = this.cameras.main
    this.title = this.add
      .bitmapText(width / 2, height / 2, 'clarity', 'Sentient\nEdge', 16)
      .setCenterAlign()
      .setOrigin(0.5)

    // TODO remove me
    // this.startGame()

    this.input.once('pointerdown', this.startGame)
  }

  startGame = () => {
    this.scene.launch('Hud')
    this.scene.start('WorldMap')
  }
}
