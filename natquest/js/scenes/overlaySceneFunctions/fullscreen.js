export function createFullscreenIcon(scene) {
    
const vw = window.innerWidth;
const fullscreenIcon = scene.add.sprite(8.1 * vw/ 9, 50, 'fullscreenIcon').setInteractive().setScale(.12);

    fullscreenIcon.on('pointerdown', () => {
            // Handle fullscreen icon click
              if (isFullScreen()) {
              exitFullScreen();
                } else {
              requestFullScreen();
                }
                    });
    

  return fullscreenIcon;
}
    
   // this.scale.on('fullscreenchange', this.handleFullscreenChange.bind(this));
  //  this.scale.on('resize', this.handleFullscreenChange, this);
//the two above were in the create func previously from old examples

   // ****************************************************************FULL SCREEN BUTTON METHODS*************************************************************

function requestFullScreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
    }
}
/*
handleFullscreenChange() {
   
    // Check if the game is running on a mobile device
    const isMobile = /Mobi|Android|iOS/i.test(navigator.userAgent);

    // Apply delay only if on a mobile device was running into problem where it would capture resize zone too early and cut off the canvas
    if (isMobile) {
        // Wait for a short delay before resizing
        setTimeout(() => {
            if (this.scale.isFullscreen) {
              
                this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
            } else {
              
                this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
            }
        }, 1000); // Adjust the delay time as needed
    } else {
        // Resize immediately without delay for desktop
        if (this.scale.isFullscreen) {
          
            this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        } else {
       
            this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        }
    }
}

      resizeGame(gameSize) {

        const { width, height } = gameSize;

        // Resize the game canvas
        this.sys.game.canvas.style.width = width + 'px';
        this.sys.game.canvas.style.height = height + 'px';

        // Resize the game config to match the new size
        this.sys.game.config.width = width;
        this.sys.game.config.height = height;

        // Call resize events on all scenes
        this.events.emit('resize', gameSize);
    }
*/

 function isFullScreen() {
    return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

