import { Scene } from 'phaser'
import { registry } from '../utils/registry'
import { StatsButton } from '../entities/StatsButton'

export class Hud extends Scene {
  topText: Phaser.GameObjects.BitmapText
  bottomText: Phaser.GameObjects.BitmapText
  bottomBar: Phaser.GameObjects.Rectangle
  topBar: Phaser.GameObjects.Rectangle
  statsButton: StatsButton
  constructor() {
    super('Hud')
  }

  create() {
    const { width: w, height: h } = this.cameras.main
    const c = 0x000000

    this.topBar = this.add.rectangle(0, 0, w, 12, c).setOrigin(0, 0)
    this.bottomBar = this.add
      .rectangle(0, h - 12, w, 12, c)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', () => this.scene.launch('Stats'))

    this.topText = this.add
      .bitmapText(w / 2, 0, 'clarity', '', 8, 0.5)
      .setOrigin(0.5, 0)
      .setCenterAlign()
    this.bottomText = this.add.bitmapText(0, h - 12, 'clarity', '', 8)
    this.statsButton = new StatsButton(this, w, w)

    this.updateText()
    this.registry.events.on('changedata', this.updateText)
  }

  updateText = () => {
    const gold = Math.floor(registry.values.gold)
    const health = registry.values.health
    const enemyHealth = registry.values.enemyHealth
    const enemyText = enemyHealth === -1 ? '' : `Enemy: ${enemyHealth ?? 0}`
    const bottomText = `Gold: ${gold ?? 0} Health: ${health ?? 0} ${enemyText}`

    if (registry.values.activeNode || registry.values.activeZoom === -1) {
      this.statsButton.hide()
    } else {
      this.statsButton.show()
    }
    this.topText.setText(registry.values.hudText)

    this.topBar.setDisplaySize(
      this.cameras.main.width,
      Math.max(12, this.topText.height),
    )
    this.bottomText.setText(bottomText)

    this.bottomText.setVisible(registry.values.activeZoom !== -1)
    this.bottomBar.setVisible(registry.values.activeZoom !== -1)

    this.topText.setVisible(registry.values.activeZoom !== -1)
    this.topBar.setVisible(registry.values.activeZoom !== -1)
  }
}
