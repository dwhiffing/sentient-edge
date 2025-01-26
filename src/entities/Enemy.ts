import { Fight } from '../scenes/Fight'
import { ENEMIES } from '../utils/constants'
import { registry } from '../utils/registry'
import { shoot } from '../utils/shoot'

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number
  color: number
  _meleeDamage: number[]
  _rangeDamage: number[]
  shootRate: number
  justHit: boolean
  declare scene: Fight

  constructor(scene: Fight, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 0)

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

    this.setSize(16, 16)
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

  spawn(key: string) {
    const stats = ENEMIES.find((e) => e.key === key)!
    const x = Phaser.Math.Between(20, this.scene.cameras.main.width - 20)
    const y = Phaser.Math.Between(20, this.scene.cameras.main.width - 20)
    this.setPosition(x, y)

    this.health = Phaser.Math.RND.between(stats.health[0], stats.health[1])
    this.shootRate = stats.shootRate
    this._meleeDamage = stats.meleeDamage
    this._rangeDamage = stats.rangeDamage
    this.setFrame(stats.frame)
    this.color = stats.color
    this.setTint(this.color)
    // this.speed = stats.speed
  }

  takeDamage = async (amount = 0) => {
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
      await this.delay(150)
      this.setTint(this.color)
      await this.delay(150)
      this.justHit = false
    }
  }

  get meleeDamage() {
    return Phaser.Math.RND.between(this._meleeDamage[0], this._meleeDamage[1])
  }

  get rangeDamage() {
    return Phaser.Math.RND.between(this._rangeDamage[0], this._rangeDamage[1])
  }

  delay = (delay: number) =>
    new Promise((resolve) => {
      this.scene.time.delayedCall(delay, resolve)
    })
}
