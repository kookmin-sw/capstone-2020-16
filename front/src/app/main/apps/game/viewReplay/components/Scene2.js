import Phaser from 'phaser'
// import ApiFuncs from '@api/ApiFuncs'
import axios from 'axios'

const boardSize = 896;
const modalWidth = 1500;
const modalHeight = 1000;

function sleep (delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

// const api = new ApiFuncs()
const version = {
  'version': 'v1',
  'id': 179
}
const boardStatus = {
  chacksoo: "",
  placement: [],
  boardIdx: 0,
  isAuto: false,
  idxLen : 0,
}
var header = {
  'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
}

class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
    
    axios.get(`/api/${version.version}/game/${version.id}/`, { headers: header})
    .then((response) => {
        boardStatus.chacksoo = response.data.record.replace(/\n/gi, '').split(/ /);
        boardStatus.placement = response.data.placement_record.split(/\n/);
        boardStatus.idxLen = boardStatus.chacksoo.length/64;
        console.log(boardStatus.placement)
      })
      .catch((error) => {
        console.log(error.response.status);
      });
    }
  
    create() {
      this.iter = 0; // used for itarations
      boardStatus.boardIdx = 0;
      
      // for slider
      this.sliderDot = this.add.image(modalWidth/2, modalHeight - 50, 'dot').setScale(10, 10); // add dot
      this.sliderDot.slider = this.plugins.get('rexsliderplugin').add(this.sliderDot, {
        endPoints: [{
                x: this.sliderDot.x - 200,
                y: this.sliderDot.y
            },
            {
                x: this.sliderDot.x + 200,
                y: this.sliderDot.y
            }
        ],
        value: 0
      });
      this.add.graphics()
              .lineStyle(3, 0xeec65b, 1)
              .strokePoints(this.sliderDot.slider.endPoints);
              
              // change isAuto value
              this.updateClickCountText = () => {
                boardStatus.isAuto = !boardStatus.isAuto
                
                if(boardStatus.isAuto === true)
                this.clickButton.setText("Auto Mode")
                else
                this.clickButton.setText("Manual Mode")
              }
              this.nextIdxText = () => {
                if(boardStatus.isAuto === false){
                  if(boardStatus.boardIdx !== boardStatus.idxLen){
                    boardStatus.boardIdx += 1;
                    this.sliderDot.slider.value += 1/boardStatus.idxLen;
                  }
                }
              }
              this.previousIdxText = () => {
                if(boardStatus.isAuto === false){
                  if(boardStatus.boardIdx !== 0){
                    boardStatus.boardIdx -= 1;
                    this.sliderDot.slider.value -= 1/boardStatus.idxLen;
                  }
                }
              }
      

      // auto manual button(text)
      this.clickButton = this.add.text(0, 0, `${boardStatus.isAuto} Mode`, { fill: '#eec65b' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.updateClickCountText();
        this.enterButtonHoverState();
      });
      

      this.nextButton = this.add.text(0, 300, "Next Button", { fill: '#eec65b' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverStateNext() )
      .on('pointerout', () => this.enterButtonRestStateNext() )
      .on('pointerdown', () => this.enterButtonActiveStateNext() )
      .on('pointerup', () => {
        this.nextIdxText();
        this.enterButtonHoverStateNext();
      });
      

      this.previousButton = this.add.text(0,400, "Previous Button", { fill: '#eec65b' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverStatePrevious() )
      .on('pointerout', () => this.enterButtonRestStatePrevious() )
      .on('pointerdown', () => this.enterButtonActiveStatePrevious() )
      .on('pointerup', () => {
        this.previousIdxText();
        this.enterButtonHoverStatePrevious();
      });

      
      this.enterButtonHoverState = () => {
        this.clickButton.setStyle({ fill: '#92b4bf'});
      }
      
      this.enterButtonRestState = () => {
        this.clickButton.setStyle({ fill: '#eec65b' });
      }
      
      this.enterButtonActiveState = () => {
        this.clickButton.setStyle({ fill: '#0ff' });
      }
      
      this.enterButtonHoverStateNext = () => {
        this.nextButton.setStyle({ fill: '#92b4bf'});
      }
      
      this.enterButtonRestStateNext = () => {
        this.nextButton.setStyle({ fill: '#eec65b' });
      }
      
      this.enterButtonActiveStateNext = () => {
        this.nextButton.setStyle({ fill: '#0ff' });
      }
      
      this.enterButtonHoverStatePrevious = () => {
        this.previousButton.setStyle({ fill: '#92b4bf'});
      }
      
      this.enterButtonRestStatePrevious = () => {
        this.previousButton.setStyle({ fill: '#eec65b' });
      }
      
      this.enterButtonActiveStatePrevious = () => {
        this.previousButton.setStyle({ fill: '#0ff' });
      }
      
      this.updateClickCountText();
      this.previousIdxText();
      this.nextIdxText();
      
      // this.click
      
      // add the background in the center of the scene
      this.background = this.add.image(modalWidth/2, boardSize/2, "background").setScale(0.7);
      this.me = this.add.image((modalWidth-boardSize)/4,100,"me").setScale(0.1);
      this.you = this.add.image(modalWidth - (modalWidth-boardSize)/4,100,"you").setScale(0.1);
      this.background.setOrigin(0.5, 0.5);
      this.myChacksoo = this.add.text(5, 160, '', { font: '48px Arial', fill: '#eec65b' });
      this.yourChacksoo = this.add.text(modalWidth - 300, 160, '', { font: '48px Arial', fill: '#eec65b' });

      // make a group of ships
      this.blue_booGroup = this.make.group({
        key: "blue_boo",
        frameQuantity: 64,
        max: 64
      });
      
      this.pink_booGroup = this.make.group({
        key: "pink_boo",
        frameQuantity: 64,
        max: 64
      });
      
      // align the group of ships in a grid
      Phaser.Actions.GridAlign(this.blue_booGroup.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 92,
        cellHeight: 92,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: 95,
        y: -170
      });
      
      Phaser.Actions.GridAlign(this.pink_booGroup.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 92,
        cellHeight: 92,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: 95,
        y: -170
      });
      
      // slider value
      // this.text = this.add.text(800,0, '', { font: '48px Arial', fill: '#eec65b' });
    }
    
  
    update() {
      console.log(boardStatus.boardIdx)
      
      // rotate the ships
      var children = this.blue_booGroup.getChildren();
      var children2 = this.pink_booGroup.getChildren();
      
      for (var i = 0; i < children.length; i++) {
        // // children[i].rotation += 0.1;
        children[i].setScale(0.13);
        children2[i].setScale(0.13);
        
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
        // my turn
        if(boardStatus.placement[boardStatus.boardIdx] !== undefined){
          if(boardStatus.placement[boardStatus.boardIdx].charAt(4) === '>'){
            // my move
            this.myChacksoo.setText('move\n ' + boardStatus.placement[boardStatus.boardIdx].charAt(0) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(2) + '>' + boardStatus.placement[boardStatus.boardIdx].charAt(6) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(8));
            if(boardStatus.boardIdx === 0){
              this.yourChacksoo.setText('chacksoo\n 준비');
            }
          }
          else{
            // my chacksoo
            this.myChacksoo.setText('chacksoo\n ' + boardStatus.placement[boardStatus.boardIdx].charAt(2) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(4));
            if(boardStatus.boardIdx === 0){
              this.yourChacksoo.setText('chacksoo\n 준비')
            }
            else{
              this.yourChacksoo.setText('chacksoo\n ' + boardStatus.placement[(boardStatus.boardIdx-1)].charAt(2) + ',' + boardStatus.placement[(boardStatus.boardIdx-1)].charAt(4));
            }
          }
        }
        else{
          // undefined
          this.myChacksoo.setText('chacksoo\n 준비');
          this.yourChacksoo.setText('chacksoo\n 준비');
        }
      }
      else{
        // your turn
        if(boardStatus.placement[(boardStatus.boardIdx)] !== undefined){
          if(boardStatus.placement[(boardStatus.boardIdx)].charAt(4) === '>'){
            // your move
            this.yourChacksoo.setText('move\n ' + boardStatus.placement[boardStatus.boardIdx].charAt(0) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(2) + '>' + boardStatus.placement[boardStatus.boardIdx].charAt(6) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(8));
          }
          else{
            // your chacksoo
            // this.myChacksoo.setText('chacksoo\n ' + boardStatus.placement[(boardStatus.boardIdx)*3 + 1] + ',' + boardStatus.placement[(boardStatus.boardIdx)*3 + 2]);
            if(boardStatus.placement[boardStatus.boardIdx] !== undefined){
              this.yourChacksoo.setText('chacksoo\n ' + boardStatus.placement[(boardStatus.boardIdx)].charAt(2) + ',' + boardStatus.placement[(boardStatus.boardIdx)].charAt(4));
            }
            else{
              this.yourChacksoo.setText('chacksoo\n 준비');
            }
          }
        }
        else{
          // undefined
          this.myChacksoo.setText('chacksoo\n 준비');
          this.yourChacksoo.setText('chacksoo\n 준비');
        }
      }
      
      // increment the iteration
      this.iter += 0.001;
      if(boardStatus.isAuto){
        boardStatus.boardIdx += 1;
        this.sliderDot.x += 400/boardStatus.idxLen;
        this.sliderDot.slider.value += 1/boardStatus.idxLen;
        this.sliderDot.visible = false;
        sleep(500);
      }
      else{
        this.sliderDot.visible = true;
        boardStatus.boardIdx = parseInt(this.sliderDot.slider.value * boardStatus.idxLen + 0.00001);
      }


      if(boardStatus.chacksoo[(boardStatus.boardIdx-1)*64] === undefined){
        boardStatus.boardIdx = 0;
        this.sliderDot.x = 550;
        this.sliderDot.slider.value = 0;
      }
    };
  }
  
  export default Scene2;