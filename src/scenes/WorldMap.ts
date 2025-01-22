import { Scene } from 'phaser'
import { Player } from '../entities/Player'
import { MAP_DATA } from '../constants'

export class WorldMap extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  covers: Phaser.GameObjects.Rectangle[]
  spots: Phaser.GameObjects.Group

  constructor() {
    super('WorldMap')
  }

  init() {
    this.registry.set('health', 10)
  }

  create() {
    this.background = this.add.image(0, 0, 'map').setOrigin(0)
    this.data.set('zoomIndex', -1)

    const { width, height } = this.cameras.main

    this.covers = Array.from({ length: 9 }).map((_, i) => {
      const rectangle = this.add
        .rectangle(
          (width / 3) * (i % 3),
          (width / 3) * Math.floor(i / 3),
          width / 3,
          width / 3,
          0x000000,
        )
        .setOrigin(0)

      this.physics.add.existing(rectangle, true)

      return rectangle
    })

    this.spots = this.add.group({
      defaultKey: 'spritesheet',
    })

    this.player = new Player(this)
    this.player.sprite.setPosition(32, this.cameras.main.height - 32)

    this.input.on('pointerdown', () => {
      if (this.data.get('zoomIndex') === -1) {
        const xIndex = Math.floor(this.player.sprite.x / (width / 3))
        const yIndex = Math.floor(this.player.sprite.y / (height / 3))
        const zoomIndex = (xIndex % 3) + yIndex * 3
        this.zoom(zoomIndex)
      } else {
        const spot = this.getNearestSpot()
        if (spot) {
          this.registry.set('hud-text', '')
          this.registry.set('active-node-index', spot.getData('id'))
          this.scene.switch(
            spot.getData('type').includes('fight') ? 'Fight' : 'Shop',
          )
        }
      }
    })

    this.revealMap(6)
    this.zoom(6)
  }

  unzoom() {
    const { width, height } = this.cameras.main
    this.background.setScale(1)
    this.background.setPosition(0, 0)
    this.spots.setVisible(false)
    // @ts-ignore
    this.covers.forEach((s) => s.setAlpha(s.body!.enable ? 1 : 0))
    this.player.sprite.setScale(1)
    // move player to center of zoom coord
    const zoomIndex = this.data.get('zoomIndex')
    const zoomX = zoomIndex % 3
    const zoomY = Math.floor(zoomIndex / 3)
    this.player.speed = 25

    this.player.sword.setVisible(false)
    this.player.sprite.x = 0.5 * (width / 3) + (width / 3) * zoomX
    this.player.sprite.y = 0.5 * (height / 3) + (height / 3) * zoomY
    this.data.set('zoomIndex', -1)
  }

  zoom(zoomIndex: number) {
    const { width, height } = this.cameras.main

    const xIndex = zoomIndex % 3
    const yIndex = Math.floor(zoomIndex / 3)

    this.player.sword.setVisible(true)
    this.player.speed = 50
    this.player.sprite.setScale(2)
    this.spots.clear()

    MAP_DATA.filter((d) => d.cellIndex === zoomIndex).forEach((d) => {
      const spot = this.spots.get(d.x * width, d.y * height)
      const frame = d.type.includes('fight') ? 4 : 5
      spot
        .setFrame(frame)
        .setScale(2)
        .setData('name', d.name)
        .setData('type', d.type)
        .setData('id', d.id)
    })
    this.covers.forEach((s) => s.setAlpha(0))

    this.background.setScale(3)
    this.background.setPosition(
      (-width / 3) * 3 * xIndex,
      (-height / 3) * 3 * yIndex,
    )

    this.player.sprite.x = 0.5 * width
    this.player.sprite.y = 0.5 * height

    this.data.set('zoomIndex', zoomIndex)
  }

  revealMap(index: number) {
    this.covers[index].setAlpha(0)
    const body = this.covers[index].body! as Phaser.Physics.Arcade.Body
    body.enable = false
  }

  getNearestSpot() {
    return this.spots.getChildren().find((_s) => {
      const s = _s as Phaser.GameObjects.Sprite
      return (
        s.alpha === 1 &&
        Phaser.Math.Distance.BetweenPoints(s, this.player.sprite) < 15
      )
    })
  }

  update() {
    this.player.update()

    if (this.data.get('zoomIndex') > -1) {
      if (
        this.player.sprite.x < 10 ||
        this.player.sprite.x > this.cameras.main.width - 10 ||
        this.player.sprite.y < 10 ||
        this.player.sprite.y > this.cameras.main.height - 10
      ) {
        this.unzoom()
      }

      this.registry.set(
        'hud-text',
        this.getNearestSpot()?.getData('name') ?? '',
      )
    } else {
      this.physics.collide(this.covers, this.player.sprite)
    }
  }
}
