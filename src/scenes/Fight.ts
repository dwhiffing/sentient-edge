import { Scene } from 'phaser'

export class Fight extends Scene {
  background: Phaser.GameObjects.Image

  constructor() {
    super('Fight')
  }

  create() {
    this.background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'map2',
    )

    this.add
      .sprite(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'spritesheet',
      )
      .setFrame(0)
    this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'spritesheet',
      )
      .setFrame(2)

    this.input.once('pointerdown', () => {
      this.scene.start('Shop')
    })
  }
}
