import { Fight } from '../scenes/Fight'
import { registry } from '../utils/registry'
import { shoot } from '../utils/shoot'

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number
  shootRate: number
  justHit: boolean
  declare scene: Fight

  constructor(scene: Fight, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 25)

    let flop = 0
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.scene.time.addEvent({
      repeat: -1,
      delay: 300,
      callback: () => {
        this.y += 1 * (flop ? -1 : 1)
        flop = flop ? 0 : 1
      },
    })

    // this.setTint(0x11cc11)

    this.setSize(16, 16)

    this.health = 0
    this.shootRate = 0
    this.justHit = false

    if (this.shootRate > 0) {
      this.scene.time.addEvent({
        delay: this.shootRate,
        repeat: -1,
        callback: this.shoot,
      })
    }
  }

  shoot = (count = 2, spread = 20) => {
    if (!this.active) return

    const p = this.scene.player
    const target = { x: p.sprite.x, y: p.sprite.y - p.spriteBody.halfHeight }
    shoot(this.scene.bullets, this, target, count, spread)
  }

  spawn() {
    const x = Phaser.Math.Between(20, this.scene.cameras.main.width - 20)
    const y = Phaser.Math.Between(20, this.scene.cameras.main.width - 20)
    this.setPosition(x, y)

    this.health = 2
  }

  damage = async (amount = 0) => {
    if (this.justHit || !this.active || !this.visible) return

    this.justHit = true
    this.health -= amount
    registry.set('enemyHealth', this.health)

    if (this.health <= 0) {
      this.setActive(false).setVisible(false)
      await this.delay(50)
      this.setPosition(-20, -20)
    } else {
      this.setTintFill(0xff0000)
      await this.delay(250)
      this.clearTint()
      await this.delay(50)
      this.justHit = false
    }
  }

  delay = (delay: number) =>
    new Promise((resolve) => {
      this.scene.time.delayedCall(delay, resolve)
    })
}
