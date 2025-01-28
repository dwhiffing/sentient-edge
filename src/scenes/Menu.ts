import { Scene, GameObjects } from 'phaser'
import { registry } from '../utils/registry'

export class Menu extends Scene {
  title: GameObjects.BitmapText

  constructor() {
    super('Menu')
  }

  create() {
    const { width, height } = this.cameras.main
    const hasWon = registry.values.hasWon
    this.title = this.add
      .bitmapText(
        width / 2,
        height / 2 - (hasWon ? 40 : 0),
        'clarity',
        'Sentient\nEdge',
        16,
      )
      .setCenterAlign()
      .setOrigin(0.5)

    this.title = this.add
      .bitmapText(
        width / 2,
        height / 2 + 40,
        'clarity',
        hasWon
          ? `You won in \n${secondsToHms(registry.values.timePlayed)}\nwith ${
              registry.values.deathCount
            } deaths`
          : 'Click to start',
        16,
      )
      .setCenterAlign()
      .setOrigin(0.5)

    this.input.once('pointerdown', this.startGame)

    // TODO remove me
    // this.startGame()
  }

  startGame = () => {
    this.scene.launch('Hud')
    this.scene.start('WorldMap')
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
