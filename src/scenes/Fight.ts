import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { Bullet } from '../entities/Bullet'
import { Enemy } from '../entities/Enemy'
import { Gold } from '../entities/Gold'
import { INode, MAP_DATA } from '../utils/constants'
import { registry } from '../utils/registry'

export class Fight extends Scene {
  background: Phaser.GameObjects.Sprite
  player: Player
  enemies: Phaser.GameObjects.Group
  bullets: Phaser.GameObjects.Group
  gold: Phaser.GameObjects.Group
  node: INode

  constructor() {
    super('Fight')
  }

  create() {
    const { width, height } = this.cameras.main
    this.background = this.add.sprite(width / 2, height / 2, 'map', 1)

    this.enemies = this.add.group({ classType: Enemy, maxSize: 100 })
    this.gold = this.add.group({ classType: Gold, maxSize: 100 })
    this.player = new Player(this, { sword: true })
    this.bullets = this.add.group({
      classType: Bullet,
      maxSize: 100,
      runChildUpdate: true,
    })

    this.node = MAP_DATA.find((d) => d.id === registry.values.activeNode)!

    if (this.node.enemies) {
      this.spawnEnemies(this.node.enemies.min, this.node.enemies.max)
    }
    if (this.node.cellMapFrame) {
      this.background.setFrame(this.node.cellMapFrame)
    }
  }

  update() {
    this.player.update()

    if (this.player.isNearEdge()) this.backToMap()

    this.physics.overlap(this.player.sword, this.enemies, this.hitSwordEnemy)
    this.physics.overlap(this.player.sprite, this.enemies, this.hitPlayerEnemy)
    this.physics.overlap(this.player.sprite, this.gold, this.hitPlayerGold)
    this.physics.overlap(this.player.sprite, this.bullets, this.hitPlayerBullet)
    this.physics.overlap(this.enemies, this.player.bullets, this.hitEnemyBullet)

    if (this.input.activePointer.isDown) this.player.swing()
  }

  spawnEnemies(min: number, max: number) {
    const amount = Phaser.Math.RND.between(min, max)
    for (let i = 0; i < amount; i++) {
      const enemy = this.enemies.get() as Enemy
      enemy.spawn(
        Phaser.Math.RND.weightedPick(this.node.enemies?.pool ?? ['snake']),
      )
    }
  }

  checkIfFinished() {
    if (this.enemies.children.entries.every((c) => !c.active)) {
      const cleared = registry.values.clearedNodes ?? []
      const uniq = Array.from(new Set([...cleared, this.node.id]))
      registry.set('clearedNodes', uniq)
      // this.time.delayedCall(1000, this.backToMap.bind(this))
    }
  }

  backToMap() {
    this.scene.start('WorldMap')
  }

  hitEnemyBullet = (_enemy: unknown, _bullet: unknown) => {
    const bullet = _bullet as Bullet
    const enemy = _enemy as Enemy
    if (!enemy.active) return

    bullet.takeDamage(1)
    enemy.takeDamage(
      this.player.stats.damageRangeBase * this.player.stats.damageRangeMulti,
    )
  }

  hitPlayerBullet = (_player: unknown, _bullet: unknown) => {
    if (!this.player.sprite.active) return

    const bullet = _bullet as Bullet
    bullet.takeDamage(1)
    //  TODO: take enemy range damage
    // need to associated bullet with enemy
    // player.takeDamage(enemy.rangeDamage,true)
    this.player.takeDamage(1, true)
  }

  hitPlayerEnemy = (_player: unknown, _enemy: unknown) => {
    if (!this.player.sprite.active) return

    const enemy = _enemy as Enemy
    this.player.takeDamage(enemy.meleeDamage)
  }

  hitPlayerGold = (_player: unknown, _gold: unknown) => {
    const gold = _gold as Gold
    gold.pickup()
  }

  hitSwordEnemy = (_sword: unknown, _enemy: unknown) => {
    if (this.player.sword.angle === 0) return

    const enemy = _enemy as Enemy
    if (!enemy.active) return
    enemy.takeDamage(
      this.player.stats.damageMeleeBase * this.player.stats.damageMeleeMulti,
      this.player.stats.damageMeleeFreq,
    )
    if (enemy.health <= 0) {
      this.gold.get().spawn(enemy.x, enemy.y, enemy.gold)

      this.checkIfFinished()
    }
  }
}
