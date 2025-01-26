import { Fight } from '../scenes/Fight'
import { ENEMIES } from '../utils/constants'
import { registry } from '../utils/registry'
import { shoot } from '../utils/shoot'

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number
  color: number
  currentAngle: number
  _flop: number
  target: { x: number; y: number }
  shootRate: number
  key: string
  justHit: boolean
  moveEvent: Phaser.Time.TimerEvent
  flopEvent: Phaser.Time.TimerEvent
  spriteBody: Phaser.Physics.Arcade.Body
  declare scene: Fight

  constructor(scene: Fight, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 0)

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.setSize(16, 16)
    this.justHit = false
    this.setOrigin(0.5, 0.5)
    this.spriteBody = this.body as Phaser.Physics.Arcade.Body
    this.currentAngle = 0
    this._flop = 0
    this.spriteBody.setCollideWorldBounds(true)

    if (this.shootRate > 0) {
      this.scene.time.addEvent({
        delay: this.shootRate,
        repeat: -1,
        callback: this.shoot,
      })
    }
  }

  onMoveEvent = () => {
    const rawDistance = Phaser.Math.Distance.BetweenPoints(this, this.target)
    const distanceRatio = Phaser.Math.Clamp(
      rawDistance / this.stats.moveMaxDistance,
      0,
      1,
    )
    const targetBias = Math.pow(distanceRatio, 2)

    const targetAngle = Math.atan2(
      this.target.y - this.y,
      this.target.x - this.x,
    )
    const randomAngle = Phaser.Math.RND.between(-180, 180)

    const spreadAngle = mixAngles(
      this.currentAngle,
      randomAngle,
      this.stats.moveSpreadBias,
    )
    this.currentAngle = mixAngles(spreadAngle, targetAngle, targetBias)

    this.spriteBody.setVelocity(
      Math.cos(this.currentAngle) * this.stats.speed,
      Math.sin(this.currentAngle) * this.stats.speed,
    )
    this.setFlipX(this.spriteBody.velocity.x > 0)
  }

  shoot = (count = 2, spread = 20) => {
    if (!this.active) return

    const p = this.scene.player
    const target = { x: p.sprite.x, y: p.sprite.y - p.spriteBody.halfHeight }
    shoot(this.scene.bullets, this, target, count, spread)

    this.moveEvent = this.scene.time.addEvent({
      delay: this.stats.moveEventDelay,
      repeat: -1,
      callback: this.onMoveEvent,
    })
  }

  spawn(key: string) {
    this.key = key
    const d = this.stats.moveMaxDistance * 0.65
    const x = Phaser.Math.Between(d, this.scene.cameras.main.width - d)
    const y = Phaser.Math.Between(d, this.scene.cameras.main.width - d)
    this.setPosition(x, y)

    this.health = Phaser.Math.RND.between(
      this.stats.health[0],
      this.stats.health[1],
    )
    this.shootRate = this.stats.shootRate

    const w = this.scene.cameras.main.width

    this.target = { x: this.x, y: this.y }

    if (this.stats.moveTarget === 'player') {
      this.target = this.scene.player.sprite
    } else if (this.stats.moveTarget === 'center') {
      this.target = { x: w / 2, y: w / 2 }
    } else if (this.stats.moveTarget === 'random') {
      const y = Phaser.Math.RND.between(d, w - d)
      const x = Phaser.Math.RND.between(d, w - d)
      this.target = { x, y }
    }

    this.setFrame(this.stats.frame)
    this.color = this.stats.color
    this.setTint(this.color)

    // TODO: move to enemy stats
    const flopRate = 300

    this.moveEvent = this.scene.time.addEvent({
      delay: this.stats.moveEventDelay,
      repeat: -1,
      callback: this.onMoveEvent,
    })

    this.flopEvent = this.scene.time.addEvent({
      repeat: -1,
      delay: flopRate,
      callback: () => {
        this.y += 1 * (this._flop ? -1 : 1)
        this._flop = this._flop ? 0 : 1
      },
    })
  }

  get stats() {
    return ENEMIES.find((e) => e.key === this.key)!
  }

  takeDamage = async (amount = 0, delay = 150) => {
    if (this.justHit || !this.active || !this.visible) return

    this.justHit = true
    this.health -= amount
    registry.set('enemyHealth', this.health)

    if (this.health <= 0) {
      this.die()
    } else {
      this.setTintFill(0xff0000)
      await this.delay(delay)
      this.setTint(this.color)
      this.justHit = false
    }
  }

  die = async () => {
    this.setActive(false).setVisible(false)
    this.moveEvent?.destroy()
    this.flopEvent?.destroy()
    await this.delay(50)
    this.setPosition(-20, -20)
  }

  get meleeDamage() {
    return Phaser.Math.RND.between(
      this.stats.meleeDamage[0],
      this.stats.meleeDamage[1],
    )
  }

  get rangeDamage() {
    return Phaser.Math.RND.between(
      this.stats.rangeDamage[0],
      this.stats.rangeDamage[1],
    )
  }

  get gold() {
    return Phaser.Math.RND.between(this.stats.gold[0], this.stats.gold[1])
  }

  delay = (delay: number) =>
    new Promise((resolve) => {
      this.scene.time.delayedCall(delay, resolve)
    })
}

const mixAngles = (_a1: number, _a2: number, bias: number) => {
  const a1 = Phaser.Math.Angle.Normalize(_a1)
  const a2 = Phaser.Math.Angle.Normalize(_a2)
  let diff = a2 - a1

  if (diff > Math.PI) {
    diff -= 2 * Math.PI
  } else if (diff < -Math.PI) {
    diff += 2 * Math.PI
  }

  return Phaser.Math.Angle.Wrap(a1 + diff * Phaser.Math.Clamp(bias, 0, 1))
}
