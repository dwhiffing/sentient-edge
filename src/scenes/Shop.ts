import { Scene } from 'phaser'

export class Shop extends Scene {
  background: Phaser.GameObjects.Image
  msg_text: Phaser.GameObjects.Text

  constructor() {
    super('Shop')
  }

  create() {
    this.background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'background',
    )
    this.msg_text = this.add
      .text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Shop')
      .setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('WorldMap')
    })
  }
}
