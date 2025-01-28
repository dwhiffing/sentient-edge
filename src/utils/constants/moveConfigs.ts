export type IMoveConfig = {
  moveTarget: IMoveTargets
  speed: number
  moveEventDelay: number
  moveSpreadBias: number
  flashDuration?: number
  moveMaxDistance: number
}

export type IMoveTargets = 'player' | 'center' | 'random' | 'spawn'
export type IMoveOrder = 'sequence' | 'random'

export const movementNormal: IMoveConfig = {
  moveTarget: 'center',
  moveEventDelay: 500,
  moveSpreadBias: 0.2,
  moveMaxDistance: 200,
  speed: 20,
}

const movementCharge: IMoveConfig = {
  moveTarget: 'player',
  moveEventDelay: 1000,
  moveSpreadBias: 1,
  moveMaxDistance: 0,
  speed: 80,
}

const movementStop: IMoveConfig = {
  moveTarget: 'center',
  moveEventDelay: 500,
  moveSpreadBias: 0,
  moveMaxDistance: 0,
  speed: 0,
}

const movementErratic: IMoveConfig = {
  speed: 50,
  moveTarget: 'spawn',
  moveEventDelay: 500,
  moveSpreadBias: 0.1,
  moveMaxDistance: 50,
}

export const moveConfigWasp = [
  {
    speed: 30,
    moveTarget: 'spawn',
    moveEventDelay: 250,
    moveSpreadBias: 0.5,
    moveMaxDistance: 20,
  } as IMoveConfig,
]

export const moveConfigHornet = [
  movementErratic,
  movementErratic,
  movementErratic,
  movementErratic,
  movementErratic,
  movementErratic,
  movementErratic,
  movementStop,
  { ...movementStop, flashDuration: 500, moveEventDelay: 500 },
  movementCharge,
]
