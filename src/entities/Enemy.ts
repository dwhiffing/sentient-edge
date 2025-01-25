import { registry } from '../utils/registry'

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number
  justHit: boolean
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 0)

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.play('player-walk')
    this.health = 0
    this.justHit = false
  }

  spawn() {
    const x = Phaser.Math.Between(20, 236)
    const y = Phaser.Math.Between(20, 236)
    this.setPosition(x, y).setTintFill(0xff0000)

    this.health = 2
  }

  damage = async (amount = 0) => {
    if (this.justHit || !this.active || !this.visible) return

    this.justHit = true
    this.health -= amount
    registry.set('enemyHealth', this.health)

    if (this.health <= 0) {
      this.setActive(false).setVisible(false).setPosition(-20, -20)
    } else {
      this.setTintFill(0xffffff)
      await this.delay(250)
      this.setTintFill(0xff0000)
      await this.delay(50)
      this.justHit = false
    }
  }

  delay = (delay: number) =>
    new Promise((resolve) => {
      this.scene.time.delayedCall(delay, resolve)
    })
}
