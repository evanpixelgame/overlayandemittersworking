//import customEmitter from '../../main.js';  

export function createZoomIcons(scene) {

// customEmitter.on('switchOverlayActiveScene', (newScene) => {
//scene.activeScene = newScene;
//});
  
  const vw = window.innerWidth;
  
   const zoomInIcon = scene.add.sprite(7 * vw / 9, 50, 'zoomInIcon').setInteractive().setScale(0.2);
   const zoomOutIcon = scene.add.sprite(7.5 * vw / 9, 50, 'zoomOutIcon').setInteractive().setScale(0.2);
  
 zoomInIcon.on('pointerdown', () => {
         if (scene.activeScene.cameras.main.zoom < 3) {
    scene.activeScene.cameras.main.zoom *= 1.1; // Increase zoom by 10%
  } else {
    console.log('Maximum zoom level reached.');
  }
        });

 zoomOutIcon.on('pointerdown', () => {
       if (scene.activeScene.cameras.main.zoom > 1) { // Set a minimum zoom level (0.2 is just an example)
    scene.activeScene.cameras.main.zoom /= 1.1; // Decrease zoom by 10%
  } else {
    console.log('Minimum zoom level reached.');
  }
        });
  
  return 
}
