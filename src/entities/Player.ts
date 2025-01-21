export class Player {
  scene: Phaser.Scene
  sprite: Phaser.Physics.Arcade.Sprite

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.sprite = this.scene.physics.add.sprite(
      32,
      this.scene.cameras.main.height - 32,
      'spritesheet',
      3,
    )
    this.sprite.setCollideWorldBounds(true)
  }

  update() {
    const magnitude = 20
    let { x, y } = this.scene.input.activePointer
    // if zoomed in, should find decimal percentage, then multiply by active square
    const dx = x - this.sprite.x
    const dy = y - this.sprite.y
    const angle = Math.atan2(dy, dx)
    const dist = Phaser.Math.Distance.Between(
      x,
      y,
      this.sprite.x,
      this.sprite.y,
    )
    const body = this.sprite.body as Phaser.Physics.Arcade.Body
    if (dist > 1) {
      body.velocity.x = Math.cos(angle) * magnitude
      body.velocity.y = Math.sin(angle) * magnitude
      this.sprite.anims.play('player-walk', true)
    } else {
      body.setVelocity(0)
      this.sprite.anims.stop()
    }
  }
}
