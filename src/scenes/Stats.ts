import { Scene } from 'phaser'
import { CellMap } from './CellMap'
import { WorldMap } from './WorldMap'
import { IUpgradeKeys } from '../utils/registry'
import { baseStats } from '../entities/Player'
import { ITEMS } from '../utils/constants'

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

    stats
      .map(({ key, label }) => ({
        key,
        label,
        value: scene.player.stats[key as IUpgradeKeys],
      }))
      .filter((s) => s.value !== baseStats[s.key as keyof typeof baseStats])
      .forEach(({ label, value, key }) => {
        const item = ITEMS.find((i) => i.key === key)
        text += label
        text += ' - '
        text += item?.percent ? `${Math.round(value * 100)}%` : value
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

const stats = [
  { key: 'damageMulti', label: 'hero damage multiplier' },
  { key: 'speedMeleeMulti', label: 'hero attack speed' },
  { key: 'healthMax', label: 'hero max health' },
  { key: 'defenseMelee', label: 'hero melee defense' },
  { key: 'defenseRanged', label: 'hero ranged defense' },
  { key: 'speedMoveMulti', label: 'hero move speed' },
  { key: 'earnRateMulti', label: 'sword gold multiplier' },
  { key: 'rangeCount', label: 'sword ranged bullet count' },
  { key: 'damageMeleeBase', label: 'sword base damage' },
  { key: 'damageMeleeFreq', label: 'sword hits per attack' },
  { key: 'damageRangeBase', label: 'sword ranged base damage' },
  { key: 'sizeBase', label: 'sword size' },
]
