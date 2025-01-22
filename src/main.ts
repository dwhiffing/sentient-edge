import { Boot } from './scenes/Boot'
import { Fight } from './scenes/Fight'
import { Shop } from './scenes/Shop'
import { WorldMap } from './scenes/WorldMap'
import { Menu } from './scenes/Menu'
import { Hud } from './scenes/Hud'

import { Game, Types } from 'phaser'

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 256,
  height: 256,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  pixelArt: true,
  scene: [Boot, Menu, Fight, Shop, WorldMap, Hud],
}

const game = new Game(config)

try {
  game.registry.events.on('changedata', () => {
    localStorage.setItem(
      '--sentient-edge-save-data',
      JSON.stringify(game.registry.values),
    )
  })

  const saveDataString = localStorage.getItem('--sentient-edge-save-data')
  if (saveDataString) {
    const saveData = JSON.parse(saveDataString)
    Object.entries(saveData).forEach(([k, v]) => game.registry.set(k, v))
  } else {
    game.registry.set('unlocked-nodes', ['desert-5'])
    game.registry.set('active-zoom', 6)
    game.registry.set('gold', 0)
    game.registry.set('health', 10)
  }
  game.registry.set('enemy-health', -1)
} catch (e) {}

export default game
