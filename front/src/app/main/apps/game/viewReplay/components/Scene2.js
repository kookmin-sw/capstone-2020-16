import Phaser from 'phaser'
import axios from 'axios'
import ApiFuncs from '@api/ApiFuncs'

// import { useSelector } from "react-redux";
const apiFuncs = new ApiFuncs();
const boardSize = 896;
const modalWidth = 1500;

function sleep (delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

const jsonUrl = 'assets/JSON/board.json';

const boardStatus = {
  chacksoo: "",
  placement: "",
  boardIdx: 0
}

axios.get(jsonUrl)
  .then(data => {
    boardStatus.chacksoo = data.data.board.chacksoo.split(' ');
    boardStatus.placement = data.data.board.placement.split(' ');
    boardStatus.boardIdx = 0;
  })
  .catch(error => {
    console.log(`error>>>>>${error}`);
});

// const boardStatus = useSelector(state => state.placementCounter, []);

class Scene2 extends Phaser.Scene {
    constructor() {
      super("playGame");
    }
  
    create() {

      this.iter = 0; // used for itarations
      boardStatus.boardIdx = 0;
  
      // add the background in the center of the scene
      this.background = this.add.image(modalWidth/2, boardSize/2, "background").setScale(0.7);
      this.me = this.add.image((modalWidth-boardSize)/4,100,"me").setScale(0.1);
      this.you = this.add.image(modalWidth - (modalWidth-boardSize)/4,100,"you").setScale(0.1);
      this.background.setOrigin(0.5, 0.5);
      this.myChacksoo = this.add.text(5, 160, '', { font: '48px Arial', fill: '#000000' });
  
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
        x: -80 + (modalWidth-boardSize)/2,
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
        x: -80 + (modalWidth-boardSize)/2,
        y: -88
      });
  
    }
  
  
    update() {
  
      // rotate the ships
      var children = this.saitamaGroup.getChildren();
      var children2 = this.garowGroup.getChildren();
      console.log(`start>>${boardStatus.boardIdx}`)
      for (var i = 0; i < children.length; i++) {
        // // children[i].rotation += 0.1;
        children[i].setScale(0.18);
        children2[i].setScale(0.18);
        
        if(boardStatus.chacksoo[(boardStatus.boardIdx+1)*64 + i] === "0"){
          children[i].visible = false;
          children2[i].visible = false;
        }
        else if(boardStatus.chacksoo[(boardStatus.boardIdx+1)*64 + i] === "1"){
          children[i].visible = true;
          children2[i].visible = false;
        }
        else if(boardStatus.chacksoo[(boardStatus.boardIdx+1)*64 + i] === "-1"){
          children[i].visible = false;
          children2[i].visible = true;
        }
        else{
          children[i].visible = false;
          children2[i].visible = false;
        }
        
      };
      if(boardStatus.boardIdx%2 === 0){
        if(boardStatus.placement[boardStatus.boardIdx*2] !== undefined){
          this.myChacksoo.setText('chacksoo: ' + boardStatus.placement[boardStatus.boardIdx*2] + ',' + boardStatus.placement[boardStatus.boardIdx*2 + 1]);
        }
        else{
          this.myChacksoo.setText('chacksoo: 준비');
        }
      }
      else{
        if(boardStatus.placement[(boardStatus.boardIdx-1)*2] !== undefined){
          this.myChacksoo.setText('chacksoo: ' + boardStatus.placement[(boardStatus.boardIdx-1)*2] + ',' + boardStatus.placement[(boardStatus.boardIdx-1)*2 + 1]);
        }
        else{
          this.myChacksoo.setText('chacksoo: 준비');
        }
      }
      
      // increment the iteration
      this.iter += 0.001;
      // console.log(`boardStatus.boardIdx>>${boardStatus.chacksoo}`);
      boardStatus.boardIdx += 1;
      if(boardStatus.chacksoo[boardStatus.boardIdx*64] === undefined){
        boardStatus.boardIdx = 0;
      }
      sleep(500);
    };
  }
  
  export default Scene2;