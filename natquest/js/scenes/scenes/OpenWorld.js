import BaseScene from '../BaseScene.js';
import { sensorHandler } from '../collisionHandlers/openWorldCollisionHandler.js';
import OverlayScene from '../OverlayScene.js';

 export default class OpenWorld extends BaseScene {
  constructor() {
   super('OpenWorld');
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
    super.init();
    this.mapKey = 'map';
    //this.player = data.player;
    this.velocityChange = 2;
    this.startPosX = 495;
    this.startPosY = 325;
    this.playerPosX = 495;
     this.playerPosY = 325;
    this.cameraZoomLevel = 2;
    console.log('Player received in NextRoom:', this.player);
  }

  preload() {
  }

  create() {
   super.create();
   this.sensorHandling = sensorHandler(this, this.map, this.player);
   this.scene.add('OverlayScene', OverlayScene);
   this.scene.launch('OverlayScene');
 //  console.log(this.cameras.main.id);
   // console.log(this.overlayCamera.id);
  }

  update(time, delta) {
   super.update(time, delta);
    // Update logic for the scene, if necessary
  }
}
