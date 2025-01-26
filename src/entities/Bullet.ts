export class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 42)

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.setSize(4, 4).setOrigin(0.5, 0.5).setTint(0xff0000)
  }

  spawn(pos: { x: number; y: number }, angle: number, speed: number) {
    this.setActive(true).setVisible(true)
    this.setPosition(pos.x, pos.y)
    this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
  }

  takeDamage = (_amount: number) => {
    if (!this.active || !this.visible) return

    this.die()
  }

  die = () => {
    this.setActive(false).setVisible(false)
  }

  update = () => {
    if (
      !Phaser.Geom.Intersects.RectangleToRectangle(
        new Phaser.Geom.Rectangle(this.x, this.y, 1, 1),
        this.scene.physics.world.bounds,
      )
    ) {
      this.die()
    }
  }
}
