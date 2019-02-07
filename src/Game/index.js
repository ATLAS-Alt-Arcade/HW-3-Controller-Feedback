// Import outside libraries
const xs = require('xstream').default;
const Phaser = require('phaser');

const SerialProducer = require('./SerialProducer.js');

// create serial port and open connection
const serial = new SerialProducer();
const input$ = xs.create(serial).map(d => d.toString());

// GLOBAL GAME VARS
let graphics;
const bullets = [];
let fireTimer = 0;
const FIRE_TIME_MAX = 200;

const collisionZones = [
  { x: 50, y: 50, r: 30 },
  { x: 400, y: 500, r: 40 },
  { x: 650, y: 230, r: 40 },
  { x: 270, y: 420, r: 40 }
]

// Simple bullet class for demo
class Bullet {
  constructor(x, y, forwardX, forwardY) {
    this.x = x;
    this.y = y;
    this.forwardX = forwardX;
    this.forwardY = forwardY;
    this.speed = 0.5;
    this.liveTime = 1000;
    this.isDead = false;
  }

  update(dt) {
    if (!this.isDead) {
      this.x += this.forwardX * dt * this.speed;
      this.y += this.forwardY * dt * this.speed;

      // When it's out of live time mark it as dead for deletion
      this.liveTime -= dt;
      this.isDead = this.liveTime < 0;

      this.draw();
    }
  }

  draw() {
    graphics.save();
    graphics.translate(this.x, this.y);
    graphics.fillCircle(0, 0, 5);
    graphics.restore();
  }
}

const player = {
  x: 100,
  y: 50,
  baseRot: 0,
  cannonRot: 0,
  gasLevel: 0,
  isFiring: false,
  cannon: new Phaser.Geom.Rectangle(-5, 0, 10, 25),
  base: [
    new Phaser.Geom.Point(-17, 10),
    new Phaser.Geom.Point(-8, 20),
    new Phaser.Geom.Point(8, 20),
    new Phaser.Geom.Point(17, 10),
    new Phaser.Geom.Point(17, -20),
    new Phaser.Geom.Point(-17, -20),
    new Phaser.Geom.Point(-17, 10),
  ],
};

// Phaser setup
function create () {
  cursors = this.input.keyboard.createCursorKeys();
  graphics = this.add.graphics({
    fillStyle: { color: 0xeeeeee},
    lineStyle: { width: 3, color: 0xeeeeee},
  });
}

function renderCollisionZone(x, y, r) {
  graphics.save();
  graphics.translate(x, y);
  graphics.strokeCircle(0, 0, r);
  graphics.restore();
}

function update(totalTime, deltaTime) {
  // Always clear at the top of update
  graphics.clear();

  // Player draw and update
  const playerForwardX = -Math.sin(player.baseRot);
  const playerForwardY = Math.cos(player.baseRot);

  if (player.gasLevel > 0) {
    // this calculates player forward direction and adds it to position
    player.x += playerForwardX * player.gasLevel;
    player.y += playerForwardY * player.gasLevel;
  }

  graphics.save();
  // render player base
  graphics.translate(player.x, player.y);
  graphics.rotate(player.baseRot);
  graphics.strokePoints(player.base);
  graphics.restore();

  // Draw player cannon
  graphics.save();
  graphics.translate(player.x, player.y);
  graphics.rotate(player.cannonRot);
  graphics.fillCircle(0, 0, 12);
  graphics.fillRectShape(player.cannon);
  graphics.restore();

  let collideVal = 0;
  // Do collision zone stuff
  collisionZones.forEach(cz => {
    renderCollisionZone(cz.x, cz.y, cz.r);

    const distSq = (player.x - cz.x) * (player.x - cz.x) + (player.y - cz.y) * (player.y - cz.y)
    if (distSq < (cz.r * cz.r) + 400) collideVal = 1;
  });

  // Bullet Draw and Update
  // Spawn bullets
  let fireVal = 0;
  if (player.isFiring) {
    fireTimer += deltaTime;
    if (fireTimer >= FIRE_TIME_MAX) {
      fireTimer = 0;
      fireVal = 1; // used for feedback
      const cannonForwardX = -Math.sin(player.cannonRot);
      const cannonForwardY = Math.cos(player.cannonRot);
      bullets.push(new Bullet(player.x, player.y, cannonForwardX, cannonForwardY))
    }
  }
  // Update bullets
  bullets.forEach(b => b.update(deltaTime));
  // Remove one dead bullet per frame
  const removeBullet = bullets.find(b => b.isDead);
  if (removeBullet) bullets.splice(removeBullet, 1);
  
  if (serial.port) serial.port.write(`${fireVal}:${Math.round(player.gasLevel/3)}:${collideVal}-`);
  // console.log(`${fireVal}:${Math.round(player.gasLevel/100)}:${collideVal}-`);
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      create: create,
      update: update
  }
};

const game = new Phaser.Game(config);
  
// Exported Module so game can be initialized elseware
const gameManager = {
  init: () => {
    input$.subscribe({
      next: (command) => {
        // Parse Arduino commands
        // baserot:cannonrot:gaslevel:firestate
        const vals = command.split(':');
        player.baseRot = vals[0] / 360 * Math.PI * 2;
        player.cannonRot = vals[1] / 360 * Math.PI * 2;
        player.gasLevel = vals[2] / 100 * 3;
        player.isFiring = (vals[3] == 1);
      },
      error: console.log,
      complete: console.log,
    });


  },
};

module.exports = gameManager;
