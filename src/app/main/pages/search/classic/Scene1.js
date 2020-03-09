import Phaser from 'phaser'

class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload(){
      this.load.image("background", "assets/images/webGL/board.jpg");
      this.load.image("saitama", "assets/images/webGL/saitama2.png");
      this.load.image("garow", "assets/images/webGL/garow.png");
    }
  
    create() {
      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");
    }

  }

  export default Scene1;