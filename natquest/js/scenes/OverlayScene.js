import { createFullscreenIcon } from './overlaySceneFunctions/fullscreen.js';
import { createZoomIcons } from './overlaySceneFunctions/zoom.js';
import { resizeGame, setupResizeListener } from './overlaySceneFunctions/resizer.js';
import { createHealthBar } from './overlaySceneFunctions/healthBar.js';
import customEmitter from '../main.js';

export default class OverlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverlayScene' })
  }

  init(data) {
   // this.player = data.player;
    this.activeScene = null;
   // this.player = this.activeScene.player;
  }

  preload() {

  }

  create() {

 this.updateActiveScene('OpenWorld'); //Put the key of whatever the initial scene is as the argument here to initialize it

//in collision handlers, custom emitter passes new scene key when transitioning scenes, this subscribes to that emitter
customEmitter.on('activeSceneChanged', (newSceneKey) => {
    this.updateActiveScene(newSceneKey);
});
  
    this.fullscreenIcon = createFullscreenIcon(this); //fullscreen icon, positioned in top right corner of viewport
    
    this.zoomIcons = createZoomIcons(this); // positioned directly to left of fullscreen icon, at about 3/4 viewport 
    
    this.healthBar = createHealthBar(this);

    this.resizer = setupResizeListener(this);
       
  }



updateActiveScene = (newSceneKey) => {     
   this.scene.bringToTop('OverlayScene');
  console.log('updateActiveScene method activating');
      console.log(this);
   let newScene = newSceneKey;   
  this.scene.manager.scenes.forEach(scene => {
    if (scene.scene.key === newScene) {
      this.activeScene = scene;
      console.log('got new active scene ' + this.activeScene.scene.key + this.activeScene);
    }
  });
}
  
  
  update() {

  }
}


