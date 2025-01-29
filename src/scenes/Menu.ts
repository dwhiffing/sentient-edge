import { Scene, GameObjects } from 'phaser'
import { registry } from '../utils/registry'

export class Menu extends Scene {
  title: GameObjects.Image
  sword: GameObjects.Image
  text: GameObjects.BitmapText
  background: GameObjects.Sprite
  music: Phaser.Sound.BaseSound

  constructor() {
    super('Menu')
  }

  create() {
    const { width, height } = this.cameras.main
    const hasWon = registry.values.hasWon

    this.cameras.main.fadeFrom(1000, 0, 0, 0)

    this.background = this.add.sprite(width / 2, height / 2, 'map', 3)
    this.title = this.add
      .image(width / 2, height / 2 - 65, 'title')
      .setOrigin(0.5)
      .setAlpha(0)
    this.sword = this.add.image(width / 2 - 1, -100, 'sword').setOrigin(0.5)

    this.text = this.add
      .bitmapText(
        width / 2,
        height / 2 + 65,
        'clarity',
        hasWon
          ? `You won in \n${secondsToHms(registry.values.timePlayed)}\nwith ${
              registry.values.deathCount
            } deaths`
          : 'Click to start',
        8,
      )
      .setCenterAlign()
      .setOrigin(0.5)
      .setAlpha(0)

    if (hasWon) {
      this.swordFall()
    } else {
      this.input.once('pointerdown', this.swordFall)
    }

    // TODO remove me
    // this.scene.launch('Hud')
    // this.scene.start('WorldMap')
  }

  startGame = () => {
    this.tweens.add({
      targets: this.music,
      volume: 0,
      duration: 1000,
      onComplete: () => {
        this.music?.stop()
      },
    })
    this.cameras.main.fadeOut(1000, 0, 0, 0, (_event: any, p: number) => {
      if (p === 1) {
        this.scene.launch('Hud')
        this.scene.start('WorldMap')
      }
    })
  }

  swordFall = () => {
    const { height } = this.cameras.main

    this.sound.play('sword-fall')

    this.tweens.add({
      targets: this.sword,
      y: height / 2 - 6,
      duration: 1500,
    })

    this.time.delayedCall(1500, () => {
      this.tweens.add({
        targets: this.sword,
        repeat: -1,
        y: { from: height / 2 - 6, to: height / 2 - 3 },
        yoyo: true,
        ease: 'Phaser.Math.Easing.Sine.InOut',
        duration: 2000,
        onUpdate: () => {
          this.sword.y = Math.round(this.sword.y)
        },
      })
      this.time.delayedCall(500, () => {
        if (registry.values.hasWon) {
          this.music = this.sound.add('music-win', { loop: true, volume: 0.5 })
        } else {
          this.music = this.sound.add('music-menu', { loop: true, volume: 0.5 })
        }
        this.music.play()
        this.input.once('pointerdown', this.startGame)
      })
      this.sound.play('sword-land')
      this.tweens.add({
        targets: this.title,
        alpha: 1,
        ease: 'Phaser.Math.Easing.Sine.InOut',
        duration: 2500,
      })

      this.tweens.add({
        targets: this.text,
        alpha: 1,
        duration: 2500,
      })
    })
  }
}

function secondsToHms(d: number) {
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor((d % 3600) % 60)

  return `${`${h}`.padStart(2, '0')}:${`${m}`.padStart(
    2,
    '0',
  )}:${`${s}`.padStart(2, '0')}`
}
