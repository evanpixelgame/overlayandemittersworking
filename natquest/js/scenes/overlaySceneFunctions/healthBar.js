export function createHealthBar(scene) {
  
scene.healthBar = scene.add.rectangle(
    (window.innerWidth / 4) / 2 / 2,  // X coordinate relative to the viewport
    (window.innerHeight / 4) / 2 / 2,  // Y coordinate relative to the viewport
    50,  // Width of the object
    300,  // Height of the object
    0xff0000  // Color of the object (red)
);
    scene.healthBar.setScrollFactor(0, 0);
    scene.healthBar.setDepth(100000);
}
