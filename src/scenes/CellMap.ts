import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { MAP_DATA, NODE_FRAMES } from '../utils/constants'
import { registry } from '../utils/registry'

export class CellMap extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  nodes: Phaser.GameObjects.Group
  isLeaving: boolean

  constructor() {
    super('CellMap')
  }

  create() {
    const zoomIndex = registry.values.activeZoom
    const w = this.cameras.main.width
    const zoomX = zoomIndex % 3
    const zoomY = Math.floor(zoomIndex / 3)

    this.isLeaving = false
    this.cameras.main.fadeFrom(250, 0, 0, 0)

    this.background = this.add
      .sprite(-w * zoomX, -w * zoomY, 'map', 0)
      .setOrigin(0)
      .setScale(3)

    this.nodes = this.add.group({ defaultKey: 'spritesheet' })
    this.updateNodes()

    const node = MAP_DATA.find((d) => d.id === registry.values.activeNode)!
    this.player = new Player(this, {
      x: node ? node.x * w : undefined,
      y: node ? node.y * w : undefined,
    })
    registry.set('health', this.player.stats.healthMax)
    registry.set('activeNode', 0)
    registry.set('enemyName', '')
    registry.set('lastGold', 0)

    if (registry.values.showClearedArrow) {
      registry.set('showClearedArrow', false)
      this.showClearedArrow()
    }

    this.input.on(
      'pointerdown',
      (_pointer: Phaser.Input.Pointer, targets: any[]) => {
        if (this.scene.isActive('Stats')) return
        if (targets.length === 0) this.enterNearbyNode()
      },
    )
  }

  update() {
    this.player.update()

    if (this.isLeaving) return
    if (this.player.isNearEdge() && this.getHasClearedFirstCell()) {
      this.unzoom()
    }

    const nearSpotName = this.getNearestNode()?.getData('name') ?? ''
    if (nearSpotName !== registry.values.hudText) {
      if (nearSpotName) this.sound.play('menu-select', { volume: 2 })

      registry.set('hudText', nearSpotName)
    }
  }

  updateNodes() {
    const { width, height } = this.cameras.main
    const zoomIndex = registry.values.activeZoom

    MAP_DATA.filter((d) => d.cellIndex === zoomIndex).forEach((d) => {
      const spot = this.nodes.get(d.x * width, d.y * height)
      let frame = NODE_FRAMES[d.type]
      if (
        d.type.includes('fight') &&
        registry.values.clearedNodes.includes(d.id)
      ) {
        frame = 59
      }

      let visible =
        d.type === 'shop' || registry.values.unlockedNodes?.includes(d.id)
      if (d.type === 'fight-boss') {
        visible = this.getClearedAllCellFightNodes()
      }

      spot
        .setFrame(frame)
        .setData('name', d.name)
        .setData('type', d.type)
        .setData('id', d.id)
        .setVisible(visible)
    })
  }

  enterNearbyNode = () => {
    const spot = this.getNearestNode()
    if (!spot) return
    if (this.isLeaving) return

    this.isLeaving = true
    registry.set('hudText', '')
    this.sound.play('player-enter')

    this.cameras.main.fadeOut(250, 0, 0, 0, (_event: any, p: number) => {
      if (p === 1) {
        const id = spot.getData('id')
        registry.set('activeNode', id)

        const unlocked = registry.values.unlockedNodes ?? []
        const uniq = Array.from(new Set([...unlocked, id]))
        registry.set('unlockedNodes', uniq)

        const newScene = spot.getData('type').includes('fight')
          ? 'Fight'
          : 'Shop'
        this.scene.switch(newScene)
      }
    })
  }

  unzoom() {
    if (this.isLeaving) return

    this.sound.play('player-exit', { volume: 0.6 })
    this.isLeaving = true
    this.cameras.main.fadeOut(250, 0, 0, 0, (_event: any, p: number) => {
      if (p === 1) {
        registry.set('lastZoom', registry.values.activeZoom)
        registry.set('activeZoom', -1)
        this.scene.start('WorldMap')
      }
    })
  }

  getNearestNode = () =>
    this.nodes.getChildren().find((_s) => {
      const spot = _s as Phaser.GameObjects.Sprite

      const dist = Phaser.Math.Distance.BetweenPoints(spot, this.player.sprite)
      if (dist > 20) return false

      if (spot.getData('type') === 'fight-boss') {
        return this.getClearedAllCellFightNodes()
      }

      return true
    })

  getClearedAllCellFightNodes = () =>
    this.getCellFightNodes().every((n) =>
      (registry.values.clearedNodes ?? []).includes(n.id),
    )

  getHasClearedFirstCell = () =>
    registry.values.activeZoom !== 6 ||
    MAP_DATA.filter((d) => d.cellIndex === 6 && d.type.includes('fight')).every(
      (n) => (registry.values.clearedNodes ?? []).includes(n.id),
    )

  getCellFightNodes = () =>
    MAP_DATA.filter(
      (d) => d.cellIndex === registry.values.activeZoom && d.type === 'fight',
    )

  showClearedArrow() {
    const w = this.cameras.main.width

    const dir =
      ARROW_DIRS[registry.values.activeZoom as keyof typeof ARROW_DIRS]
    let angle = 270
    let x = 10
    let y = w / 2
    if (dir === 0) {
      x = w / 2
      y = 20
      angle = 0
    } else if (dir === 1) {
      x = w - 10
      y = w / 2
      angle = 90
    } else if (dir === 2) {
      angle = 180
      x = w / 2
      y = w - 20
    }
    const arrow = this.add
      .sprite(x, y, 'spritesheet', 55)
      .setAngle(angle)
      .setOrigin(0.5, 0.5)
      .setDepth(20)

    this.time.addEvent({
      callback: () => arrow.setAlpha(arrow.alpha === 0.4 ? 1 : 0.4),
      delay: 400,
      repeat: -1,
    })
  }
}

const ARROW_DIRS = { 0: 1, 1: 1, 2: 0, 3: 0, 4: 3, 5: 3, 6: 1, 7: 1, 8: 0 }
