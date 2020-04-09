import Phaser from 'phaser'
import ApiFuncs from '@api/ApiFuncs'

const boardSize = 896;
const modalWidth = 1500;

function sleep (delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

const api = new ApiFuncs()
const version = {
  'version': 'v1',
  'id': 54
}
const boardStatus = {
  chacksoo: "",
  placement: "",
  boardIdx: 0,
  isAuto: false,
}

api.api_game_read(version)
.then((response)=>{
  var temp_chacksoo = response.record.replace(/\n/gi, '')
  boardStatus.chacksoo = temp_chacksoo.split(/ /)
  var temp_placement = response.placement_record.replace(/\n/gi, ' ')
  boardStatus.placement = temp_placement.split(/ /)
}).catch((error)=>{
  console.log(error)
});

class Scene2 extends Phaser.Scene {
    constructor() {
      super("playGame");
    }
  
    create() {
      this.iter = 0; // used for itarations
      boardStatus.boardIdx = 0;
      this.clickCountText = this.add.text(0, 300, `Button has been clicked ${boardStatus.isAuto} times.`, { fill: '#0f0' })

      this.updateClickCountText = () => {
        this.clickCountText.setText(`Button has been clicked ${boardStatus.isAuto} times.`);
        boardStatus.isAuto = !boardStatus.isAuto
      }
      this.clickButton = this.add.text(0, 0, 'Click me!', { fill: '#0f0' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.updateClickCountText();
        this.enterButtonHoverState();
      });

      
      this.enterButtonHoverState = () => {
        this.clickButton.setStyle({ fill: '#ff0'});
      }
      
      this.enterButtonRestState = () => {
        this.clickButton.setStyle({ fill: '#0f0' });
      }
      
      this.enterButtonActiveState = () => {
        this.clickButton.setStyle({ fill: '#0ff' });
      }
      
      this.updateClickCountText();
      
      // add the background in the center of the scene
      this.background = this.add.image(modalWidth/2, boardSize/2, "background").setScale(0.7);
      this.me = this.add.image((modalWidth-boardSize)/4,100,"me").setScale(0.1);
      this.you = this.add.image(modalWidth - (modalWidth-boardSize)/4,100,"you").setScale(0.1);
      this.background.setOrigin(0.5, 0.5);
      this.myChacksoo = this.add.text(5, 160, '', { font: '48px Arial', fill: '#000000' });
      this.yourChacksoo = this.add.text(modalWidth - 300, 160, '', { font: '48px Arial', fill: '#000000' });
  
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
      
      for (var i = 0; i < children.length; i++) {
        // // children[i].rotation += 0.1;
        children[i].setScale(0.18);
        children2[i].setScale(0.18);
        
        if(boardStatus.chacksoo[((boardStatus.boardIdx+1)*64) + i] === "0"){
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
        if(boardStatus.placement[boardStatus.boardIdx*3] !== undefined){
          this.myChacksoo.setText('chacksoo: ' + boardStatus.placement[boardStatus.boardIdx*3 + 1] + ',' + boardStatus.placement[boardStatus.boardIdx*3 + 2]);
          if(boardStatus.boardIdx === 0){
            this.yourChacksoo.setText('ckachsoo: 준비')
          }
          else{
            this.yourChacksoo.setText('chacksoo: ' + boardStatus.placement[(boardStatus.boardIdx-1)*3 + 1] + ',' + boardStatus.placement[(boardStatus.boardIdx-1)*3 + 2]);
          }
        }
        else{
          this.myChacksoo.setText('chacksoo: 준비');
          this.yourChacksoo.setText('chacksoo: 준비');
        }
      }
      else{
        if(boardStatus.placement[(boardStatus.boardIdx-1)*3] !== undefined){
          this.myChacksoo.setText('chacksoo: ' + boardStatus.placement[(boardStatus.boardIdx-1)*3 + 1] + ',' + boardStatus.placement[(boardStatus.boardIdx-1)*3 + 2]);
          this.yourChacksoo.setText('chacksoo: ' + boardStatus.placement[(boardStatus.boardIdx)*3 + 1] + ',' + boardStatus.placement[(boardStatus.boardIdx)*3 + 2]);
        }
        else{
          this.myChacksoo.setText('chacksoo: 준비');
          this.yourChacksoo.setText('chacksoo: 준비');
        }
      }
      
      // increment the iteration
      this.iter += 0.001;
      if(boardStatus.isAuto)
        boardStatus.boardIdx += 1;
      
      if(boardStatus.chacksoo[(boardStatus.boardIdx-1)*64] === undefined){
        boardStatus.boardIdx = 0;
      }
      sleep(500);
    };
  }
  
  export default Scene2;