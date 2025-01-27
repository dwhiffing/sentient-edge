import { Scene } from 'phaser'
import { CellMap } from './CellMap'
import { WorldMap } from './WorldMap'

export class Stats extends Scene {
  topBar: Phaser.GameObjects.Rectangle

  constructor() {
    super('Stats')
  }

  create() {
    const { width: w } = this.cameras.main

    this.topBar = this.add
      .rectangle(0, 0, w, w, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(0.9)

    let text = ''

    let cellScene = this.game.scene.getScene('CellMap') as CellMap
    let worldScene = this.game.scene.getScene('WorldMap') as WorldMap
    let scene = this.scene.isActive('CellScene') ? cellScene : worldScene

    Object.entries(scene.player.stats).forEach(([key, value]) => {
      text += statLabels[key as keyof typeof statLabels]
      text += ' - '
      text += value
      text += '\n'
    })

    this.add.bitmapText(0, 0, 'clarity', text, 8)
    this.updateText()

    this.input.on('pointerdown', () => {
      this.scene.stop('Stats')
    })
  }

  updateText = () => {}
}

const statLabels = {
  healthMax: 'health max',
  defenseMelee: 'defense melee',
  defenseRanged: 'defense ranged',
  damageMeleeMulti: 'damage melee multi',
  damageRangeMulti: 'damage range multi',
  rangeCount: 'range count',
  speedMoveMulti: 'speed move multi',
  earnRateMulti: 'earn rate multi',
  speedMeleeMulti: 'speed melee multi',
  damageMeleeBase: 'damage melee base',
  damageMeleeFreq: 'damage melee freq',
  durationMeleeBase: 'duration melee base',
  damageRangeBase: 'damage range base',
  earnRateBase: 'earn rate base',
  speedMeleeBase: 'speed melee base',
  sizeBase: 'sword size',
}
