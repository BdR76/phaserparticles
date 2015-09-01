// based on
// http://examples.phaser.io/_site/view_full.html?d=particles&f=click+burst.js&t=click burst

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render });

var emitter;

function preload() {
	game.load.spritesheet('particles', 'particles.png', 16, 16);
}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.stage.backgroundColor = 0x337799;

	// add emitter
	emitter = game.add.emitter(0, 0, 200); // pool of max. 200

	// set emitter properties
	emitter.makeParticles('particles', [0,1,2,3,4,5], 200, false, false);
	emitter.gravity = 0; // no gravity

	// fixed rotation
    emitter.minRotation = 720; 
    emitter.maxRotation = emitter.minRotation;
	emitter.setScale(1, 0.1, 1, 0.1, 3200, Phaser.Easing.None);

	game.input.onDown.add(particleBurst_circle, this);
}

function render() {
	game.debug.text(emitter.total, 32, 32);
}

function particleBurst(pointer) {

	//  Position the emitter where the mouse/touch event was
	emitter.x = pointer.x;
	emitter.y = pointer.y;

	//  The first parameter sets the effect to "explode" which means all particles are emitted at once
	//  The second gives each particle a 2000ms lifespan
	//  The third is ignored when using burst/explode mode
	//  The final parameter (10) is how many particles will be emitted in this single burst
	emitter.start(true, 2000, null, 200);
}

function particleBurst_circle(pointer) {

	//  Position the emitter where the mouse/touch event was
	emitter.x = pointer.x;
	emitter.y = pointer.y;

	var EXPLODE_DIAMETER = 200.0;

	// emit a circle of particles, 360 / 18 = 20 particles
	for (var i = 0; i < 360; i=i+18) {

		// set fixed x speed
		var xsp = Math.cos(2 * Math.PI * i / 360.0) * EXPLODE_DIAMETER;
		emitter.setXSpeed(xsp, xsp);

		// set fixed y speed
		var ysp = Math.sin(2 * Math.PI * i / 360.0) * EXPLODE_DIAMETER;
		emitter.setYSpeed(ysp, ysp);
		
		// next emits one moving particle, important to also call .update()
		emitter.start(true, 1000, null, 1);
		emitter.update();
	}
}