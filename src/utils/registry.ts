import { MAP_DATA } from './constants'

export const saveKey = '--sentient-edge-save-data'

export class Registry {
  game: Phaser.Game

  init = (game: Phaser.Game) => {
    this.game = game
    this.loadSave()
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
    localStorage.setItem(saveKey, JSON.stringify(this.game.registry.values))
  }

  get values() {
    return this.game.registry.values as IState
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
  activeNode: string
  enemyHealth: number
  lastGold: number
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
  enemyHealth: -1,
  pauseMusic: false,
  enemyName: '',
  enemyMaxHealth: -1,
  health: 10,
  gold: 0,
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
