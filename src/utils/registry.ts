const saveKey = '--sentient-edge-save-data'

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
    this.setRegistryObject({
      lastZoom: 6,
      activeZoom: 6,
      activeNode: '',
      enemyHealth: -1,
      health: 10,
      gold: 0,
      hudText: '',
      unlockedNodes: ['desert-5'],
      clearedNodes: [],
    })
  }

  saveGame = () => {
    localStorage.setItem(saveKey, JSON.stringify(this.game.registry.values))
  }

  get values() {
    return this.game.registry.values as IState
  }

  set = (key: keyof IState, value: string | number | string[]) => {
    if (Array.isArray(value)) value = Array.from(new Set(value))
    this.game.registry.set(key, value)
  }

  setRegistryObject = (object: Partial<IState>) => {
    Object.entries(object).forEach(([k, v]) => this.game.registry.set(k, v))
  }
}

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
}

export const registry = new Registry()
