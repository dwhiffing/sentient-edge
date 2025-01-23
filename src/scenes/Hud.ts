import { Scene } from 'phaser'

export class Hud extends Scene {
  topText: Phaser.GameObjects.BitmapText
  bottomText: Phaser.GameObjects.BitmapText
  bottomBar: Phaser.GameObjects.Rectangle
  topBar: Phaser.GameObjects.Rectangle
  constructor() {
    super('Hud')
  }

  create() {
    const { width: w, height: h } = this.cameras.main
    const c = 0x000000

    this.topBar = this.add.rectangle(0, 0, w, 12, c).setOrigin(0, 0)
    this.bottomBar = this.add.rectangle(0, h - 12, w, 12, c).setOrigin(0, 0)

    this.topText = this.add.bitmapText(0, 0, 'clarity', '', 8)
    this.bottomText = this.add.bitmapText(0, h - 12, 'clarity', '', 8)

    this.updateText()
    this.registry.events.on('changedata', this.updateText)
  }

  updateText = () => {
    const gold = this.registry.get('gold')
    const health = this.registry.get('health')
    const enemyHealth = this.registry.get('enemy-health')
    const enemyText = enemyHealth === -1 ? '' : `Enemy: ${enemyHealth ?? 0}`

    const topText = `Gold: ${gold ?? 0} Health: ${health ?? 0} ${enemyText}`
    this.topText.setText(topText)

    const bottomText = this.registry.get('hud-text')
    this.bottomText.setText(bottomText)
  }
}
