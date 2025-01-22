import { Scene } from 'phaser'

export class Hud extends Scene {
  text: Phaser.GameObjects.BitmapText
  bottomText: Phaser.GameObjects.BitmapText
  textBackground: Phaser.GameObjects.Rectangle
  textBackground2: Phaser.GameObjects.Rectangle
  constructor() {
    super('Hud')
  }

  create() {
    const { width, height } = this.cameras.main

    this.textBackground = this.add
      .rectangle(0, height - 12, width, 12, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(1)

    this.textBackground2 = this.add
      .rectangle(0, 0, width, 12, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(1)

    this.bottomText = this.add.bitmapText(0, height - 12, 'clarity', '', 8)
    this.text = this.add.bitmapText(0, 0, 'clarity', '', 8)

    this.updateText()

    this.registry.events.on('changedata', () => {
      this.updateText()
    })
  }

  updateText() {
    const gold = this.registry.get('gold')
    const enemyHealth = this.registry.get('enemy-health')
    const health = this.registry.get('health')
    this.bottomText.setText(this.registry.get('hud-text'))
    this.text.setText(
      `Gold: ${gold ?? 0} Health: ${health ?? 0} ${
        enemyHealth === -1 ? '' : `Enemy: ${enemyHealth ?? 0}`
      }`,
    )
  }
}
