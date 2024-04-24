export function resizeGame(scene, gameSize) {
      
        const { width, height } = gameSize;

        // Resize the game canvas
        scene.sys.game.canvas.style.width = width + 'px';
        scene.sys.game.canvas.style.height = height + 'px';

        // Resize the game config to match the new size
        scene.sys.game.config.width = width;
        scene.sys.game.config.height = height;

        // Call resize events on all scenes
        scene.events.emit('resize', gameSize);
    }

export function setupResizeListener(scene) {
    scene.scale.on('resize', () => {
        resizeGame(scene, { width: window.innerWidth, height: window.innerHeight });
    });
}
