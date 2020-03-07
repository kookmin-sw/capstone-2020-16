import Phaser from 'phaser'
import axios from 'axios'

const boardStatus = {
  chacksoo: [],
  placement: []
};

function sleep (delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}


class Scene2 extends Phaser.Scene {
    constructor() {
      super("playGame");
    }
  
    create() {

      this.iter = 0; // used for itarations
      this.boardIdx = 0;

      const jsonUrl = 'assets/JSON/board.json';

      axios.get(jsonUrl)
        .then(data => {
          boardStatus.chacksoo = data.data.board.chacksoo.split(' ');
          boardStatus.placement = data.data.board.placement.split(' ');
          // console.log(`boardStatus.chacksoo=>${boardStatus.chacksoo}`);
        })
        .catch(error => {
          console.log(`error>>>>>${error}`);
        });
  
      // add the background in the center of the scene
      this.background = this.add.image(0, 0, "background").setScale(0.7);
      this.background.setOrigin(0.5, 0.5);
      this.background.x = 896/2;
      this.background.y = 896/2;
  
      // make a group of ships
      this.saitamaGroup = this.make.group({
        key: "saitama",
        frameQuantity: 64,
        max: 64
      });
  
      this.garowGroup = this.make.group({
        key: "garow",
        frameQuantity: 64,
        max: 64
      });
  
      // align the group of ships in a grid
      Phaser.Actions.GridAlign(this.saitamaGroup.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 92,
        cellHeight: 92,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -80,
        y: -88
      });
  
      Phaser.Actions.GridAlign(this.garowGroup.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 92,
        cellHeight: 92,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -80,
        y: -88
      });
  
    }
  
  
    update() {
  
      // rotate the ships
      var children = this.saitamaGroup.getChildren();
      var children2 = this.garowGroup.getChildren();

      for (var i = 0; i < children.length; i++) {
        // // children[i].rotation += 0.1;
        children[i].setScale(0.18);
        children2[i].setScale(0.18);

        if(boardStatus.chacksoo[this.boardIdx*64 + i] === "0"){
          children[i].visible = false;
          children2[i].visible = false;
        }
        else if(boardStatus.chacksoo[this.boardIdx*64 + i] === "1"){
          children[i].visible = true;
          children2[i].visible = false;
        }
        else if(boardStatus.chacksoo[this.boardIdx*64 + i] === "-1"){
          children[i].visible = false;
          children2[i].visible = true;
        }
        else{
          children[i].visible = false;
          children2[i].visible = false;
        }
        
      };
  
      // increment the iteration
      this.iter += 0.001;
      console.log(`this.boardIdx>>${boardStatus.chacksoo}`);
      this.boardIdx += 1;
      if(boardStatus.chacksoo[this.boardIdx*64] === undefined){
        this.boardIdx = 0;
      }
      sleep(500);
    };
  }
  
  export default Scene2;