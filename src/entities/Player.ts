import { ITEMS } from '../utils/constants'
import { IUpgradeKeys, registry } from '../utils/registry'
import { shoot } from '../utils/shoot'
import { Bullet } from './Bullet'

type IPlayerParams = {
  x?: number
  y?: number
  scale?: number
  speedMultiplier?: number
}

const SWORD_OFFSET_X = 10
const BASE_SPEED = 40

export class Player {
  scene: Phaser.Scene
  sprite: Phaser.Physics.Arcade.Sprite
  spriteBody: Phaser.Physics.Arcade.Body
  sword: Phaser.Physics.Arcade.Sprite
  swordBody: Phaser.Physics.Arcade.Body
  bullets: Phaser.GameObjects.Group
  attackReady: boolean
  health: number
  speedMultiplier: number
  justHit: boolean
  shouldMove: boolean

  constructor(scene: Phaser.Scene, params: IPlayerParams = {}) {
    this.scene = scene
    const w = this.scene.cameras.main.width
    const x = params.x ?? w / 2
    const y = params.y ?? w / 2
    const scale = params.scale ?? 1
    this.speedMultiplier = params.speedMultiplier ?? 1

    this.health = registry.values.health
    this.justHit = false
    this.attackReady = true
    this.shouldMove = false

    this.bullets = this.scene.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true,
    })

    this.shouldMove = false
    this.scene.game.events.on('blur', () => {
      this.shouldMove = false
    })
    this.scene.game.events.on('focus', () => {
      if (this.sprite.active) this.shouldMove = true
    })

    this.scene.input.on('pointermove', () => {
      if (document.hasFocus() && this.sprite.active) this.shouldMove = true
    })

    this.sprite = this.scene.physics.add.sprite(x, y, 'spritesheet', 0)
    this.spriteBody = this.sprite.body as Phaser.Physics.Arcade.Body
    this.spriteBody.setSize(15, 15)
    this.sprite
      .setScale(scale)
      .setCollideWorldBounds(true)
      .setOrigin(0.5, 1)
      .setOffset(8, 16)
      .setDepth(1)

    this.sword = this.scene.physics.add.sprite(x, y, 'spritesheet', 41)
    this.swordBody = this.sword.body as Phaser.Physics.Arcade.Body
    this.swordBody.setSize(12, 6)
    this.sword.setScale(scale).setOrigin(0.5, 0.7).setDepth(2)
  }

  update() {
    if (!this.sprite.active) return

    const p = this.scene.input.activePointer
    const s = this.sprite
    const w = this.sword

    const dx = p.x - s.x
    const dy = p.y - s.y
    if (Math.abs(dx) > 2) {
      this.sprite.setFlipX(dx < 0)
      this.sword.setFlipX(dx < 0)
      if (w.angle !== 0) w.setAngle(w.flipX ? -90 : 90)
    }

    this.sword.setOffset(this.sword.flipX ? 0 : 19, 19)
    let so = SWORD_OFFSET_X * this.sprite.scaleX
    let sy = s.y - (this.attackReady ? 11 : 7) * this.sprite.scaleX
    if (this.sword.angle !== 0) {
      so += 5
      sy += -2
      this.sword.setFrame(40)
    }
    let sx = s.x + so * (this.sword.flipX ? -1 : 1)
    this.sword.setPosition(sx, sy)

    if (!this.shouldMove || this.scene.scene.isActive('Stats')) {
      this.stop()
      return
    }

    const dist = Phaser.Math.Distance.Between(p.x, p.y, s.x, s.y)
    const affix = this.sword.visible && this.attackReady ? '-sword' : ''
    if (dist > 2) {
      const angle = Math.atan2(dy, dx)

      const slowMulti = this.attackReady ? 1 : 0.5
      const speed =
        BASE_SPEED *
        this.stats.speedMoveMulti *
        this.speedMultiplier *
        slowMulti
      this.spriteBody.setVelocity(
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
      )
      this.swordBody.setVelocity(
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
      )
      if (this.sword.angle === 0) s.anims.play(`player-walk${affix}`, true)
    } else {
      this.stop()
    }
  }

  stop() {
    this.swordBody.setVelocity(0)
    this.spriteBody.setVelocity(0)
    const affix = this.sword.visible && this.attackReady ? '-sword' : ''
    if (this.sword.angle === 0) this.sprite.anims.play(`player-idle${affix}`)
  }

  shoot = (count = 0, spread = 20) => {
    if (!this.sprite.active || count === 0) return

    const f = this.sprite.flipX ? -1 : 1
    const source = {
      x: this.sprite.x + 20 * f,
      y: this.sprite.y - this.spriteBody.halfHeight,
    }
    const target = {
      x: source.x + 50 * f,
      y: source.y,
    }
    shoot(this.scene, this.bullets, source, target, count, spread)
  }

  async swing() {
    if (!this.sprite.active || this.sword.angle !== 0 || !this.attackReady)
      return

    this.attackReady = false
    this.sprite.anims.play(`player-stab`, true)
    this.sword.setAngle(this.sword.flipX ? -90 : 90)
    this.sword.setDepth(0)
    this.shoot(this.stats.rangeCount)

    await this.delay(this.stats.durationMeleeBase)
    this.sword.setAngle(0)
    this.sword.setFrame(41)
    this.sword.setDepth(2)
    await this.delay(this.stats.speedMeleeBase * this.stats.speedMeleeMulti)
    this.attackReady = true
  }

  takeDamage = async (amount = 0, isRanged = false) => {
    if (this.justHit || !this.sprite.active || !this.sprite.visible) return

    if (isRanged) {
      amount -= this.stats.defenseRanged
    } else {
      amount -= this.stats.defenseMelee
    }

    amount = Phaser.Math.Clamp(amount, 0, 999)

    this.justHit = true
    this.health -= amount
    registry.set('health', this.health)

    if (this.health <= 0) {
      this.die()
    } else {
      this.sprite.setTintFill(0xff0000)
      await this.delay(250)
      this.sprite.clearTint()
      await this.delay(50)
      this.justHit = false
    }
  }

  die = async () => {
    this.sprite.setActive(false).setVisible(false)
    this.shouldMove = false
    this.stop()
    // this.sword.setActive(false).setVisible(false)
    this.scene.add
      .sprite(this.sprite.x, this.sprite.y, 'spritesheet', 7)
      .setOrigin(0.5, 1)
    registry.set('gold', 0)
    const up = registry.values.upgrades
    ITEMS.filter((i) => i.temporary).forEach((item) => {
      up[item.key as IUpgradeKeys] = 0
    })
    registry.set('upgrades', up)

    await this.delay(1000)
    this.scene.scene.start('WorldMap')
  }

  isNearEdge = () =>
    this.sprite.x < 10 ||
    this.sprite.x > this.scene.cameras.main.width - 10 ||
    this.sprite.y < 20 ||
    this.sprite.y > this.scene.cameras.main.height - 10

  delay = (delay: number) =>
    new Promise((resolve) => {
      this.scene.time.delayedCall(delay, resolve)
    })

  get stats() {
    return ITEMS.reduce(
      (obj, item) => {
        const up = registry.values.upgrades[item.key as IUpgradeKeys]

        item?.effects.slice(0, up).forEach((effectLevel) => {
          effectLevel.effects.forEach((effect) => {
            obj[effect.statKey] ??= 0
            obj[effect.statKey] += effect.change
          })
        })

        return obj
      },
      { ...baseStats },
    )
  }
}

const baseStats: Record<IUpgradeKeys, number> = {
  healthMax: 10,
  defenseMelee: 0,
  defenseRanged: 0,

  rangeCount: 0,
  sizeBase: 1,
  speedMoveMulti: 1,

  damageMeleeBase: 1,
  damageMeleeFreq: 250,
  durationMeleeBase: 250,
  damageMeleeMulti: 1,

  damageRangeBase: 1,
  damageRangeMulti: 1,

  earnRateBase: 0,
  earnRateMulti: 1,

  speedMeleeBase: 1200,
  speedMeleeMulti: 1,

  // rangeSpeed:0,
  // rangeHoming:0,
}
