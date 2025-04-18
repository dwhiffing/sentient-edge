import { Scene } from 'phaser'
import { registry } from '../utils/registry'
import { StatsButton } from '../entities/StatsButton'
import { HealthBar } from '../entities/HealthBar'
import { CellMap } from './CellMap'
import { Fight } from './Fight'
import { MAP_DATA } from '../utils/constants'

export class Hud extends Scene {
  topText: Phaser.GameObjects.BitmapText
  bottomText: Phaser.GameObjects.BitmapText
  bottomBar: Phaser.GameObjects.Rectangle
  topBar: Phaser.GameObjects.Rectangle
  statsButton: StatsButton
  playerHealthBar: HealthBar
  enemyNameText: Phaser.GameObjects.BitmapText
  enemyHealthBar: HealthBar
  music: Phaser.Sound.BaseSound
  constructor() {
    super('Hud')
  }

  create() {
    const { width: w, height: h } = this.cameras.main
    const c = 0x000000

    registry.set('pauseMusic', false)

    this.music = this.sound.add('music-game', {
      loop: true,
      volume: registry.values.muted === 1 ? 0 : 0.5,
    })
    this.music.play()

    this.topBar = this.add.rectangle(0, 0, w, 12, c).setOrigin(0, 0)
    this.bottomBar = this.add
      .rectangle(0, h - 12, w, 12, c)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', () => {
        const node = MAP_DATA.find((d) => d.id === registry.values.activeNode)

        if (!node?.type.includes('fight')) this.scene.launch('Stats')
      })

    this.topText = this.add
      .bitmapText(w / 2, 0, 'clarity', '', 8, 0.5)
      .setOrigin(0.5, 0)
      .setCenterAlign()

    this.bottomText = this.add.bitmapText(85, h - 12, 'clarity', '', 8)
    this.statsButton = new StatsButton(this, w, w)

    this.enemyNameText = this.add.bitmapText(85, 0, 'clarity', ' - Snake', 8)
    this.playerHealthBar = new HealthBar(this, 1, w - 10, 75, 8, 0xec273f)
    this.enemyHealthBar = new HealthBar(this, 1, 2, 75, 8, 0x5ab552)

    this.updateText()
    this.registry.events.on('changedata', this.updateText)

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        registry.set('timePlayed', registry.values.timePlayed + 1)
      },
      repeat: -1,
    })
  }

  shutdown() {
    this.tweens.add({
      targets: this.music,
      volume: 0,
      duration: 500,
      onComplete: () => this.music.pause(),
    })
    this.registry.events.off('changedata', this.updateText)
  }

  updateText = () => {
    const gold = Math.floor(registry.values.gold)
    const bottomText = `Gold: ${gold ?? 0}${
      registry.values.lastGold ? ` +${registry.values.lastGold}` : ''
    }`

    if (registry.values.pauseMusic && !this.music.isPaused) {
      this.tweens.add({
        targets: this.music,
        volume: 0,
        duration: 500,
        onComplete: () => this.music.pause(),
      })
    }

    if (!registry.values.pauseMusic && this.music.isPaused) {
      this.music.play({ volume: registry.values.muted === 1 ? 0 : 0.5 })
    }

    let cellScene = this.game.scene.getScene('CellMap') as CellMap
    let fightScene = this.game.scene.getScene('Fight') as Fight
    let scene = this.scene.isActive('CellScene') ? cellScene : fightScene

    if (scene.player) {
      this.playerHealthBar.setScale(
        registry.values.health / scene.player?.stats.healthMax,
      )
    }

    if (registry.values.enemyName) {
      this.enemyNameText.setText(`- ${registry.values.enemyName}`)
      this.enemyHealthBar.show()
      this.enemyHealthBar.setScale(
        registry.values.enemyHealth / registry.values.enemyMaxHealth,
      )
    } else {
      this.enemyNameText.setText('')
      this.enemyHealthBar.hide()
    }

    const node = MAP_DATA.find((d) => d.id === registry.values.activeNode)
    if (node?.type.includes('fight') || registry.values.activeZoom === -1) {
      this.statsButton.hide()
    } else {
      this.statsButton.show()
    }

    if (registry.values.activeZoom === -1) {
      this.playerHealthBar.hide()
    } else {
      this.playerHealthBar.show()
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
