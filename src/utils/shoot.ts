import { Bullet } from '../entities/Bullet'

export const shoot = (
  bulletGroup: Phaser.GameObjects.Group,
  source: { x: number; y: number },
  target: { x: number; y: number },
  count = 1,
  spread = 0,
) => {
  const dx = target.x - source.x
  const dy = target.y - source.y
  const baseAngle = Math.atan2(dy, dx)
  const spreadAngle = (spread * Math.PI) / 180

  for (let i = 0; i < count; i++) {
    const bullet = bulletGroup.get() as Bullet
    const angleOffset = (i - (count - 1) / 2) * spreadAngle
    bullet.spawn(source, baseAngle + angleOffset, 120)
  }
}
