import { Boot } from './scenes/Boot'
import { Fight } from './scenes/Fight'
import { Shop } from './scenes/Shop'
import { WorldMap } from './scenes/WorldMap'
import { CellMap } from './scenes/CellMap'
import { Menu } from './scenes/Menu'
import { Hud } from './scenes/Hud'
import { Stats } from './scenes/Stats'

import { Game, Types } from 'phaser'

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 200,
  height: 200,
  parent: 'game-container',
  backgroundColor: '#000000',
  scale: {
    zoom: Phaser.Scale.MAX_ZOOM,
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  pixelArt: true,
  scene: [Boot, Menu, Fight, Shop, WorldMap, CellMap, Hud, Stats],
}

const game = new Game(config)

export default game
