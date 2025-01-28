import { Bullet } from '../entities/Bullet'

type IShootParams = {
  damage: number
  count: number
  spread: number
  accuracy: number
  delay: number
  speed: number
  size: number
}

const defaultParams: IShootParams = {
  damage: 1,
  count: 1,
  spread: 0,
  accuracy: 0,
  delay: 0,
  speed: 120,
  size: 1,
}

export const shoot = (
  scene: Phaser.Scene,
  bulletGroup: Phaser.GameObjects.Group,
  source: { x: number; y: number },
  target: { x: number; y: number },
  _params?: Partial<IShootParams>,
) => {
  const { spread, count, delay, accuracy, speed, size, damage } = {
    ...defaultParams,
    ...(_params ?? {}),
  }
  const dx = target.x - source.x
  const dy = target.y - source.y
  const baseAngle = Math.atan2(dy, dx)
  const spreadAngle = (spread * Math.PI) / 180

  for (let i = 0; i < count; i++) {
    scene.time.delayedCall(delay * i, () => {
      const bullet = bulletGroup.get() as Bullet
      const angleOffset = (i - (count - 1) / 2) * spreadAngle
      const accuracyAngle = Phaser.Math.RND.between(-accuracy, +accuracy) / 100
      bullet?.spawn(
        source,
        baseAngle + angleOffset + accuracyAngle,
        speed,
        size,
        damage,
      )
    })
  }
}
