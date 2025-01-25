import game from '../main'

const saveKey = '--sentient-edge-save-data'

export class Registry {
  initSave = () => {
    this.setRegistryObject({
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

  loadSave = () => {
    const saveDataString = localStorage.getItem(saveKey)
    if (saveDataString) {
      this.setRegistryObject(JSON.parse(saveDataString))
    } else {
      this.initSave()
    }
  }

  saveGame = () => {
    localStorage.setItem(saveKey, JSON.stringify(game.registry.values))
  }

  get values() {
    return game.registry.values as IState
  }

  set = (key: keyof IState, value: string | number | string[]) => {
    if (Array.isArray(value)) value = Array.from(new Set(value))
    game.registry.set(key, value)
  }

  setRegistryObject = (object: Partial<IState>) => {
    Object.entries(object).forEach(([k, v]) => game.registry.set(k, v))
  }
}

type IState = {
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
