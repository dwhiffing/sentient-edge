export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number
  justHit: boolean
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 0)
    this.play('player-walk')
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.health = 0
    this.justHit = false
  }
  spawn() {
    this.health = 8
    this.setTintFill(0xff0000)
    const x = Phaser.Math.Between(20, 236)
    const y = Phaser.Math.Between(20, 236)
    this.x = x
    this.y = y
  }
  damage(amount = 0) {
    if (this.justHit || !this.active || !this.visible) return
    this.justHit = true

    this.health -= amount
    this.setTintFill(0xffffff)
    if (this.health <= 0) {
      this.setActive(false)
      this.setVisible(false)
      this.setPosition(-20, -20)
      this.scene.registry.set('enemy-health', -1)
    } else {
      this.scene.registry.set('enemy-health', this.health)
      this.scene.time.delayedCall(250, () => {
        this.setTintFill(0xff0000)
        this.scene.time.delayedCall(50, () => {
          this.justHit = false
        })
      })
    }
  }
}
