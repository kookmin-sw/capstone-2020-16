import Phaser from 'phaser'
import axios from 'axios'

const boardSize = 627;
const modalWidth = 1050;
const modalHeight = 700;
var renderSpeed = 500;

const version = {
  'version': 'v1',
}
const boardStatus = {
  chacksoo: [],
  placement: [],
  boardIdx: 0,
  isAuto: false,
  idxLen : 0,
  isError: "",
  renderTime: new Date().getTime(),
  challengerId: 0,
  oppositeId: 0,
  idxIncrement: true
}
var header = {
  'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
}

class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
    
    axios.get(`http://203.246.112.32:8000/api/${version.version}/game/${window.localStorage.getItem('game_id')}/`, { headers: header})
    .then((response) => {
        // console.log(response)
        boardStatus.isError = response.data.error_msg;
        boardStatus.chacksoo = response.data.record.replace(/\n/gi, '').split(/ /);
        boardStatus.realChacksoo = [];
        for(let i = 0, chacksooIdx = 0; i < boardStatus.chacksoo.length; chacksooIdx++){
          let tempChacksoo = [];
          for(let j=0; j<64; j++){
            tempChacksoo.push(boardStatus.chacksoo[i++]);
          }
          boardStatus.realChacksoo.push(tempChacksoo);
        }
        boardStatus.placement = response.data.placement_record.split(/\n/);
        boardStatus.idxLen = boardStatus.realChacksoo.length;
        boardStatus.challengerId = response.data.challenger;
        boardStatus.oppositeId = response.data.opposite;
      })
      .catch((error) => {
        // console.log(error.response.status);
      });
    }
  
    create() {
      this.iter = 0; // used for itarations
      boardStatus.boardIdx = 0;
      this.background = this.add.image(modalWidth/2, boardSize/2, "background").setScale(0.49)
        .setInteractive()
        .on('pointerup', () => {
          alert(parseInt((this.sys.game.input.mousePointer.y - 55)/64) + ',' + parseInt((this.sys.game.input.mousePointer.x - 268)/64));
          // alert(this.sys.game.input.mousePointer.x+','+ this.sys.game.input.mousePointer.y);
        });
      // this.background.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
      this.background.setOrigin(0.5, 0.5);
      // for slider
      this.sliderDot = this.add.image(modalWidth/2, modalHeight - 50, 'dot').setScale(7, 7); // add dot
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
                
                if(boardStatus.isAuto === true){
                  this.clickButton.setText("Auto Mode Button", { font: '17px Arial' })
                  // this.sliderDot.visible = false;
                }
                else{
                  // this.sliderDot.visible = true;
                  this.clickButton.setText("Manual Mode Button", { font: '17px Arial' })
                }
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
      this.clickButton = this.add.text(modalWidth/2 - 100, modalHeight - 110, `${boardStatus.isAuto} Mode Button`, { font: '17px Arial', fill: '#eec65b' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.updateClickCountText();
        this.enterButtonHoverState();
      });
      

      this.nextButton = this.add.text(this.sliderDot.x + 430, modalHeight - 60, "Next Button", { fill: '#eec65b' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverStateNext() )
      .on('pointerout', () => this.enterButtonRestStateNext() )
      .on('pointerdown', () => this.enterButtonActiveStateNext() )
      .on('pointerup', () => {
        this.nextIdxText();
        this.enterButtonHoverStateNext();
      });
      

      this.previousButton = this.add.text(this.sliderDot.x - 180, modalHeight - 60, "Previous Button", { fill: '#eec65b' })
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
      if(parseInt(window.localStorage.getItem('pk')) === boardStatus.challengerId){
        // console.log('같다')
        this.me = this.add.image((modalWidth-boardSize)/4,100,"me").setScale(0.07);
        this.you = this.add.image(modalWidth - (modalWidth-boardSize)/4,100,"you").setScale(0.07);
        this.myName = this.add.text((modalWidth-boardSize)/4 - 30, 5, '나', { font: '34px Arial', fill: '#eec65b' });
        this.yourName = this.add.text(modalWidth - (modalWidth-boardSize)/4 - 35, 5, '상대방', { font: '34px Arial', fill: '#eec65b' });
      }
      else{
        this.me = this.add.image(modalWidth - (modalWidth-boardSize)/4,100,"me").setScale(0.07);
        this.you = this.add.image((modalWidth-boardSize)/4,100,"you").setScale(0.07);
        this.myName = this.add.text((modalWidth-boardSize)/4 - 30, 5, '상대방', { font: '34px Arial', fill: '#eec65b' });
        this.yourName = this.add.text(modalWidth - (modalWidth-boardSize)/4 - 35, 5, '나', { font: '34px Arial', fill: '#eec65b' });
      }
      
      this.myChacksoo = this.add.text(60, 160, '', { font: '34px Arial', fill: '#eec65b' });
      this.yourChacksoo = this.add.text(modalWidth - 160, 160, '', { font: '34px Arial', fill: '#eec65b' });

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
        cellWidth: 64,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -45,
        y: -215
      });
      
      Phaser.Actions.GridAlign(this.pink_booGroup.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 64,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -45,
        y: -215
      });
      
      // slider value65b' });
      this.errMsg = this.add.text(modalWidth/2 - 300, 0, `${boardStatus.isError}`, { font: '15px Arial', fill: '#eec65b' });
    }
    
  
    update() {
      // console.log(boardStatus.boardIdx)
      
      // rotate the ships
      var children = this.blue_booGroup.getChildren();
      var children2 = this.pink_booGroup.getChildren();
      
      for (var i = 0; i < children.length; i++) {
        // // children[i].rotation += 0.1;
        children[i].setScale(0.091);
        children2[i].setScale(0.091);
        
        if(boardStatus.realChacksoo[boardStatus.boardIdx][i] === "0"){
          children[i].visible = false;
          children2[i].visible = false;
        }
        else if(boardStatus.realChacksoo[boardStatus.boardIdx][i] === "1"){
          children[i].visible = true;
          children2[i].visible = false;
        }
        else if(boardStatus.realChacksoo[boardStatus.boardIdx][i] === "-1"){
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
            this.myChacksoo.setText('이동\n ' + boardStatus.placement[boardStatus.boardIdx].charAt(0) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(2) + '>' + boardStatus.placement[boardStatus.boardIdx].charAt(6) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(8));
            if(boardStatus.boardIdx === 0){
              this.yourChacksoo.setText('착수\n 준비');
            }
          }
          else{
            // my chacksoo
            this.myChacksoo.setText('착수\n ' + boardStatus.placement[boardStatus.boardIdx].charAt(2) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(4));
            if(boardStatus.boardIdx === 0){
              this.yourChacksoo.setText('착수\n 준비')
            }
          }
        }
        else{
          // undefined
          this.myChacksoo.setText('착수\n 준비');
          this.yourChacksoo.setText('착수\n 준비');
        }
      }
      else{
        // your turn
        if(boardStatus.placement[(boardStatus.boardIdx)] !== undefined){
          if(boardStatus.placement[(boardStatus.boardIdx)].charAt(4) === '>'){
            // your move
            this.yourChacksoo.setText('이동\n ' + boardStatus.placement[boardStatus.boardIdx].charAt(0) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(2) + '>' + boardStatus.placement[boardStatus.boardIdx].charAt(6) + ',' + boardStatus.placement[boardStatus.boardIdx].charAt(8));
          }
          else{
            // your chacksoo
            if(boardStatus.placement[boardStatus.boardIdx] !== undefined){
              this.yourChacksoo.setText('착수\n ' + boardStatus.placement[(boardStatus.boardIdx)].charAt(2) + ',' + boardStatus.placement[(boardStatus.boardIdx)].charAt(4));
            }
            else{
              this.yourChacksoo.setText('착수\n 준비');
            }
          }
        }
        else{
          // undefined
          this.myChacksoo.setText('착수\n 준비');
          this.yourChacksoo.setText('착수\n 준비');
        }
      }
      
      // increment the iteration
      this.iter += 0.001;
      if(boardStatus.isAuto){
        if(new Date().getTime() - boardStatus.renderTime > renderSpeed){
          if(boardStatus.idxIncrement){
            boardStatus.boardIdx += 1;
            this.sliderDot.x += 400/boardStatus.idxLen;
            this.sliderDot.slider.value += 1/boardStatus.idxLen;
          }
          boardStatus.renderTime = new Date().getTime()
        }
        this.sliderDot.visible = false;
      }
      else{
        this.sliderDot.visible = true;
        boardStatus.boardIdx = parseInt(this.sliderDot.slider.value * boardStatus.idxLen + 0.00001);
      }

      if(boardStatus.boardIdx >= (boardStatus.idxLen -2) && boardStatus.isAuto){
        boardStatus.idxIncrement = false;
        this.sliderDot.slider.value = 0;
      }
      else{
        boardStatus.idxIncrement = true;
      }
    };
  }
  
  export default Scene2;