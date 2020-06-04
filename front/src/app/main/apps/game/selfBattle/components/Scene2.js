import Phaser from 'phaser'
import axios from 'axios'
import { stringify } from 'qs';

const boardSize = 627;
const modalWidth = 1050;
const modalHeight = 700;
// var renderSpeed = 500;

const version = {
  'version': 'v1',
}

var header = {
  'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
}

class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
    this.boardStatus = {
      chacksoo: [],
      placement: [],
      realChacksoo: [["1","0","0","0","0","0","0","-1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","-1","0","0","0","0","0","0","1"]],
      boardIdx: 0,
      isAuto: false,
      idxLen : 0,
      isError: "",
      renderTime: new Date().getTime(),
      challengerId: 0,
      oppositeId: 0,
      idxIncrement: false
    };
  }
  
  create() {
    this.iter = 0; // used for itarations
    this.boardStatus.boardIdx = this.boardStatus.realChacksoo.length - 1;
    this.isMove = false;
    this.movingStone = "";
    this.moveBefore = [];
    this.moveAfter = [];
    this.background = this.add.image(modalWidth/2, boardSize/2, "background").setScale(0.49)
      .setInteractive()
      .on('pointerup', () => {
        let prevChacksoo = JSON.parse(JSON.stringify(this.boardStatus.realChacksoo[this.boardStatus.boardIdx]));
        let cellX = parseInt((this.sys.game.input.mousePointer.y - 55)/64), cellY = parseInt((this.sys.game.input.mousePointer.x - 268)/64);
        // console.log(this.boardStatus.realChacksoo.length)
        if(this.isMove){
          // checked a stone
          this.moveAfter = [cellX, cellY];
          prevChacksoo[parseInt(this.moveBefore[0])*8 + parseInt(this.moveBefore[1])] = "0";
          prevChacksoo[cellX*8 + cellY] = this.movingStone;
          if(this.boardStatus.boardIdx === this.boardStatus.idxLen){
            this.boardStatus.realChacksoo.push(prevChacksoo);
            this.boardStatus.boardIdx++;
            this.boardStatus.idxLen++;
            console.log(this.moveBefore + ">" + this.moveAfter + " move" + this.movingStone);
          } else{
            // other idx
            this.boardStatus.realChacksoo[++this.boardStatus.boardIdx] = prevChacksoo;
            for(let i = this.boardStatus.boardIdx + 1; i<this.boardStatus.idxLen + 1; i++){
              // console.log("delete "+ i)
              this.boardStatus.realChacksoo.pop();
            }
            // console.log("realchack" + this.boardStatus.realChacksoo.length);
            this.boardStatus.idxLen = this.boardStatus.boardIdx;
            this.sliderDot.slider.value = 1;
            // console.log(this.boardStatus.boardIdx +',' + this.boardStatus.idxLen);
            // console.log(this.boardStatus.realChacksoo.length);
            // console.log(this.moveBefore + ">" + this.moveAfter + " move" + this.movingStone);
          }
          this.movingStone = 0;
          this.isMove = false;
        } else{
          // checking a stone
          if(prevChacksoo[cellX*8 + cellY] !== "0"){
            this.movingStone = prevChacksoo[cellX*8 + cellY];
            this.moveAfter = [];
            this.moveBefore = [cellX, cellY];
            this.isMove = true;
            // console.log("check a stone " + this.moveBefore + "stone:" + this.movingStone);
          } else{
            // check on non-stone area
            prevChacksoo[cellX*8 + cellY] = "1";
            if(this.boardStatus.boardIdx === this.boardStatus.idxLen){
              this.boardStatus.realChacksoo.push(prevChacksoo);
              this.boardStatus.boardIdx++;
              this.boardStatus.idxLen++;
              // console.log(this.boardStatus.realChacksoo[this.boardStatus.boardIdx]);
            } else{
              // other idx
              this.boardStatus.realChacksoo[++this.boardStatus.boardIdx] = prevChacksoo;
              for(let i = this.boardStatus.boardIdx + 1; i<this.boardStatus.idxLen + 1; i++){
                this.boardStatus.realChacksoo.pop();
              }
              // console.log("realchack" + this.boardStatus.realChacksoo.length);
              this.boardStatus.idxLen = this.boardStatus.boardIdx;
              this.sliderDot.slider.value = 1;
            }
          }
        }
        if(this.isMove === false){
          console.log("axios Post!!");
          let bodyData = {
            "problem": window.sessionStorage.getItem("SS_gameId"),
            "code": window.sessionStorage.getItem("SS_codeId"),
            "board_info": this.boardStatus.realChacksoo[this.boardStatus.realChacksoo.length - 1],
            "placement_info": this.moveAfter.length !== 0 ? this.moveBefore[0] + " " + this.moveBefore[1] + " > " + this.moveAfter[0] + " " + this.moveAfter[1] : JSON.stringify(cellX) + " " + JSON.stringify(cellY),
          }
          console.log(bodyData);
          console.log(header)
          axios.post(`http://203.246.112.32:8000/api/${version.version}/selfBattle/`, { headers: header,
          body: bodyData})
          .then((response) => {
            console.log(response)
            // this.boardStatus.isError = response.data.error_msg;
            // this.boardStatus.chacksoo = response.data.record.replace(/\n/gi, '').split(/ /);
            // for(let i = 0, chacksooIdx = 0; i < this.boardStatus.chacksoo.length; chacksooIdx++){
            //   let tempChacksoo = [];
            //   for(let j=0; j<64; j++){
            //     tempChacksoo.push(this.boardStatus.chacksoo[i++]);
            //   }
            //   this.boardStatus.realChacksoo.push(tempChacksoo);
            // }
            // this.boardStatus.boardIdx = this.boardStatus.realChacksoo.length - 1;
            // this.boardStatus.placement = response.data.placement_record.split(/\n/);
            // this.boardStatus.idxLen = this.boardStatus.realChacksoo.length - 1;
            // this.boardStatus.challengerId = response.data.challenger;
            // this.boardStatus.oppositeId = response.data.opposite;
          })
          .catch((error) => {
            console.log(error.response.status);
            console.log(error)
          });
          console.log("move before " + this.moveBefore);
          console.log("move after " + this.moveAfter);
          this.moveBefore = [];
          this.moveAfter = [];
        }
        // console.log(this.moveBefore);
      });
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
      value: 1
    });
    this.add.graphics()
            .lineStyle(3, 0xeec65b, 1)
            .strokePoints(this.sliderDot.slider.endPoints);
            
            // change isAuto value
            this.updateClickCountText = () => {
              this.clickButton.setText("Manual Mode", { font: '17px Arial' })
            }
            this.nextIdxText = () => {
              if(this.boardStatus.isAuto === false){
                if(this.boardStatus.boardIdx !== this.boardStatus.idxLen){
                  this.boardStatus.boardIdx += 1;
                  this.sliderDot.slider.value += 1/this.boardStatus.idxLen;
                }
              }
            }
            this.previousIdxText = () => {
              if(this.boardStatus.isAuto === false){
                if(this.boardStatus.boardIdx !== 0){
                  this.boardStatus.boardIdx -= 1;
                  this.sliderDot.slider.value -= 1/this.boardStatus.idxLen;
                }
              }
            }

    // auto manual button(text)
    this.clickButton = this.add.text(modalWidth/2 - 50, modalHeight - 110, `${this.boardStatus.isAuto} Mode`, { font: '17px Arial', fill: '#eec65b' });
    

    this.nextButton = this.add.text(this.sliderDot.slider.endPoints[1].x + 30, modalHeight - 60, "Next Button", { fill: '#eec65b' })
    .setInteractive()
    .on('pointerover', () => this.enterButtonHoverStateNext() )
    .on('pointerout', () => this.enterButtonRestStateNext() )
    .on('pointerdown', () => this.enterButtonActiveStateNext() )
    .on('pointerup', () => {
      this.nextIdxText();
      this.enterButtonHoverStateNext();
    });
    

    this.previousButton = this.add.text(this.sliderDot.slider.endPoints[0].x - 180, modalHeight - 60, "Previous Button", { fill: '#eec65b' })
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
    if(parseInt(window.localStorage.getItem('pk')) === this.boardStatus.challengerId){
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
    this.errMsg = this.add.text(modalWidth/2 - 300, 0, `${this.boardStatus.isError}`, { font: '15px Arial', fill: '#eec65b' });
  }
    
  
  update() {
    // console.log(this.boardStatus.boardIdx + ',' + this.boardStatus.idxLen + ',' + this.boardStatus.realChacksoo.length);
    
    // rotate the ships
    var children = this.blue_booGroup.getChildren();
    var children2 = this.pink_booGroup.getChildren();
    
    for (var i = 0; i < children.length; i++) {
      // // children[i].rotation += 0.1;
      children[i].setScale(0.091);
      children2[i].setScale(0.091);
      
      if(this.boardStatus.boardIdx <= this.boardStatus.idxLen){
        if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "0"){
          children[i].visible = false;
          children2[i].visible = false;
        }
        else if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "1"){
          children[i].visible = true;
          children2[i].visible = false;
        }
        else if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "-1"){
          children[i].visible = false;
          children2[i].visible = true;
        }
        else{
          children[i].visible = false;
          children2[i].visible = false;
        }
    }
      
    };

    if(this.boardStatus.boardIdx%2 === 0){
      // my turn
      if(this.boardStatus.placement[this.boardStatus.boardIdx] !== undefined){
        if(this.boardStatus.placement[this.boardStatus.boardIdx].charAt(4) === '>'){
          // my move
          this.myChacksoo.setText('이동\n ' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(0) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(2) + '>' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(6) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(8));
          if(this.boardStatus.boardIdx === 0){
            this.yourChacksoo.setText('착수\n 준비');
          }
        }
        else{
          // my chacksoo
          this.myChacksoo.setText('착수\n ' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(2) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(4));
          if(this.boardStatus.boardIdx === 0){
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
      if(this.boardStatus.placement[(this.boardStatus.boardIdx)] !== undefined){
        if(this.boardStatus.placement[(this.boardStatus.boardIdx)].charAt(4) === '>'){
          // your move
          this.yourChacksoo.setText('이동\n ' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(0) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(2) + '>' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(6) + ',' + this.boardStatus.placement[this.boardStatus.boardIdx].charAt(8));
        }
        else{
          // your chacksoo
          if(this.boardStatus.placement[this.boardStatus.boardIdx] !== undefined){
            this.yourChacksoo.setText('착수\n ' + this.boardStatus.placement[(this.boardStatus.boardIdx)].charAt(2) + ',' + this.boardStatus.placement[(this.boardStatus.boardIdx)].charAt(4));
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
    this.sliderDot.visible = true;
    this.boardStatus.boardIdx = parseInt(this.sliderDot.slider.value * this.boardStatus.idxLen + 0.00001);
  };
}

export default Scene2;