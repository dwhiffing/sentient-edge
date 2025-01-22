import { Scene } from 'phaser'
import { Player } from '../entities/Player'

const MAP_DATA = [
  {
    type: 'fight',
    name: 'Desert',
    x: 0.5,
    y: 0.5,
  },
  {
    type: 'shop',
    name: 'Desert Shop',
    x: 0.4,
    y: 0.8,
  },
]

export class WorldMap extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  covers: Phaser.GameObjects.Rectangle[]
  spots: Phaser.GameObjects.Sprite[]

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

    this.spots = MAP_DATA.map((d) => {
      const frame = d.type === 'fight' ? 4 : 5
      return this.add
        .sprite(d.x * width, d.y * height, 'spritesheet', frame)
        .setData('name', d.name)
        .setData('type', d.type)
        .setScale(2)
        .setAlpha(0)
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
          this.scene.switch(spot.getData('type') === 'fight' ? 'Fight' : 'Shop')
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
    this.spots.forEach((s) => s.setAlpha(0))
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
    this.spots.forEach((s) => s.setAlpha(1))
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
    return this.spots.find(
      (s) => Phaser.Math.Distance.BetweenPoints(s, this.player.sprite) < 15,
    )
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
