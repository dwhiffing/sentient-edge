import {
  ITEMS,
  PLAYER_ATTACK_DELAY,
  PLAYER_ATTACK_DURATION,
} from '../utils/constants'
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
const BASE_SPEED = 42

export class Player {
  scene: Phaser.Scene
  sprite: Phaser.Physics.Arcade.Sprite
  spriteBody: Phaser.Physics.Arcade.Body
  sword: Phaser.Physics.Arcade.Sprite
  head: Phaser.Physics.Arcade.Sprite
  headBody: Phaser.Physics.Arcade.Body
  swordHit: Phaser.Physics.Arcade.Sprite
  swordHitBody: Phaser.Physics.Arcade.Body
  goldHit: Phaser.GameObjects.Arc
  goldHitBody: Phaser.Physics.Arcade.Body
  swordBody: Phaser.Physics.Arcade.Body
  bullets: Phaser.GameObjects.Group
  attackReady: boolean
  health: number
  speedMultiplier: number
  justHit: boolean
  shouldMove: boolean
  cursor: Phaser.GameObjects.Arc

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

    this.swordHit = this.scene.physics.add
      .sprite(x, y, 'spritesheet', 41)
      .setVisible(false)
    this.swordHitBody = this.swordHit.body as Phaser.Physics.Arcade.Body

    const frame = this.swordConfig.frame
    this.sword = this.scene.physics.add.sprite(x, y, 'spritesheet', frame)
    this.sword.setScale(scale).setOrigin(0.5, 0.7).setDepth(2).setSize(0.1, 0.1)

    this.swordBody = this.sword.body as Phaser.Physics.Arcade.Body

    this.head = this.scene.physics.add.sprite(x, y, 'spritesheet', 8)
    this.head.setScale(scale).setOrigin(0.5, 0.5).setDepth(2).setSize(0.1, 0.1)
    this.headBody = this.head.body as Phaser.Physics.Arcade.Body

    const radius = 29 * this.stats.earnRateMulti
    this.goldHit = this.scene.add.circle(0, 0, radius)
    this.scene.physics.add.existing(this.goldHit)
    this.goldHitBody = this.goldHit.body as Phaser.Physics.Arcade.Body
    this.goldHitBody.setCircle(radius)

    this.setSwordPosition()

    this.cursor = this.scene.add
      .circle(this.sprite.x, this.sprite.y, 2, 0xff0000)
      .setVisible(false)
    let pointerDownPos = { x: 0, y: 0 }
    let cursorDownPos = { x: 0, y: 0 }
    this.scene.input.on('pointermove', (_pointer: Phaser.Input.Pointer) => {
      if (_pointer.event instanceof TouchEvent) {
        this.cursor
          .setPosition(
            cursorDownPos.x + (_pointer.x - pointerDownPos.x),
            cursorDownPos.y + (_pointer.y - pointerDownPos.y),
          )
          .setVisible(true)
      }
    })

    this.scene.input.on('pointerdown', (_pointer: Phaser.Input.Pointer) => {
      if (_pointer.event instanceof TouchEvent) {
        pointerDownPos = { x: _pointer.x, y: _pointer.y }
        cursorDownPos = { x: this.cursor.x, y: this.cursor.y }
      }
    })
  }

  update() {
    if (!this.sprite.active) return

    const p = this.cursor.visible ? this.cursor : this.scene.input.activePointer
    const s = this.sprite
    const w = this.sword

    const dx = p.x - s.x
    const dy = p.y - s.y
    if (Math.abs(dx) > 2) {
      this.sprite.setFlipX(dx < 0)
      this.sword.setFlipX(dx < 0)
      if (w.angle !== 0) w.setAngle(w.flipX ? -90 : 90)
    }

    this.setSwordPosition()

    if (!this.shouldMove || this.scene.scene.isActive('Stats')) {
      this.stop()
      return
    }

    const dist = Phaser.Math.Distance.Between(p.x, p.y, s.x, s.y)
    const affix = this.sword.visible && this.attackReady ? '-sword' : ''
    if (dist > 2) {
      const angle = Math.atan2(dy, dx)

      const slowMulti = this.attackReady ? 1 : 0.66
      const speed =
        BASE_SPEED *
        this.stats.speedMoveMulti *
        this.speedMultiplier *
        slowMulti
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      this.spriteBody.setVelocity(vx, vy)
      this.swordBody.setVelocity(vx, vy)
      this.head.setVelocity(vx, vy)
      if (this.sword.angle === 0) s.anims.play(`player-walk${affix}`, true)
    } else {
      this.stop()
    }

    const depthOffset = (this.sprite.y - 14) / 100
    this.sprite.setDepth(3 + depthOffset)
    this.sword.setDepth(3 + depthOffset)
    this.head.setDepth(3 + depthOffset)
  }

  stop() {
    this.swordBody.setVelocity(0)
    this.spriteBody.setVelocity(0)
    this.head.setVelocity(0)
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
    const damage = this.stats.damageRangeBase * this.stats.damageMulti
    shoot(this.scene, this.bullets, source, target, {
      damage,
      count,
      spread,
      speed: 120,
      size: Phaser.Math.Clamp(Math.ceil(this.stats.damageRangeBase / 8), 1, 4),
    })
  }

  async swing() {
    if (!this.sprite.active || this.sword.angle !== 0 || !this.attackReady)
      return

    this.scene.sound.play('player-attack')

    this.attackReady = false
    this.sprite.anims.play(`player-stab`, true)
    this.sword.setAngle(this.sword.flipX ? -90 : 90)
    this.shoot(this.stats.rangeCount)

    this.setSwordPosition()

    await this.delay(PLAYER_ATTACK_DURATION)
    if (!this.sprite.active) return
    this.sword.setAngle(0).setFrame(this.swordConfig.frame)
    await this.delay(PLAYER_ATTACK_DELAY / this.stats.speedMeleeMulti)
    if (!this.sprite.active) return
    this.attackReady = true
  }

  setSwordPosition = () => {
    const s = this.sprite

    let so = SWORD_OFFSET_X * s.scaleX
    let _sy = s.y - (this.attackReady ? 20 : 16) * s.scaleX
    if (this.sword.angle !== 0) {
      so += 13
      _sy += 7
      this.sword.setFrame(this.swordConfig.frame - 1)
    }
    let _sx = s.x + so * (this.sword.flipX ? -1 : 1)
    this.sword.setPosition(_sx, _sy)

    const { ox, oy, sx, sy } = this.swordConfig
    const hx = s.x + (this.sword.flipX ? -ox : ox)
    const hy = s.y + oy
    this.swordHit
      .setPosition(hx, hy)
      .setOrigin(this.sword.flipX ? 1 : 0, 0.5)
      .setSize(sx, sy)

    this.head.setPosition(
      s.x,
      s.y - (this.sword.angle !== 0 ? 13 : 14) * s.scaleX,
    )
    this.goldHit.setPosition(s.x, s.y - 10)
    let frame = 8 + registry.values.faceIndex * 2
    if (this.sword.angle !== 0) frame += 1
    this.head.setFrame(frame)
  }

  takeDamage = async (amount = 0, isRanged = false) => {
    if (this.justHit || !this.sprite.active || !this.sprite.visible) return

    if (isRanged) {
      amount -= this.stats.defenseRanged
    } else {
      amount -= this.stats.defenseMelee
    }

    if (this.attackReady) {
      amount *= 0.5
    }

    this.scene.sound.play('player-hit')

    amount = Phaser.Math.Clamp(amount, 0, 999)

    this.justHit = true
    this.health -= amount
    registry.set('health', this.health)

    if (this.health <= 0) {
      this.die()
    } else {
      this.sprite.setTintFill(0xec273f)
      this.head.setTintFill(0xec273f)
      await this.delay(250)
      this.sprite.clearTint()
      this.head.clearTint()
      await this.delay(50)
      this.justHit = false
    }
  }

  die = async () => {
    this.scene.sound.play('player-die')
    this.sprite.setActive(false).setVisible(false)
    this.head.setActive(false).setVisible(false)
    this.shouldMove = false
    this.stop()
    this.scene.add
      .sprite(this.sprite.x, this.sprite.y, 'spritesheet', 7)
      .setOrigin(0.5, 1)

    this.sword
      .setAngle(90)
      .setFrame(this.swordConfig.frame - 1)
      .setPosition(this.sprite.x + 20, this.sprite.y - 4)

    registry.set('gold', 0)
    registry.set('deathCount', registry.values.deathCount + 1)
    const up = registry.values.upgrades
    ITEMS.filter((i) => i.temporary).forEach((item) => {
      up[item.key as IUpgradeKeys] = 0
    })
    registry.set('upgrades', up)
    registry.set('faceIndex', (registry.values.faceIndex + 1) % 4)

    await this.delay(1000)

    registry.set('pauseMusic', true)
    this.scene.cameras.main.fadeOut(1500, 0, 0, 0, (_event: any, p: number) => {
      if (p === 1) {
        this.scene.sound.play('game-over')
        this.scene.time.delayedCall(5000, () => {
          registry.set('pauseMusic', false)
          this.scene.scene.start('WorldMap')
        })
      }
    })
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

  get swordConfig() {
    return SWORD_CONFIGS[this.stats.sizeBase - 1]
  }

  get stats() {
    return ITEMS.reduce(
      (obj, item) => {
        const up = registry.values.upgrades?.[item.key as IUpgradeKeys] ?? 0

        item.effects?.slice(0, up)?.forEach((effectLevel) => {
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

export const baseStats: Record<IUpgradeKeys, number> = {
  healthMax: 10,
  defenseMelee: 0,
  defenseRanged: 0,

  rangeCount: 0,
  sizeBase: 1,
  speedMoveMulti: 1,

  damageMeleeBase: 1,
  damageMeleeFreq: 1,

  damageRangeBase: 4,
  damageMulti: 1,

  earnRateMulti: 1,

  speedMeleeMulti: 1,
}

const SWORD_CONFIGS = [
  { frame: 41, ox: 6, oy: -10, sx: 8, sy: 5 },
  { frame: 73, ox: 8, oy: -10, sx: 13, sy: 6 },
  { frame: 75, ox: 9, oy: -10, sx: 14, sy: 8 },
  { frame: 77, ox: 12, oy: -10, sx: 18, sy: 9 },
  { frame: 79, ox: 16, oy: -9, sx: 28, sy: 11 },
]
