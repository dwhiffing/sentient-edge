import { Scene } from 'phaser'
import { registry } from '../utils/registry'

export class Boot extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)
    const bar = this.add.rectangle(0, 64, 10, 128, 0xffffff).setOrigin(0, 0)

    this.load.on('progress', (progress: number) => {
      bar.width = this.cameras.main.width * progress
    })

    try {
      this.registry.events.on('changedata', registry.saveGame)
      registry.loadSave()
    } catch (e) {
      console.log(e)
    }
  }

  preload() {
    this.load.setPath('assets')
    this.load.spritesheet('map', 'map.png', {
      frameWidth: 200,
      frameHeight: 200,
    })
    this.load.bitmapFont('clarity', 'clarity.png', 'clarity.xml')
    this.load.spritesheet('spritesheet', 'spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
  }

  create() {
    this.anims.create({
      key: 'player-idle',
      frames: [{ key: 'spritesheet', frame: 0 }],
      duration: 500,
      repeatDelay: 0,
      repeat: -1,
    })

    this.anims.create({
      key: 'player-walk',
      frames: [
        { key: 'spritesheet', frame: 1 },
        { key: 'spritesheet', frame: 2 },
      ],
      duration: 500,
      repeatDelay: 0,
      repeat: -1,
    })

    this.anims.create({
      key: 'player-idle-sword',
      frames: [{ key: 'spritesheet', frame: 3 }],
      duration: 500,
      repeatDelay: 0,
      repeat: -1,
    })

    this.anims.create({
      key: 'player-walk-sword',
      frames: [
        { key: 'spritesheet', frame: 4 },
        { key: 'spritesheet', frame: 5 },
      ],
      duration: 500,
      repeatDelay: 0,
      repeat: -1,
    })

    this.anims.create({
      key: 'player-stab',
      frames: [{ key: 'spritesheet', frame: 6 }],
      duration: 500,
      repeatDelay: 0,
      repeat: -1,
    })

    this.scene.start('Menu')
  }
}
