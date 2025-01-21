import { Scene } from 'phaser'
import { Player } from '../entities/Player'

const MAP_DATA = [
  {
    type: 'fight',
    name: 'Desert',
    x: 0.25,
    y: 0.85,
  },
  {
    type: 'shop',
    name: 'Desert Shop',
    x: 0.1,
    y: 0.9,
  },
]

export class WorldMap extends Scene {
  background: Phaser.GameObjects.Image
  player: Player
  covers: Phaser.GameObjects.Rectangle[]
  spots: Phaser.GameObjects.Sprite[]
  text: Phaser.GameObjects.BitmapText
  textBackground: Phaser.GameObjects.Rectangle

  constructor() {
    super('WorldMap')
  }

  create() {
    this.background = this.add.image(0, 0, 'map').setOrigin(0)
    this.data.set('zoomIndex', -1)

    const { width, height } = this.cameras.main

    this.physics.world.setBounds(0, 0, width, height - 12)

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
        .setName(d.name)
        .setAlpha(0)
    })

    this.player = new Player(this)

    // this.revealMap(0)
    // this.revealMap(1)
    // this.revealMap(2)
    // this.revealMap(3)
    // this.revealMap(4)
    // this.revealMap(5)
    // this.revealMap(7)
    // this.revealMap(8)
    this.revealMap(6)

    this.textBackground = this.add
      .rectangle(0, height - 12, width, 12, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(0)
    this.text = this.add
      .bitmapText(0, height - 12, 'clarity', '', 8)
      .setAlpha(0)

    const layer = this.add.layer([this.textBackground, this.text])
    const layer2 = this.add.layer([
      this.background,
      this.player.sprite,
      ...this.spots,
    ])

    this.cameras.main.ignore(layer)
    const camera = this.cameras.add()
    camera.ignore(layer2)

    this.input.on('pointerdown', () => {
      // find index of cell player is in when clicked
      const xIndex = Math.floor(this.player.sprite.x / (width / 3))
      const yIndex = Math.floor(this.player.sprite.y / (height / 3))
      const zoomIndex = (xIndex % 3) + yIndex * 3
      if (this.data.get('zoomIndex') !== -1) {
        this.data.set('zoomIndex', -1)
        this.cameras.main.setZoom(1, 1).setScroll(0, 0)
        this.spots.forEach((s) => s.setAlpha(0))
        this.text.setAlpha(0)
        this.textBackground.setAlpha(0)
      } else {
        this.spots.forEach((s) => s.setAlpha(1))
        this.text.setAlpha(1)
        this.textBackground.setAlpha(1)
        this.cameras.main
          .setZoom(3, 3)
          .setScroll(
            -width / 3 + (width / 3) * xIndex + 1,
            -height / 3 + (height / 3) * yIndex,
          )
        this.data.set('zoomIndex', zoomIndex)
        // this.scene.start('Fight')
      }
    })
  }

  revealMap(index: number) {
    this.covers[index].setAlpha(0)
    const body = this.covers[index].body! as Phaser.Physics.Arcade.Body
    body.enable = false
  }

  update() {
    this.player.update()
    this.physics.collide(this.covers, this.player.sprite)
    // if spot is near, set text to near spot name, otherwise blank string

    if (this.data.get('zoomIndex') > -1)
      this.text.setText(
        this.spots.find(
          (s) => Phaser.Math.Distance.BetweenPoints(s, this.player.sprite) < 15,
        )?.name ?? '',
      )
  }
}
