import { MAP_DATA } from './constants'

const saveKey = '--sentient-edge-save-data'

export class Registry {
  game: Phaser.Game

  init = (game: Phaser.Game) => {
    this.game = game
    this.loadSave()
    this.set('activeNode', '')
  }

  loadSave = () => {
    const saveDataString = localStorage.getItem(saveKey)
    if (saveDataString) {
      this.setRegistryObject(JSON.parse(saveDataString))
    } else {
      this.initSaveFinished()
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
    value: string | number | string[] | Record<IUpgradeKeys, number>,
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
  damageMeleeMulti: number
  damageRangeMulti: number
  rangeCount: number
  // yerRangeSpeed
  // yerRangeHoming
  speedMoveMulti: number
  earnRateMulti: number
  speedMeleeMulti: number
}

export type ISwordStats = {
  damageMeleeBase: number
  damageMeleeFreq: number
  durationMeleeBase: number
  damageRangeBase: number
  earnRateBase: number
  speedMeleeBase: number
  sizeBase: number
}

export type IUpgradeKeys = keyof ISwordStats | keyof IPlayerStats

type IState = {
  lastZoom: number
  activeZoom: number
  activeNode: string
  enemyHealth: number
  health: number
  gold: number
  hudText: string
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
  health: 10,
  gold: 0,
  hudText: '',
  unlockedNodes: ['desert-5'],
  clearedNodes: [],
  upgrades: {
    healthMax: 0,
    defenseMelee: 0,
    defenseRanged: 0,
    damageMeleeMulti: 0,
    damageRangeMulti: 0,
    rangeCount: 0,
    speedMoveMulti: 0,
    earnRateMulti: 0,
    speedMeleeMulti: 0,
    damageMeleeBase: 0,
    damageRangeBase: 0,
    damageMeleeFreq: 0,
    durationMeleeBase: 0,
    earnRateBase: 0,
    speedMeleeBase: 0,
    sizeBase: 0,
    // rangeSpeed:0,
    // rangeHoming:0,
  },
}

const finishedSave: IState = {
  ...initialSave,
  gold: 999,
  unlockedNodes: MAP_DATA.map((d) => d.id),
  clearedNodes: MAP_DATA.map((d) => d.id),
  upgrades: {
    healthMax: 9,
    defenseMelee: 9,
    defenseRanged: 9,
    damageMeleeMulti: 9,
    damageRangeMulti: 9,
    rangeCount: 9,
    speedMoveMulti: 9,
    earnRateMulti: 9,
    speedMeleeMulti: 9,
    damageMeleeBase: 9,
    damageMeleeFreq: 3,
    durationMeleeBase: 3,
    damageRangeBase: 9,
    earnRateBase: 9,
    speedMeleeBase: 9,
    sizeBase: 9,
    // rangeSpeed:0,
    // rangeHoming:0,
  },
}
