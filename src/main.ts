import { Boot } from './scenes/Boot'
import { Fight } from './scenes/Fight'
import { Shop } from './scenes/Shop'
import { WorldMap } from './scenes/WorldMap'
import { Menu } from './scenes/Menu'

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
  scene: [Boot, Menu, Fight, Shop, WorldMap],
}

export default new Game(config)
