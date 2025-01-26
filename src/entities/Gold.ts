import { Fight } from '../scenes/Fight'
import { registry } from '../utils/registry'

export class Gold extends Phaser.Physics.Arcade.Sprite {
  amount: number
  declare scene: Fight

  constructor(scene: Fight, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 48)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setSize(12, 12)
    this.amount = 1
  }

  spawn(x: number, y: number, amount = 1) {
    this.setActive(true).setVisible(true).setPosition(x, y)
    this.amount = amount
    this.setFrame(48)
    if (amount > 50) {
      this.setFrame(49)
    } else if (amount > 100) {
      this.setFrame(50)
    }
  }

  pickup() {
    if (!this.active || !this.visible) return

    this.setActive(false).setVisible(false).setPosition(-20, -20)
    registry.set(
      'gold',
      registry.values.gold +
        this.amount * this.scene.player.stats.earnRateBase +
        this.amount * this.scene.player.stats.earnRateMulti,
    )
  }
}
