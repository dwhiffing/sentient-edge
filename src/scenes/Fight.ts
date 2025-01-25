import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { Enemy } from '../entities/Enemy'
import { Gold } from '../entities/Gold'
import { INode, MAP_DATA } from '../utils/constants'
import { registry } from '../utils/registry'

export class Fight extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  enemies: Phaser.GameObjects.Group
  gold: Phaser.GameObjects.Group
  spot: INode

  constructor() {
    super('Fight')
  }

  create() {
    const { width, height } = this.cameras.main
    this.background = this.add.image(width / 2, height / 2, 'map2')

    this.enemies = this.add.group({ classType: Enemy, maxSize: 100 })
    this.gold = this.add.group({ classType: Gold, maxSize: 100 })
    this.player = new Player(this, { speed: 60, sword: true })

    this.spot = MAP_DATA.find((d) => d.id === registry.values.activeNode)!

    if (this.spot.enemies) {
      this.spawnEnemies(this.spot.enemies.min, this.spot.enemies.max)
    }

    this.input.on('pointerdown', () => this.player.swing())
  }

  update() {
    this.player.update()

    if (this.player.isNearEdge()) this.backToMap()

    this.physics.overlap(this.player.sword, this.enemies, this.hitSwordEnemy)
    this.physics.overlap(this.player.sprite, this.enemies, this.hitPlayerEnemy)
    this.physics.overlap(this.player.sprite, this.gold, this.hitPlayerGold)
  }

  hitPlayerEnemy = (_player: unknown, _enemy: unknown) => {
    this.player.damage(1)
  }

  hitPlayerGold = (_player: unknown, _gold: unknown) => {
    const gold = _gold as Gold
    gold.pickup()
  }

  hitSwordEnemy = (_sword: unknown, _enemy: unknown) => {
    if (this.player.sword.angle === 0) return

    const enemy = _enemy as Enemy
    if (!enemy.active) return
    enemy.damage(1)
    if (enemy.health <= 0) {
      this.spawnGold(enemy.x, enemy.y)
      this.checkIfFinished()
    }
  }

  spawnEnemies(min: number, max: number) {
    const amount = Phaser.Math.RND.between(min, max)
    for (let i = 0; i < amount; i++) this.enemies.get()?.spawn()
  }

  spawnGold(x: number, y: number) {
    this.gold.get().spawn(x, y)
  }

  checkIfFinished() {
    if (this.enemies.children.entries.every((c) => !c.active)) {
      const cleared = registry.values.clearedNodes ?? []
      const uniq = Array.from(new Set([...cleared, this.spot.id]))
      registry.set('clearedNodes', uniq)
      // this.time.delayedCall(1000, this.backToMap.bind(this))
    }
  }

  backToMap() {
    this.scene.start('WorldMap')
  }
}
