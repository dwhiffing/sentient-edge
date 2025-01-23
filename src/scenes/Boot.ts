import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)
    const bar = this.add.rectangle(0, 64, 10, 128, 0xffffff).setOrigin(0, 0)

    this.load.on('progress', (progress: number) => {
      bar.width = 256 * progress
    })
  }

  preload() {
    this.load.setPath('assets')
    this.load.image('map', 'map.png')
    this.load.image('map2', 'map2.png')
    this.load.bitmapFont('clarity', 'clarity.png', 'clarity.xml')
    this.load.spritesheet('spritesheet', 'spritesheet.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
  }

  create() {
    this.anims.create({
      key: 'player-walk',
      frames: [
        { key: 'spritesheet', frame: 0 },
        { key: 'spritesheet', frame: 1 },
      ],
      duration: 500,
      repeatDelay: 0,
      repeat: -1,
    })

    this.scene.start('Menu')
  }
}
