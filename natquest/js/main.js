import { Preloader } from "./scenes/gameStartScenes/Preloader.js";
import CustomEmitter from './scenes/CustomEmitter.js';

//set the width and height of the canvas equal the width and height of the screen it's being played on
const width = window.innerWidth;
const height = window.innerHeight;

const customEmitter = new CustomEmitter();
export default customEmitter;

const config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  backgroundColor: '#FDD5D5', //this is the pink "border" that is around the screen
  //it helps it maintain aspect ratio when resized, could be replaced with border image
  parent: 'game-container',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE, //this just makes it so that the game canvas always tries to automatically adjust so that it fills the available screen
  },
  physics: {
    default: "matter", //this sets the physics engine to use matter.js instead of arcade physics
    matter: { //here the defaults for the matter.js physics engine are set
      gravity: { y: 0 }, //since its a top down "2.5D" game, there is no inherent gravity. if certain scenes have sidescroller aspect or things need to fall "down", adjust the gravity as needed per scene
      debug: true,
    },
  },
 scene: [
    Preloader,
  ],
  interpolation: true,
};

const game = new Phaser.Game(config);
