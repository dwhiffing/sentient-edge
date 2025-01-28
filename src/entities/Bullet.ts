export class Bullet extends Phaser.Physics.Arcade.Sprite {
  damage: number
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 42)

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.damage = 1
    this.setOrigin(0.5, 0.5).setTint(0xff0000)
  }

  spawn(
    pos: { x: number; y: number },
    angle: number,
    speed: number,
    size = 1,
    damage = 1,
  ) {
    this.setActive(true).setVisible(true)
    this.setPosition(pos.x, pos.y)
    this.setSize(2 + 2 * size, 2 + 2 * size)
    this.setFrame(41 + size)
    this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
    this.damage = damage
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
