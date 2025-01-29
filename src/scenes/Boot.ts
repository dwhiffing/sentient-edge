import { Scene } from 'phaser'
import { registry } from '../utils/registry'

export class Boot extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0x222222)
    const bar = this.add.rectangle(0, 64, 10, 128, 0x222222).setOrigin(0, 0)

    this.load.on('progress', (progress: number) => {
      bar.width = this.cameras.main.width * progress
    })

    try {
      this.registry.events.on('changedata', registry.saveGame)
      registry.init(this.game)
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
    this.load.image('sword', 'sword.png')
    this.load.image('title', 'title.png')

    this.load.audio('sword-fall', 'sound/sword-fall.mp3')
    this.load.audio('sword-land', 'sound/sword-land.mp3')
    this.load.audio('music-menu', 'sound/cs-suggest-menu.mp3')
    this.load.audio('music-game', 'sound/pp-game-music.mp3')
    this.load.audio('music-win', 'sound/cs-zippy-win.mp3')
    this.load.audio('player-enter', 'sound/cs-player-steps.mp3')
    this.load.audio('player-exit', 'sound/cs-player-exit.mp3')
    this.load.audio('player-attack', 'sound/cs-player-attack.mp3')
    this.load.audio('player-hit', 'sound/cs-player-hurt.mp3')
    this.load.audio('player-die', 'sound/cs-player-die.mp3')
    this.load.audio('enemy-hit', 'sound/cs-enemy-die2.mp3')
    this.load.audio('enemy-die', 'sound/cs-enemy-die.mp3')
    this.load.audio('enemy-shoot', 'sound/cs-enemy-shoot.mp3')
    this.load.audio('menu-select', 'sound/cs-menu-select.mp3')
    this.load.audio('menu-confirm', 'sound/cs-menu-confirm.mp3')
    this.load.audio('menu-deny', 'sound/cs-menu-deny.mp3')
    this.load.audio('game-over', 'sound/cs-game-over.mp3')
    this.load.audio('gold', 'sound/gold.mp3')
    this.load.audio('boss-victory', 'sound/cs-defeat-boss.mp3')
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
      key: 'shopkeep-idle',
      frames: [{ key: 'spritesheet', frame: 16 }],
      duration: 900,
      repeatDelay: 0,
      repeat: -1,
    })
    this.anims.create({
      key: 'shopkeep-talk',
      frames: [
        { key: 'spritesheet', frame: 16 },
        { key: 'spritesheet', frame: 17 },
        { key: 'spritesheet', frame: 18 },
        { key: 'spritesheet', frame: 19 },
        { key: 'spritesheet', frame: 18 },
        { key: 'spritesheet', frame: 17 },
      ],
      duration: 900,
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
