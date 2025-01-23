import { Scene } from 'phaser'

export class Shop extends Scene {
  constructor() {
    super('Shop')
  }

  create() {
    this.input.once('pointerdown', () => {
      this.scene.start('WorldMap')
    })
  }
}
