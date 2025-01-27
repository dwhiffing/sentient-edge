import { Fight } from '../scenes/Fight'
import { ENEMIES } from '../utils/constants'
import { registry } from '../utils/registry'
import { shoot } from '../utils/shoot'

const flopRate = 300

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number
  maxHealth: number
  color: number
  currentAngle: number
  _flop: number
  target: { x: number; y: number }
  key: string
  justHit: boolean
  forceStop: boolean
  moveEvent: Phaser.Time.TimerEvent
  shootEvent: Phaser.Time.TimerEvent
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
  }

  onMoveEvent = () => {
    if (this.forceStop) return

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

  shoot = async () => {
    if (!this.active) return

    const shouldShoot = Phaser.Math.RND.frac() <= this.stats.rangeShootChance
    if (!shouldShoot) return

    this.forceStop = true
    this.spriteBody.setVelocity(0, 0)

    const p = this.scene.player
    let target = { x: p.sprite.x, y: p.sprite.y - p.spriteBody.halfHeight }
    if (this.stats.rangeTarget === 'random') {
      const w = this.scene.cameras.main.width
      const x = Phaser.Math.RND.between(0, w)
      const y = Phaser.Math.RND.between(0, w)
      target = { x, y }
    }

    await this.flash(this.stats.rangeStartDelay)

    shoot(
      this.scene,
      this.scene.bullets,
      this,
      target,
      this.stats.rangeCount,
      this.stats.rangeSpread,
      this.stats.rangeAccuracy,
      this.stats.rangeCountDelay,
      this.stats.rangeBulletSpeed,
      this.stats.rangeBulletSize,
    )

    this.forceStop = false
  }

  flash = async (duration = 800, flashCount = 6) => {
    let toggle = false
    this.scene.time.addEvent({
      delay: duration / flashCount,
      repeat: flashCount,
      callback: () => {
        if (toggle) {
          this.setTintFill(0xffffff)
          toggle = false
        } else {
          this.clearTint()
          this.setTint(this.color)
          toggle = true
        }
      },
    })
    await this.delay(duration + 100)
  }

  spawn(_x: number, _y: number, key: string) {
    this.key = key
    const d = 20

    const x = Phaser.Math.Clamp(_x, d, this.scene.cameras.main.width - d)
    const y = Phaser.Math.Clamp(_y, d, this.scene.cameras.main.width - d)
    this.setPosition(x, y)
    this.setCollideWorldBounds(true)

    this.maxHealth = Phaser.Math.RND.between(
      this.stats.health[0],
      this.stats.health[1],
    )
    this.health = this.maxHealth

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

    this.scene.time.delayedCall(Phaser.Math.RND.between(0, 500), () => {
      if (this.stats.rangeSpeed > 0) {
        this.shootEvent = this.scene.time.addEvent({
          delay: this.stats.rangeSpeed,
          repeat: -1,
          callback: this.shoot,
        })
      }

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
    registry.set('enemyName', this.stats.label)
    registry.set('enemyMaxHealth', this.maxHealth)

    this.scene.enemyNameDebounceEvent?.destroy()
    this.scene.enemyNameDebounceEvent = this.scene.time.delayedCall(2000, () =>
      registry.set('enemyName', ''),
    )

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
    this.setCollideWorldBounds(false)
    this.setActive(false).setVisible(false)
    this.shootEvent?.destroy()
    this.moveEvent?.destroy()
    this.flopEvent?.destroy()
    await this.delay(50)
    this.setPosition(-500, -500)
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
