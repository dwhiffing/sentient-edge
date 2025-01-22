export class Gold extends Phaser.Physics.Arcade.Sprite {
  amount: number
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 3)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.amount = 1
  }
  spawn(x: number, y: number) {
    this.setActive(true)
    this.setVisible(true)
    this.setPosition(x, y)
  }

  pickup() {
    if (!this.active || !this.visible) return

    this.setActive(false)
    this.setVisible(false)
    this.setPosition(-20, -20)
    this.scene.registry.inc('gold', this.amount)
  }
}
