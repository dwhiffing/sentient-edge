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

const movementStop = {
  speed: 0,
  moveTarget: 'random',
  moveEventDelay: 125,
  moveSpreadBias: 0,
  moveMaxDistance: 0,
} as IMoveConfig

export const moveConfigWasp = [
  {
    speed: 15,
    moveTarget: 'spawn',
    moveEventDelay: 500,
    moveSpreadBias: 0.5,
    moveMaxDistance: 30,
  } as IMoveConfig,
]

export const moveConfigSnake = [
  {
    speed: 40,
    moveTarget: 'center',
    moveEventDelay: 750,
    moveSpreadBias: 0.5,
    moveMaxDistance: 200,
  } as IMoveConfig,
  { ...movementStop, moveEventDelay: 1500 },
]

export const moveConfigAnubis = [
  {
    speed: 60,
    moveTarget: 'player',
    moveEventDelay: 1200,
    moveSpreadBias: 1,
    moveMaxDistance: 0,
  } as IMoveConfig,
  { ...movementStop, moveEventDelay: 2000 },
]

export const moveConfigKnight = [
  {
    speed: 40,
    moveTarget: 'player',
    moveEventDelay: 1000,
    moveSpreadBias: 0.4,
    moveMaxDistance: 0,
  } as IMoveConfig,
  { ...movementStop, moveEventDelay: 1500 },
]

export const moveConfigSnail = [
  {
    speed: 30,
    moveTarget: 'player',
    moveEventDelay: 500,
    moveSpreadBias: 1,
    moveMaxDistance: 0,
  } as IMoveConfig,
  { ...movementStop, moveEventDelay: 500 },
]

export const moveConfigRoller = [
  { ...movementStop, flashDuration: 750, moveEventDelay: 750 },
  {
    speed: 80,
    moveTarget: 'player',
    moveEventDelay: 800,
    moveSpreadBias: 1,
    moveMaxDistance: 0,
  } as IMoveConfig,
  { ...movementStop, moveEventDelay: 3000 },
]

// move around slowly, tanky, stops for a second, then flashes and shoots big, fast, bullet (slow snake, but with stopping to shoot)
export const moveConfigOgre = [
  {
    speed: 40,
    moveTarget: 'center',
    moveEventDelay: 750,
    moveSpreadBias: 0.5,
    moveMaxDistance: 200,
  } as IMoveConfig,
  { ...movementStop, moveEventDelay: 1500 },
]

// shamble constantly toward player, like snail but stronger and faster, explodes on death
export const moveConfigZombie = [
  {
    speed: 30,
    moveTarget: 'player',
    moveEventDelay: 500,
    moveSpreadBias: 1,
    moveMaxDistance: 0,
  } as IMoveConfig,
  { ...movementStop, moveEventDelay: 250 },
]

// dash around randomly and shoot bullets (like snake but with many bullets)
export const moveConfigSkeleton = [
  {
    speed: 15,
    moveTarget: 'spawn',
    moveEventDelay: 500,
    moveSpreadBias: 0.5,
    moveMaxDistance: 30,
  } as IMoveConfig,
]

// dashes toward player 5 times, then waits and shoots circular burst around self
export const moveConfigGolem = [
  {
    speed: 30,
    moveTarget: 'player',
    moveEventDelay: 500,
    moveSpreadBias: 1,
    moveMaxDistance: 0,
  } as IMoveConfig,
  { ...movementStop, moveEventDelay: 1000 },
]

// circle + sin wave + bullet hell
export const moveConfigDeath = [
  {
    speed: 40,
    moveTarget: 'player',
    moveEventDelay: 1000,
    moveSpreadBias: 0.4,
    moveMaxDistance: 0,
  } as IMoveConfig,
  { ...movementStop, moveEventDelay: 1500 },
]

// figure out what to use this for, maybe knight?
// export const moveConfigHornet = [
//   movementErratic,
//   movementErratic,
//   movementErratic,
//   movementErratic,
//   movementErratic,
//   movementErratic,
//   movementErratic,
//   movementStop,
//   { ...movementStop, flashDuration: 500, moveEventDelay: 500 },
//   movementCharge,
// ]

// const movementCharge: IMoveConfig = {
//   moveTarget: 'player',
//   moveEventDelay: 1000,
//   moveSpreadBias: 1,
//   moveMaxDistance: 0,
//   speed: 80,
// }

// const movementErratic: IMoveConfig = {
//   speed: 50,
//   moveTarget: 'spawn',
//   moveEventDelay: 500,
//   moveSpreadBias: 0.1,
//   moveMaxDistance: 50,
// }
