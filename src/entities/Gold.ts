import { Fight } from '../scenes/Fight'
import { registry } from '../utils/registry'

export class Gold extends Phaser.Physics.Arcade.Sprite {
  amount: number
  collected: boolean
  collectedTriggered: boolean
  declare scene: Fight

  constructor(scene: Fight, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 48)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setSize(8, 8)
    this.amount = 1
    this.collected = false
    this.collectedTriggered = false
  }

  spawn(x: number, y: number, amount = 1) {
    this.setActive(true).setVisible(true).setPosition(x, y)
    this.amount = amount
    this.setFrame(48).setAcceleration(0).setVelocity(0)
    this.collected = false
    this.collectedTriggered = false

    this.setTint(0xf3a833)

    if (amount >= 50) {
      this.setFrame(49)
      this.setTint(0xec273f)
    }
    if (amount >= 500) {
      this.setFrame(50)
      this.setTint(0x36c5f4)
    }
  }

  pickup() {
    if (!this.active || !this.visible) return

    this.setActive(false)
      .setVisible(false)
      .setPosition(-20, -20)
      .setAcceleration(0)
      .setVelocity(0)
    this.scene.sound.play('gold', {
      volume: 4,
      rate: Phaser.Math.RND.realInRange(0.8, 1.2),
    })
    const amount = Math.round(
      this.amount * this.scene.player.stats.earnRateMulti,
    )
    registry.set('gold', registry.values.gold + amount)
    registry.set('lastGold', amount)
  }

  update() {
    if (this.collected && this.active) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.scene.player.sprite.x,
        this.scene.player.sprite.y - 10,
      )

      const speed = 100
      this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
    }
  }
}
