import BaseScene from '../BaseScene.js';
import { sensorHandler } from '../collisionHandlers/newSceneCollisionHandler.js';

 export default class NewScene extends BaseScene {
  constructor() {
   super('NewScene');
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
    super.init();
    this.mapKey = 'insidemap';
   // this.player = data.player;
    this.velocityChange = 2;
    this.startPosX = 970;
    this.startPosY = 665;
    this.playerPosX = 970;
     this.playerPosY = 665;
    this.cameraZoomLevel = 1;
    console.log('Player received in NewScene:', this.player);
  }

  preload() {
  }

  create() {
   super.create();
   this.sensorHandling = sensorHandler(this, this.map, this.player);

/*      
    this.scene.manager.scenes.forEach(scene => {
   // console.log(scene.scene.key); // Access the key of each scene
   // console.log(scene); // Log each scene object
    if (scene.scene.key !== 'OverlayScene') {
    this.activeScene = scene;
}
});


    console.log('titi is the prettiest in universe and here is only active under scene: ' + this.activeScene.scene.key + this.activeScene);

    */

  }

  
  update(time, delta) {
   super.update(time, delta);
    // Update logic for the scene, if necessary
  }
}
