import BaseScene from '../BaseScene.js';
import NewScene from './NewScene.js';

 export default class NextRoom extends BaseScene {
  constructor() {
   super('NextRoom');
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
   // super.init();
    this.mapKey = 'nextroommap';
    //this.player = data.player;
    this.velocityChange = 2;
    this.startPosX = 970;
    this.startPosY = 665;
    this.playerPosX = 970;
     this.playerPosY = 665;
    this.cameraZoomLevel = 2;
    console.log('Player received in NextRoom:', this.player);
  }

  preload() {
  }

  create() {
   super.create();
  }

  update(time, delta) {
   super.update(time, delta);
    // Update logic for the scene, if necessary
  }
}
