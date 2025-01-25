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

    this.player = new Player(this, width / 2, height / 2)
    this.player.sprite.setScale(2)
    this.player.speed = 60

    this.spot = MAP_DATA.find((d) => d.id === registry.values.activeNode)!

    if (this.spot?.enemies) {
      this.spawnEnemy(this.spot.enemies.min, this.spot.enemies.max)
    }

    this.input.on('pointerdown', () => {
      this.player.swing()
    })
  }

  spawnEnemy(min: number, max: number) {
    const amount = Phaser.Math.RND.between(min, max)
    for (let i = 0; i < amount; i++) this.enemies.get()?.spawn()
  }

  spawnGold(x: number, y: number) {
    this.gold.get().spawn(x, y)
  }

  backToMap() {
    this.scene.start('WorldMap')
  }

  checkIfFinished() {
    if (!this.enemies.children.entries.every((c) => !c.active)) {
      const cleared = registry.values.clearedNodes ?? []
      const uniq = Array.from(new Set([...cleared, this.spot.id]))
      registry.set('clearedNodes', uniq)
      this.time.delayedCall(1000, this.backToMap.bind(this))
    }
  }

  update() {
    this.player.update()

    this.physics.overlap(this.player.sword, this.enemies, (_sword, _enemy) => {
      if (this.player.sword.angle === 0) return

      const enemy = _enemy as Enemy
      enemy.damage(1)
      if (enemy.health <= 0) {
        this.spawnGold(enemy.x, enemy.y)
      }

      this.checkIfFinished()
    })

    this.physics.overlap(this.player.sprite, this.enemies, () =>
      this.player.damage(1),
    )

    this.physics.overlap(this.player.sprite, this.gold, (_player, _gold) =>
      (_gold as Gold).pickup(),
    )

    if (this.player.isNearEdge()) this.backToMap()
  }
}
