import { Boot } from './scenes/Boot'
import { Fight } from './scenes/Fight'
import { Shop } from './scenes/Shop'
import { WorldMap } from './scenes/WorldMap'
import { CellMap } from './scenes/CellMap'
import { Menu } from './scenes/Menu'
import { Hud } from './scenes/Hud'
import { Stats } from './scenes/Stats'

import { Game, Types } from 'phaser'

const getZoom = (baseWidth: number) => {
  const dpr = window.devicePixelRatio
  const zoom2 = Math.round(2 * dpr) / dpr
  const zoom3 = Math.round(3 * dpr) / dpr
  const zoom4 = Math.round(4 * dpr) / dpr

  let zoom = Math.round(dpr) / dpr
  const dim = Math.min(window.innerWidth, window.innerHeight)

  if (dim > baseWidth * zoom4) {
    zoom = zoom4
  } else if (dim > baseWidth * zoom3) {
    zoom = zoom3
  } else if (dim > baseWidth * zoom2) {
    zoom = zoom2
  }

  return zoom
}

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 200,
  height: 200,
  scale: { zoom: getZoom(200) },
  parent: 'game-container',
  backgroundColor: '#000000',
  physics: { default: 'arcade' },
  pixelArt: true,
  scene: [Boot, Menu, Fight, Shop, WorldMap, CellMap, Hud, Stats],
}

const game = new Game(config)

export default game
