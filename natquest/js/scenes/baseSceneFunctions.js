export function createMap(scene, mapKey) { //mapkey argument is where you input which map is loaded based on key in preloader scene
    const map = scene.make.tilemap({ key: mapKey });
    // Load tileset
    const tilesetsData = [
      { name: 'tilesheetTerrain', key: 'tilesheetTerrain' },
      { name: 'tilesheetInterior', key: 'tilesheetInterior' },
      { name: 'tilesheetBuildings', key: 'tilesheetBuildings' },
      { name: 'tilesheetWalls', key: 'tilesheetWalls' },
      { name: 'tilesheetObjects', key: 'tilesheetObjects' },
      { name: 'tilesheetFlourishes', key: 'tilesheetFlourishes' }
    ];

    const tilesets = [];
    tilesetsData.forEach(tilesetData => {
      tilesets.push(map.addTilesetImage(tilesetData.name, tilesetData.key));
    });

    // Create layers using all tilesets
    const layers = [];
    for (let i = 0; i < map.layers.length; i++) {
      layers.push(map.createLayer(i, tilesets, 0, 0));
    }
   
    return map;
}

export function createMapBoundary(scene, map, world) {
    const boundaryOffset = 2; // increase value to decrease how close player can get to map edge
const worldBounds = new Phaser.Geom.Rectangle(
  boundaryOffset, // Offset from left edge
  boundaryOffset, // Offset from top edge
  scene.map.widthInPixels - 2 * boundaryOffset, // Width based on map size
  scene.map.heightInPixels - 2 * boundaryOffset // Height based on map size
);
     scene.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
    return worldBounds;
}


export function createCameraConstraints(scene, map, player) {
    scene.cameras.main.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels);
    scene.cameras.main.startFollow(scene.player, true, 0.05, 0.05);
    scene.cameras.main.setZoom(2);
}

export function createKeyboardAssignments(scene) {
    scene.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
}

export function createMobileControls(scene) {
  const posX = 80; //window.innerWidth; //scene.game.config.width / 5;
    const posY = window.innerHeight - 80;

    const base = scene.add.image(0, 0, scene.textures.get('base'));
    const thumb = scene.add.image(0, 0, scene.textures.get('thumb'));

    // Set the scale for base and thumb images
    base.setScale(0.5); // Adjust the scale as needed
    thumb.setScale(0.5);

    scene.joyStick = scene.plugins.get('rexvirtualjoystickplugin').add(scene, {
      x: posX,
      y: posY,
      radius: 50,
      base: base,
      thumb: thumb,
      // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
      // forceMin: 16,
      // enable: true
    })
      .on('update', scene.dumpJoyStickState, scene);

    scene.text = scene.add.text(0, 0);
    dumpJoyStickState();

      if (window.orientation === 0 || window.orientation === 180) {
        // Portrait mode alert
        alert("Please switch to landscape mode for the best experience.");
      }
    
      function dumpJoyStickState() {
    const cursorKeys = scene.joyStick.createCursorKeys();
    let s = 'Key down: ';
    for (let name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        s += `${name} `;
      }
    }

    s += `
Force: ${Math.floor(scene.joyStick.force * 100) / 100}
Angle: ${Math.floor(scene.joyStick.angle * 100) / 100}
`;

    s += '\nTimestamp:\n';
    for (let name in cursorKeys) {
      let key = cursorKeys[name];
      s += `${name}: duration=${key.duration / 1000}\n`;
    }
    // scene.text.setText(s); // <================diagnostic test data
  }
  }

export function updatePlayerMovement(scene, player, velocityChange) {

  if (!scene.player) return; // Guard clause
    //   console.log(scene.player);
    // Ensure we're accessing the Matter.js body directly
    const playerBody = scene.player.body;

    // Define a constant velocity value
   // const velocity = scene.player.velocityChange; // scene might need adjustment based on your scale
const velocity = scene.velocityChange;


    // Initialize velocity changes to 0
    let velocityX = 0;
    let velocityY = 0;

    if (scene.cursors.left.isDown) {
      velocityX = -velocity; // Move left
      //     scene.player.anims.play('walking-left', true);
    } else if (scene.cursors.right.isDown) {
      velocityX = velocity; // Move right
      //       scene.player.anims.play('walking-right', true);

    }

    if (scene.cursors.up.isDown) {
      velocityY = -velocity; // Move up
      //   scene.player.anims.play('walking-down', true);
    } else if (scene.cursors.down.isDown) {
      velocityY = velocity; // Move down
      //  scene.player.anims.play('walking-up', true);
    }

    // Set the player's velocity directly
    // Ensure we're working with the Matter body, which might require adjusting how you access the player's body
    //  Matter.Body.setVelocity(playerBody, { x: velocityX, y: velocityY });
    if (scene.player && scene.player.body) {
      Matter.Body.setVelocity(scene.player.body, { x: velocityX, y: velocityY });
    }

    // Optional: Reset to zero velocity if no key is pressed
    if (scene.player && scene.player.body) {
      if (!scene.cursors.left.isDown && !scene.cursors.right.isDown && !scene.cursors.up.isDown && !scene.cursors.down.isDown) {
        Matter.Body.setVelocity(playerBody, { x: 0, y: 0 });
        //    scene.player.anims.stop();
      }
    }

    if (velocityX !== 0 || velocityY !== 0) {
      if (velocityX > 0) {
        scene.player.anims.play('walking-right', true);
      } else if (velocityX < 0) {
        scene.player.anims.play('walking-left', true);
      } else if (velocityY < 0) {
        scene.player.anims.play('walking-down', true);
      } else if (velocityY > 0) {
        scene.player.anims.play('walking-up', true);
      }
    } else {
      // Stop animation when no movement
      scene.player.anims.stop();
    }
    scene.player.setRotation(0);
  
}

export function createPlayerAnimations(scene) { //maybe scene and/or player needed for arguments?

  scene.anims.create({
      key: 'walking-up',
      frames: scene.anims.generateFrameNames('player', {
        frames: [
          130, 131, 132, 133, 134, 135, 136, 137, 138
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    scene.anims.create({
      key: 'walking-left',
      frames: scene.anims.generateFrameNames('player', {
        frames: [
          117, 118, 119, 120, 121, 122, 123, 124, 125
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    scene.anims.create({
      key: 'walking-down',
      frames: scene.anims.generateFrameNames('player', {
        frames: [
          104, 105, 106, 107, 108, 109, 110, 111, 112
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    scene.anims.create({
      key: 'walking-right',
      frames: scene.anims.generateFrameNames('player', {
        frames: [
          143, 144, 145, 146, 147, 148, 149, 150, 151
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });
}

export function createUIIcons(scene) {
const vw = scene.cameras.main.width;

//const icons = {
  scene.icons = {
  infoIcon: scene.add.sprite(1 * vw / 11, 50, 'infoIcon').setInteractive().setScale(0.18).setOrigin(0, 0).setScrollFactor(0, 0).setDepth(100),
  settingsIcon: scene.add.sprite(6.5 * vw / 9, 50, 'settingsIcon').setInteractive().setScale(0.11).setOrigin(0, 0).setScrollFactor(0, 0).setDepth(100),
  zoomInIcon: scene.add.sprite(7 * vw / 9, 50, 'zoomInIcon').setInteractive().setScale(0.2).setOrigin(0, 0).setScrollFactor(0, 0).setDepth(100),
  zoomOutIcon: scene.add.sprite(7.5 * vw / 9, 50, 'zoomOutIcon').setInteractive().setScale(0.2).setOrigin(0, 0).setScrollFactor(0, 0).setDepth(100),
  fullscreenIcon: scene.add.sprite(8.1 * vw / 9, 50, 'fullscreenIcon').setInteractive().setScale(0.12).setOrigin(0, 0).setScrollFactor(0, 0).setDepth(100)
};
    return scene.icons;
}
