# tasks

document that you take half damage if you are ready to attack
ensure you cant bring up stats in fight scene
take more damage if your attack isn't ready
explode some colored particles on enemy death
some enemies should explode on death

# enemy movement

variants should have same movement, just higher stats and alt color/name

bee: fly around randomly near spawn point
snake: move randomly in longer bursts, with short wait between
anubis: dash toward player, then wait in place for awhile and shoot at player (like roller but with ranged attack)

spider: dash around randomly (like bee, but shoots bullets)
snail: move around slowly but very tanky (like slow snake)
knight: dashes toward player, then shoots a 3 spread, repeat 3 times, then do sin wave

roller: dash toward player very quickly, wait in place for awhile (like anubis but without ranged attack)
ogre: move around slowly, tanky, stops for a second, then flashes and shoots big, fast, bullet (slow snake, but with stopping to shoot)
golem: dashes toward player 5 times, then waits and shoots circular burst around self

zombie: constantly moves toward player
skeleton: dash around randomly and shoot bullets (like snake but with many bullets)
death: circle + sin wave + bullet hell

# work on progression

- each biome should have a different tier of enemy damage/health
- bee: 3 health
- snake: 10 health
- anubis: 100 health
- spider: 20 health
- snail: 50 health
- knight: 500 health
- roller: 80 health
- ogre: 120 health
- golem: 1000 health
- zombie: 250 health
- skeleton: 200 health
- death: 5000 health

- sword base damage should be 10, and go up by 10 each upgrade

playtest and tweak:

- enemy behaviour (ensure all behaviours are implemented and working)
- enemy stats (enemies stats should go up in tiers based on biome)
- node enemy spawns (should have fewer enemies in early areas, and increase as you get further)
- upgrade stats (ensure that area enemies are beatable with upgrades available)
- upgrade costs/ gold drop rates last

cellmap: position nodes closer to path
finalize map
add sounds
improve stats scene
nicer menu/win screen
main menu title art
add reset save option to menu

add music
add credits/help scene
add game over scene (show player is dead, and new player picking you up)
make a bg for each biome node (desert, forest, mountain, castle, shop)

mobile controls
fight: add homing bullets, dies after homing for long enough
cellmap: when node is first hovered, should be discovered?

# add sounds

player swing
player shoot
player hit
player pickup gold
player enter node/cell
player exit node/cell
player buy upgrade
player cant afford upgrade
player die
sword die
ui click
enemy hit
enemy swing
enemy shoot
enemy die
boss hit
boss swing
boss shoot
boss die

# add music

menu/game
win
gameover

credits: https://piiixl.itch.io/1-bit-16px-icons-part-1
