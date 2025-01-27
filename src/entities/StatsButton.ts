export class StatsButton {
  scene: Phaser.Scene
  rect: Phaser.GameObjects.Rectangle
  text: Phaser.GameObjects.BitmapText
  constructor(scene: Phaser.Scene, _x: number, _y: number) {
    this.scene = scene

    const width = 38
    const height = 10

    this.rect = this.scene.add
      .rectangle(_x - 1, _y - 1, width, height, 0x222222)
      .setOrigin(1, 1)

    this.text = this.scene.add
      .bitmapText(_x - 1, _y - 1, 'clarity', 'Stats', 8)
      .setOrigin(1, 1)
  }

  hide() {
    this.rect.setVisible(false)
    this.text.setVisible(false)
  }
  show() {
    this.rect.setVisible(true)
    this.text.setVisible(true)
  }
}
