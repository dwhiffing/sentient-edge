import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { Bullet } from '../entities/Bullet'
import { Enemy } from '../entities/Enemy'
import { Gold } from '../entities/Gold'
import { INode, MAP_DATA, PLAYER_ATTACK_DURATION } from '../utils/constants'
import { registry } from '../utils/registry'

export class Fight extends Scene {
  background: Phaser.GameObjects.Sprite
  player: Player
  enemies: Phaser.GameObjects.Group
  bullets: Phaser.GameObjects.Group
  gold: Phaser.GameObjects.Group
  node: INode
  canAttack: boolean
  edgeTimer: number
  isLeaving: boolean
  enemyNameDebounceEvent: Phaser.Time.TimerEvent
  lastGoldAmountDebounceEvent: Phaser.Time.TimerEvent

  constructor() {
    super('Fight')
  }

  create() {
    const { width, height } = this.cameras.main
    this.background = this.add.sprite(width / 2, height / 2, 'map', 1)
    this.isLeaving = false
    this.edgeTimer = 0
    this.physics.world.setBounds(-10, 0, width + 15, height + 10)
    this.cameras.main.fadeFrom(250, 0, 0, 0)
    this.enemies = this.add.group({
      classType: Enemy,
      maxSize: 100,
      runChildUpdate: true,
    })
    this.gold = this.add.group({
      classType: Gold,
      maxSize: 100,
      runChildUpdate: true,
    })
    this.player = new Player(this)
    this.bullets = this.add.group({
      classType: Bullet,
      maxSize: 100,
      runChildUpdate: true,
    })

    this.node = MAP_DATA.find((d) => d.id === registry.values.activeNode)!

    if (this.node.enemies) {
      this.spawnEnemies()
    }
    if (this.node.cellMapFrame) {
      this.background.setFrame(this.node.cellMapFrame)
    }

    this.canAttack = false
    this.time.delayedCall(300, () => {
      this.canAttack = true
    })
  }

  update() {
    this.player.update()

    if (this.player.isNearEdge()) {
      this.edgeTimer++
      if (this.edgeTimer > 120 && this.player.sprite.active) {
        this.backToMap()
      }
    } else {
      this.edgeTimer = 0
    }

    this.physics.overlap(this.player.swordHit, this.enemies, this.hitSwordEnemy)
    this.physics.overlap(this.player.sprite, this.enemies, this.hitPlayerEnemy)
    this.physics.overlap(this.player.sprite, this.gold, this.hitPlayerGold)
    this.physics.overlap(this.player.goldHit, this.gold, this.hitGrabGold)
    this.physics.overlap(this.player.sprite, this.bullets, this.hitPlayerBullet)
    this.physics.overlap(this.enemies, this.player.bullets, this.hitEnemyBullet)

    if (this.input.activePointer.isDown && this.canAttack) this.player.swing()
  }

  spawnEnemies() {
    const w = this.cameras.main.width
    // size of cell
    const w2 = (w / 3) * 0.65
    // offset to center properly
    const o = w2 / 2 + (w - w2 * 3) / 2
    // how much do they spread from the center of the cell
    const s = 6

    // what indexes the enemies can spawn in if we divide the screen into thirds
    // center is not available
    let indexes = [0, 1, 2, 3, 5, 6, 7, 8]
    this.node.enemies?.forEach((_enemy) => {
      const shouldSpawn = Phaser.Math.RND.frac() <= _enemy.chance
      if (!shouldSpawn) return

      const amount = Phaser.Math.RND.between(_enemy.min, _enemy.max)
      for (let i = 0; i < amount; i++) {
        const index = Phaser.Math.RND.pick(indexes)
        indexes = indexes.filter((i) => i !== index)
        let x = (index % 3) * w2 + o
        let y = Math.floor(index / 3) * w2 + o

        x += Phaser.Math.RND.between(-s, s)
        y += Phaser.Math.RND.between(-s, s)

        const enemy = this.enemies.get() as Enemy
        enemy.spawn(x, y, _enemy.key)
      }
    })
  }

  checkIfFinished() {
    if (
      registry.values.hasWon ||
      (this.node.id !== 'castle-2e' &&
        registry.values.clearedNodes.includes(this.node.id))
    )
      return

    if (this.enemies.children.entries.every((c) => !c.active)) {
      const cleared = registry.values.clearedNodes ?? []
      const uniq = Array.from(new Set([...cleared, this.node.id]))
      registry.set('clearedNodes', uniq)

      const allCellNodes = MAP_DATA.filter(
        (d) =>
          d.cellIndex === registry.values.activeZoom &&
          d.type.includes('fight'),
      )
      if (
        allCellNodes.every((d) => uniq.includes(d.id)) &&
        this.node.id !== 'castle-2e'
      ) {
        registry.set('showClearedArrow', true)
      }

      if (
        MAP_DATA.filter((d) => d.type.includes('fight')).every((d) =>
          uniq.includes(d.id),
        )
      ) {
        registry.set('hasWon', true)
        // @ts-ignore
        this.scene.get('Hud').shutdown()
        this.cameras.main.fadeOut(1000, 0, 0, 0, (_event: any, p: number) => {
          if (p === 1) {
            this.scene.stop('Hud')
            this.scene.start('Menu')
          }
        })
      }
    }
  }

  backToMap() {
    if (this.isLeaving) return

    this.isLeaving = true
    this.sound.play('player-exit', { volume: 0.6 })

    this.cameras.main.fadeOut(250, 0, 0, 0, (_event: any, p: number) => {
      if (p === 1) {
        this.scene.start('CellMap')
        registry.set('enemyName', '')
        registry.set('lastGold', 0)
      }
    })
  }

  hitEnemyBullet = (_enemy: unknown, _bullet: unknown) => {
    const bullet = _bullet as Bullet
    const enemy = _enemy as Enemy
    if (!enemy.active || !bullet.active) return

    bullet.takeDamage(1)
    enemy.takeDamage(
      this.player.stats.damageRangeBase * this.player.stats.damageMulti,
      PLAYER_ATTACK_DURATION / this.player.stats.damageMeleeFreq,
      true,
    )

    if (enemy.health <= 0) {
      this.gold.get()?.spawn(enemy.x, enemy.y, enemy.gold)
      this.checkIfFinished()
    }
  }

  hitPlayerBullet = (_player: unknown, _bullet: unknown) => {
    if (!this.player.sprite.active) return

    const bullet = _bullet as Bullet
    this.player.takeDamage(bullet.damage, true)
    bullet.takeDamage(1)
  }

  hitPlayerEnemy = (_player: unknown, _enemy: unknown) => {
    const enemy = _enemy as Enemy
    if (!this.player.sprite.active || !enemy.active) return

    this.player.takeDamage(enemy.meleeDamage)
  }

  hitPlayerGold = (_player: unknown, _gold: unknown) => {
    const gold = _gold as Gold
    if (!gold.active) return

    gold.pickup()
    this.lastGoldAmountDebounceEvent?.destroy()
    this.lastGoldAmountDebounceEvent = this.time.delayedCall(1500, () => {
      registry.set('lastGold', 0)
    })

    const allEnemiesDead = this.enemies.children.entries.every((c) => !c.active)
    const allGoldDead = this.gold.children.entries.every((c) => !c.active)
    if (allEnemiesDead && allGoldDead && this.node.id !== 'castle-2e') {
      this.time.delayedCall(800, () => this.backToMap())
    }
  }

  hitGrabGold = (_player: unknown, _gold: unknown) => {
    const gold = _gold as Gold
    if (!gold.active || gold.collectedTriggered) return

    gold.collectedTriggered = true

    this.time.delayedCall(150, () => {
      gold.collected = true
    })
  }

  hitSwordEnemy = (_sword: unknown, _enemy: unknown) => {
    if (this.player.sword.angle === 0 || !this.player.sprite.active) return

    const enemy = _enemy as Enemy
    if (!enemy.active) return
    enemy.takeDamage(
      this.player.stats.damageMeleeBase * this.player.stats.damageMulti,
      PLAYER_ATTACK_DURATION / this.player.stats.damageMeleeFreq,
    )
    if (enemy.health <= 0) {
      this.gold.get()?.spawn(enemy.x, enemy.y, enemy.gold)

      this.checkIfFinished()
    }
  }
}
