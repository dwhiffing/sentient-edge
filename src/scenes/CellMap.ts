import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { MAP_DATA, NODE_FRAMES } from '../utils/constants'
import { registry } from '../utils/registry'

export class CellMap extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  nodes: Phaser.GameObjects.Group

  constructor() {
    super('CellMap')
  }

  init() {
    if (this.player) {
      registry.set('health', this.player.stats.healthMax)
      registry.set('lastGold', 0)
      registry.set('enemyName', 0)
      registry.set('activeNode', 0)
    }
  }

  create() {
    const zoomIndex = registry.values.activeZoom
    const w = this.cameras.main.width
    const zoomX = zoomIndex % 3
    const zoomY = Math.floor(zoomIndex / 3)

    this.background = this.add
      .sprite(-w * zoomX, -w * zoomY, 'map', 0)
      .setOrigin(0)
      .setScale(3)

    this.nodes = this.add.group({ defaultKey: 'spritesheet' })
    this.updateNodes()

    this.player = new Player(this, { sword: true })
    registry.set('health', this.player.stats.healthMax)

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

    if (this.player.isNearEdge() && this.getHasClearedFirstCell()) {
      this.unzoom()
    }

    const nearSpotName = this.getNearestNode()?.getData('name') ?? ''
    if (nearSpotName !== registry.values.hudText)
      registry.set('hudText', nearSpotName)
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

    registry.set('hudText', '')

    const id = spot.getData('id')
    registry.set('activeNode', id)

    const unlocked = registry.values.unlockedNodes ?? []
    const uniq = Array.from(new Set([...unlocked, id]))
    registry.set('unlockedNodes', uniq)

    const newScene = spot.getData('type').includes('fight') ? 'Fight' : 'Shop'
    this.scene.switch(newScene)
  }

  unzoom() {
    registry.set('lastZoom', registry.values.activeZoom)
    registry.set('activeZoom', -1)
    this.scene.start('WorldMap')
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
}
