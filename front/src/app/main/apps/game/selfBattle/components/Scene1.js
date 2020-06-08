import Phaser from 'phaser'

class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload(){
      this.load.image("background", "assets/images/webGL/board.jpg");
      this.load.image("blue_boo", "assets/images/webGL/blue_boo.png");
      this.load.image("pink_boo", "assets/images/webGL/pink_boo.png");
      this.load.image("spinner", "assets/images/webGL/spinner.png");
      this.load.image("me", "assets/images/webGL/user.png");
      this.load.image("you", "assets/images/webGL/user2.png");
      this.load.plugin('rexsliderplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js', true); // slider bar
      this.load.image('dot', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/white-dot.png'); // slider dot
    }
  
    create() {
      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");
      // if(window.sessionStorage.getItem("SS_sceneLife") === false)
    }

  }

  export default Scene1;