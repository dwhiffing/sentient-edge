import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { Enemy } from '../entities/Enemy'
import { Gold } from '../entities/Gold'
import { MAP_DATA } from '../constants'

export class Fight extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  enemies: Phaser.GameObjects.Group
  gold: Phaser.GameObjects.Group

  constructor() {
    super('Fight')
  }

  create() {
    this.background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'map2',
    )

    this.player = new Player(this)
    this.player.sprite.setScale(2)
    this.player.speed = 60

    this.enemies = this.add.group({ classType: Enemy, maxSize: 100 })
    this.gold = this.add.group({ classType: Gold, maxSize: 100 })

    const spot = MAP_DATA.find(
      (d) => d.id === this.registry.get('active-node-index'),
    )

    console.log(spot?.enemies)

    if (spot && spot.enemies) {
      this.spawnEnemy(spot.enemies.min, spot.enemies.max)
    }

    this.input.on('pointerdown', () => {
      this.player.swing()
    })
  }

  spawnEnemy(min: number, max: number) {
    const amount = Phaser.Math.RND.between(min, max)
    for (let i = 0; i < amount; i++) {
      const _enemy = this.enemies.get()
      if (_enemy) _enemy.spawn()
    }
  }

  spawnGold(x: number, y: number) {
    this.gold.get().spawn(x, y)
  }

  backToMap() {
    this.scene.start('WorldMap')
  }

  update() {
    this.player.update()

    this.physics.overlap(this.player.sword, this.enemies, (_sword, _enemy) => {
      const enemy = _enemy as Enemy
      if (this.player.sword.angle !== 0) {
        const { x, y } = enemy
        enemy.damage(1)
        if (enemy.health <= 0) {
          this.spawnGold(x, y)
        }

        if (this.enemies.children.entries.every((c) => !c.active)) {
          this.time.delayedCall(1000, this.backToMap.bind(this))
        }
      }
    })

    this.physics.overlap(
      this.player.sprite,
      this.enemies,
      (_player, _enemy) => {
        this.player.damage(1)
      },
    )

    this.physics.overlap(this.player.sprite, this.gold, (_player, _gold) => {
      const gold = _gold as Gold
      gold.pickup()
    })

    if (
      this.player.sprite.x < 10 ||
      this.player.sprite.x > this.cameras.main.width - 10 ||
      this.player.sprite.y < 10 ||
      this.player.sprite.y > this.cameras.main.height - 10
    ) {
      this.backToMap()
    }
  }
}
