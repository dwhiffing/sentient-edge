export class HealthBar {
  scene: Phaser.Scene
  rect0: Phaser.GameObjects.Rectangle
  rect: Phaser.GameObjects.Rectangle
  rect2: Phaser.GameObjects.Rectangle

  constructor(
    scene: Phaser.Scene,
    _x: number,
    _y: number,
    w: number,
    h: number,
    color: number,
  ) {
    this.scene = scene

    this.rect0 = this.scene.add
      .rectangle(_x, _y, w, h, 0xffffff)
      .setDepth(9)
      .setOrigin(0, 0)

    this.rect = this.scene.add
      .rectangle(_x + 1, _y + 1, w - 2, h - 2, 0x000000)
      .setOrigin(0, 0)
      .setDepth(10)

    this.rect2 = this.scene.add
      .rectangle(_x + 1, _y + 1, w - 2, h - 2, color)
      .setOrigin(0, 0)
      .setDepth(11)
      .setScale(1, 1)
  }

  setScale = (n: number) => {
    this.rect2.setScale(Phaser.Math.Clamp(n, 0, 1), 1)
  }

  show = () => {
    this.rect0.setVisible(true)
    this.rect.setVisible(true)
    this.rect2.setVisible(true)
  }

  hide = () => {
    this.rect0.setVisible(false)
    this.rect.setVisible(false)
    this.rect2.setVisible(false)
  }
}
