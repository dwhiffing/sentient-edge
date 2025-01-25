import { MAP_DATA } from '../utils/constants'
import { registry } from '../utils/registry'

export class Player {
  scene: Phaser.Scene
  sprite: Phaser.Physics.Arcade.Sprite
  sword: Phaser.Physics.Arcade.Sprite
  speed: number
  health: number
  justHit: boolean

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene
    this.sprite = this.scene.physics.add.sprite(x, y, 'spritesheet', 0)
    this.speed = 30
    this.health = registry.values.health
    this.justHit = false
    this.sprite.body!.setSize(5, 5)
    this.sprite.setCollideWorldBounds(true)
    this.sprite.play('player-walk')

    this.sword = this.scene.physics.add
      .sprite(
        this.scene.cameras.main.width / 2,
        this.scene.cameras.main.height / 2,
        'spritesheet',
        2,
      )
      .setScale(2)
      .setOrigin(0.5, 1)
    this.sword.body!.setSize(10, 3)
  }

  die() {
    this.sprite.setActive(false)
    this.sword.setActive(false)
    this.sprite.setVisible(false)
    this.sword.setVisible(false)

    this.scene.time.delayedCall(1000, () => this.scene.scene.start('WorldMap'))
  }

  damage(amount = 0) {
    if (this.justHit || !this.sprite.active || !this.sprite.visible) return
    this.justHit = true

    this.health -= amount

    registry.set('health', this.health)
    this.sprite.setTintFill(0xff0000)
    if (this.health <= 0) {
      this.die()
    } else {
      this.scene.time.delayedCall(250, () => {
        this.sprite.clearTint()
        this.scene.time.delayedCall(50, () => {
          this.justHit = false
        })
      })
    }
  }

  swing() {
    if (this.sword.angle !== 0) return

    this.sword.setAngle(this.sword.flipX ? 90 : -90)
    this.scene.time.delayedCall(800, () => {
      this.sword.setAngle(0)
    })
  }

  getClearedNodes = () => registry.values.clearedNodes ?? []

  hasKilledABoss = () =>
    MAP_DATA.filter((d) => d.type === 'fight-boss').some((d) =>
      this.getClearedNodes().includes(d.id),
    )

  isNearEdge() {
    return (
      this.sprite.x < 10 ||
      this.sprite.x > this.scene.cameras.main.width - 10 ||
      this.sprite.y < 10 ||
      this.sprite.y > this.scene.cameras.main.height - 10
    )
  }

  update() {
    let { x, y } = this.scene.input.activePointer

    const dx = x - this.sprite.x
    const dy = y - this.sprite.y
    const angle = Math.atan2(dy, dx)
    const dist = Phaser.Math.Distance.Between(
      x,
      y,
      this.sprite.x,
      this.sprite.y,
    )
    if (Math.abs(dx) > 2) {
      this.sprite.setFlipX(dx > 0)
      this.sword.setFlipX(dx > 0)
      this.sword.setOffset(dx > 0 ? 12 : -6, 14)
      if (this.sword.angle !== 0) {
        this.sword.setAngle(this.sword.flipX ? 90 : -90)
      }
    }
    const body = this.sprite.body as Phaser.Physics.Arcade.Body
    this.sword.setPosition(
      this.sprite.x + (this.sword.flipX ? 12 : -12),
      this.sprite.y - 2,
    )
    if (dist > 1) {
      body.velocity.x = Math.cos(angle) * this.speed
      body.velocity.y = Math.sin(angle) * this.speed
      this.sprite.anims.play('player-walk', true)
    } else {
      body.setVelocity(0)
      this.sprite.anims.stop()
    }
  }
}
