import { CELL_ORDER, MAP_DATA } from './constants'

export const saveKey = '--sentient-edge-save-data'

export class Registry {
  game: Phaser.Game

  init = (game: Phaser.Game) => {
    this.game = game
    this.loadSave()

    const muteButton = document.getElementById('mute-toggle')
    if (muteButton) {
      const val = this.values.muted
      game.sound.setMute(val === 2)
      muteButton.innerText =
        val === 2 ? 'unmute' : val === 1 ? 'mute all' : 'mute music'

      muteButton.addEventListener('click', () => {
        const val = (registry.values.muted + 1) % 3
        this.set('muted', val)
        muteButton.innerText =
          val === 2 ? 'unmute' : val === 1 ? 'mute all' : 'mute music'
        game.sound.setMute(val === 2)
        game.sound.getAllPlaying().forEach((m) => {
          if (m.key.includes('music')) m.pause()
        })
      })
    }

    const resetButton = document.getElementById('reset-save')
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        const confirmed = window.confirm('Are you sure?')
        if (confirmed) {
          this.set('hasReset', true)
          localStorage.removeItem(saveKey)
          window.location.reload()
        }
      })
    }
  }

  loadSave = () => {
    const saveDataString = localStorage.getItem(saveKey)
    if (saveDataString) {
      this.setRegistryObject(JSON.parse(saveDataString))
    } else {
      this.initSave()
    }
  }

  initSave = () => {
    this.setRegistryObject(initialSave)
  }

  initSaveFinished = () => {
    this.setRegistryObject(finishedSave)
  }

  saveGame = () => {
    if (this.values.hasReset) return
    localStorage.setItem(saveKey, JSON.stringify(this.game.registry.values))
  }

  get values() {
    return this.game.registry.values as IState
  }

  get unlockedCellIndexes() {
    return CELL_ORDER.filter((cellIndex, index) => {
      if (cellIndex === 6) return true

      const prevCellNodes = MAP_DATA.filter(
        (d) =>
          d.cellIndex === CELL_ORDER[index - 1] && d.type.includes('fight'),
      )
      return prevCellNodes.every((node) =>
        registry.values.clearedNodes?.includes(node.id),
      )
    })
  }

  set = (
    key: keyof IState,
    value:
      | string
      | number
      | string[]
      | boolean
      | Record<IUpgradeKeys, number>
      | { x: number; y: number },
  ) => {
    if (Array.isArray(value)) value = Array.from(new Set(value))
    this.game.registry.set(key, value)
  }

  setRegistryObject = (object: Partial<IState>) => {
    Object.entries(object).forEach(([k, v]) => this.game.registry.set(k, v))
  }
}

export type IPlayerStats = {
  healthMax: number
  defenseMelee: number
  defenseRanged: number
  damageMulti: number
  rangeCount: number
  speedMoveMulti: number
  earnRateMulti: number
  speedMeleeMulti: number
}

export type ISwordStats = {
  damageMeleeBase: number
  damageMeleeFreq: number
  damageRangeBase: number
  sizeBase: number
}

export type IUpgradeKeys = keyof ISwordStats | keyof IPlayerStats

type IState = {
  lastZoom: number
  activeZoom: number
  deathCount: number
  pauseMusic: boolean
  timePlayed: number
  hasWon: boolean
  hasReset: boolean
  activeNode: string
  lastNode: string
  enemyHealth: number
  lastGold: number
  muted: number
  showClearedArrow: boolean
  enemyName: string
  enemyMaxHealth: number
  faceIndex: number
  health: number
  gold: number
  hudText: string
  lastPlayerPosition: { x: number; y: number }
  unlockedNodes: string[]
  clearedNodes: string[]
  upgrades: Record<IUpgradeKeys, number>
}

export const registry = new Registry()

const initialSave: IState = {
  lastZoom: 6,
  activeZoom: 6,
  activeNode: '',
  lastNode: '',
  enemyHealth: -1,
  pauseMusic: false,
  hasReset: false,
  enemyName: '',
  enemyMaxHealth: -1,
  health: 10,
  gold: 0,
  muted: 0,
  faceIndex: 0,
  lastGold: 0,
  deathCount: 0,
  timePlayed: 0,
  lastPlayerPosition: { x: 0, y: 0 },
  hasWon: false,
  hudText: '',
  showClearedArrow: false,
  unlockedNodes: [],
  clearedNodes: [],
  upgrades: {
    healthMax: 0,
    defenseMelee: 0,
    defenseRanged: 0,
    damageMulti: 0,
    rangeCount: 0,
    speedMoveMulti: 0,
    earnRateMulti: 0,
    speedMeleeMulti: 0,
    damageMeleeBase: 0,
    damageRangeBase: 0,
    damageMeleeFreq: 0,
    sizeBase: 0,
    // rangeSpeed:0,
    // rangeHoming:0,
  },
}

const finishedSave: IState = {
  ...initialSave,
  gold: 999,
  unlockedNodes: MAP_DATA.map((d) => d.id).slice(0, -2),
  clearedNodes: MAP_DATA.map((d) => d.id).slice(0, -2),
  upgrades: {
    healthMax: 9,
    defenseMelee: 9,
    defenseRanged: 9,
    damageMulti: 9,
    rangeCount: 9,
    speedMoveMulti: 9,
    earnRateMulti: 9,
    speedMeleeMulti: 9,
    damageMeleeBase: 9,
    damageMeleeFreq: 3,
    damageRangeBase: 9,
    sizeBase: 9,
  },
}
