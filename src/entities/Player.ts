import { MAP_DATA } from '../utils/constants'
import { registry } from '../utils/registry'

type IPlayerParams = {
  x?: number
  y?: number
  scale?: number
  sword?: boolean
  speed?: number
}

const SWORD_OFFSET_X = 10

export class Player {
  scene: Phaser.Scene
  sprite: Phaser.Physics.Arcade.Sprite
  spriteBody: Phaser.Physics.Arcade.Body
  sword: Phaser.Physics.Arcade.Sprite
  swordBody: Phaser.Physics.Arcade.Body
  speed: number
  health: number
  justHit: boolean

  constructor(scene: Phaser.Scene, params: IPlayerParams) {
    this.scene = scene
    const w = this.scene.cameras.main.width
    const x = params.x ?? w / 2
    const y = params.y ?? w / 2
    const scale = params.scale ?? 1

    this.sword = this.scene.physics.add.sprite(x, y, 'spritesheet', 40)
    this.swordBody = this.sword.body as Phaser.Physics.Arcade.Body
    this.swordBody.setSize(12, 6)
    this.sword.setScale(scale).setOrigin(0.5, 0.7).setVisible(!!params.sword)

    this.sprite = this.scene.physics.add.sprite(x, y, 'spritesheet', 0)
    this.spriteBody = this.sprite.body as Phaser.Physics.Arcade.Body
    this.spriteBody.setSize(15, 15)
    this.sprite
      .setScale(scale)
      .setCollideWorldBounds(true)
      .setOrigin(0.5, 1)
      .setOffset(8, 16)

    this.speed = params.speed ?? 30
    this.health = registry.values.health
    this.justHit = false
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

    this.sword.setOffset(this.sword.flipX ? 0 : 16, 19)
    let so = SWORD_OFFSET_X
    let sy = s.y - 11
    if (this.sword.angle !== 0) {
      so += 5
      sy += 2
    }
    let sx = s.x + so * (this.sword.flipX ? -1 : 1)
    this.sword.setPosition(sx, sy)

    const dist = Phaser.Math.Distance.Between(p.x, p.y, s.x, s.y)
    const affix = this.sword.visible ? '-sword' : ''
    if (dist > 1) {
      const angle = Math.atan2(dy, dx)

      this.spriteBody.setVelocity(
        Math.cos(angle) * this.speed,
        Math.sin(angle) * this.speed,
      )
      if (this.sword.angle === 0) s.anims.play(`player-walk${affix}`, true)
    } else {
      this.spriteBody.setVelocity(0)
      if (this.sword.angle === 0) s.anims.play(`player-idle${affix}`)
    }
  }

  swing() {
    if (!this.sprite.active || this.sword.angle !== 0) return

    this.sprite.anims.play(`player-stab`, true)
    this.sword.setAngle(this.sword.flipX ? -90 : 90)
    this.scene.time.delayedCall(800, () => this.sword.setAngle(0))
  }

  damage = async (amount = 0) => {
    if (this.justHit || !this.sprite.active || !this.sprite.visible) return

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

  die() {
    this.sprite.setActive(false).setVisible(false)
    // this.sword.setActive(false).setVisible(false)
    this.scene.add
      .sprite(this.sprite.x, this.sprite.y, 'spritesheet', 7)
      .setOrigin(0.5, 1)
    this.scene.time.delayedCall(1000, () => this.scene.scene.start('WorldMap'))
  }

  isNearEdge = () =>
    this.sprite.x < 10 ||
    this.sprite.x > this.scene.cameras.main.width - 10 ||
    this.sprite.y < 20 ||
    this.sprite.y > this.scene.cameras.main.height - 10

  hasKilledABoss = () =>
    MAP_DATA.filter((d) => d.type === 'fight-boss').some((d) =>
      (registry.values.clearedNodes ?? []).includes(d.id),
    )

  delay = (delay: number) =>
    new Promise((resolve) => {
      this.scene.time.delayedCall(delay, resolve)
    })
}
