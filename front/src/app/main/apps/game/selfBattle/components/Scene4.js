import Phaser from 'phaser'
import axios from 'axios'

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

class Scene4 extends Phaser.Scene {
  constructor() {
    super("playGame");
    this.boardStatus = {};
    }
  
    create() {
      this.boardStatus = {
        chacksoo: [],
        placement: "",
        challengerPlacement:[],
        oppositePlacement:[],
        realChacksoo: [["0","0","0","-2","-1","0","0","0","0","0","0","-3","-3","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","3","3","0","0","0","0","0","0","1","2","0","0","0"]],
        boardIdx: 0,
        isAuto: false,
        idxLen : 0,
        gameStatus: "",
        errMsg: "",
        winner: "",
        challengerId: 0,
        oppositeId: 0,
        idxIncrement: false,
        isLoading: false,
      }
      this.iter = 0; // used for itarations
      this.boardStatus.boardIdx = this.boardStatus.realChacksoo.length - 1;
      this.isMove = false;
      this.movingStone = "";
      this.moveBefore = [];
      this.moveAfter = [];
      this.background = this.add.image(modalWidth/2, boardSize/2, "background").setScale(0.49)
        .setInteractive()
        .on('pointerup', () => {
          if(this.boardStatus.boardIdx % 3 === 0){
            let prevChacksoo = JSON.parse(JSON.stringify(this.boardStatus.realChacksoo[this.boardStatus.boardIdx]));
            let cellX = parseInt((this.sys.game.input.mousePointer.y - 55)/64), cellY = parseInt((this.sys.game.input.mousePointer.x - 268)/64);
            if(prevChacksoo[cellX*8 + cellY] === "0" && this.isMove === false){
              alert("거기는 빈 곳입니다.");
            } else{
            if(this.isMove){
              // checked a stone
              this.moveAfter = [cellX, cellY];
              prevChacksoo[parseInt(this.moveBefore[0])*8 + parseInt(this.moveBefore[1])] = "0";
              prevChacksoo[cellX*8 + cellY] = this.movingStone;
              if(this.boardStatus.boardIdx === this.boardStatus.idxLen){
                this.boardStatus.realChacksoo.push(prevChacksoo);
                this.boardStatus.boardIdx++;
                this.boardStatus.idxLen++;
              } else{
                // other idx
                this.boardStatus.realChacksoo[++this.boardStatus.boardIdx] = prevChacksoo;
                for(let i = this.boardStatus.boardIdx + 1, j=0; i<this.boardStatus.idxLen + 1; i++, j++){
                  this.boardStatus.realChacksoo.pop();
                  if(j%2 === 0){
                    this.boardStatus.challengerPlacement.pop();
                    this.boardStatus.oppositePlacement.pop();
                  }
                }

                if(this.boardStatus.gameStatus === "challenger_error" || this.boardStatus.gameStatus === "opposite_error"){
                  this.boardStatus.challengerPlacement.pop();
                }

                this.boardStatus.idxLen = this.boardStatus.boardIdx;
                this.sliderDot.slider.value = 1;
              }

              this.isMove = false;
            } else{
              // checking a stone
              if(prevChacksoo[cellX*8 + cellY] !== "0"){
                this.movingStone = prevChacksoo[cellX*8 + cellY];
                this.moveBefore = [cellX, cellY];
                this.isMove = true;
                // console.log("check a stone " + this.moveBefore + "stone:" + this.movingStone);
              }
            }
            if(this.isMove === false){
              let boardInfo = "";
              for(let i=0; i<64; i++){
                if(i===63){
                  boardInfo += this.boardStatus.realChacksoo[this.boardStatus.realChacksoo.length - 2][i];
                } else{
                  boardInfo += this.boardStatus.realChacksoo[this.boardStatus.realChacksoo.length - 2][i] + " ";
                }
              }
              let bodyData = {
                "problem": window.sessionStorage.getItem("SS_gameId"),
                "code": window.sessionStorage.getItem("SS_codeId"),
                "board_info": boardInfo,
                "placement_info": this.moveAfter.length !== 0 ? this.moveBefore[0] + " " + this.moveBefore[1] + " > " + this.moveAfter[0] + " " + this.moveAfter[1] :this.movingStone + " " + JSON.stringify(cellX) + " " + JSON.stringify(cellY),
              };
              this.boardStatus.challengerPlacement.push(bodyData.placement_info);
              
              this.boardStatus.isLoading = true;
              axios.post(`http://203.246.112.32:8000/api/${version.version}/selfBattle/`, bodyData, { headers: header})
              .then((response) => {
                console.log(response)
                this.boardStatus.isLoading = false;
                this.boardStatus.gameStatus = response.data.result;
                if(response.data.placement_code !== null){
                  this.boardStatus.oppositePlacement.push(response.data.placement_code);
                }
                this.boardStatus.chacksoo = response.data.board_record.replace(/\n/gi, '').split(/ /);
                
                if(response.data.result === "finish"){
                  this.boardStatus.winner = response.data.winner;
                } else if(response.data.result === "challenger_error"){
                  this.boardStatus.errMsg = "challenger_error";
                } else if(response.data.result === "opposite_error"){
                  this.boardStatus.errMsg = "opposite_error";
                } else{
                  this.boardStatus.errMsg = "";
                }
                this.boardStatus.chacksoo.pop();
                
                for(let i = 0, chacksooIdx = 0; i < this.boardStatus.chacksoo.length; chacksooIdx++){
                  let tempChacksoo = [];
                  for(let j=0; j<64; j++){
                    tempChacksoo.push(this.boardStatus.chacksoo[i++]);
                  }
                  this.boardStatus.realChacksoo.push(tempChacksoo);
                }

                this.boardStatus.boardIdx = this.boardStatus.realChacksoo.length - 1;
                this.boardStatus.placement = response.data.placement_code.split(/\n/);
                this.boardStatus.idxLen = this.boardStatus.realChacksoo.length - 1;
              })
              .catch((error) => {
                console.log(error)
              });

              this.moveBefore = [];
              this.moveAfter = [];
            }
          }
          } else{
            alert("not your turn");
          }
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
      // console.log('같다')
      this.me = this.add.image((modalWidth-boardSize)/4,100,"me").setScale(0.07);
      this.you = this.add.image(modalWidth - (modalWidth-boardSize)/4,100,"you").setScale(0.07);
      this.myName = this.add.text((modalWidth-boardSize)/4 - 30, 5, '나', { font: '34px Arial', fill: '#eec65b' });
      this.yourName = this.add.text(modalWidth - (modalWidth-boardSize)/4 - 35, 5, '상대방', { font: '34px Arial', fill: '#eec65b' });
      
      
      this.myChacksoo = this.add.text(60, 160, '', { font: '34px Arial', fill: '#eec65b' });
      this.yourChacksoo = this.add.text(modalWidth - 160, 160, '', { font: '34px Arial', fill: '#eec65b' });
      
      // make a group of ships
      this.pawn_1 = this.make.group({
        key: "pawn_1",
        frameQuantity: 64,
        max: 64
      });
      
      this.pawn_2 = this.make.group({
        key: "pawn_2",
        frameQuantity: 64,
        max: 64
      });
      this.look_1 = this.make.group({
        key: "look_1",
        frameQuantity: 64,
        max: 64
      });
      
      this.look_2 = this.make.group({
        key: "look_2",
        frameQuantity: 64,
        max: 64
      });
      this.king_1 = this.make.group({
        key: "king_1",
        frameQuantity: 64,
        max: 64
      });
      
      this.king_2 = this.make.group({
        key: "king_2",
        frameQuantity: 64,
        max: 64
      });
      
      // align the group of ships in a grid
      Phaser.Actions.GridAlign(this.pawn_1.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 65,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -180,
        y: -395
      });
      
      Phaser.Actions.GridAlign(this.pawn_2.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 65,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -180,
        y: -395
      });
      Phaser.Actions.GridAlign(this.look_1.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 65,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -180,
        y: -395
      });
      
      Phaser.Actions.GridAlign(this.look_2.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 65,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -180,
        y: -395
      });
      Phaser.Actions.GridAlign(this.king_1.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 65,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -180,
        y: -395
      });
      
      Phaser.Actions.GridAlign(this.king_2.getChildren(), {
        // 가로 세로 갯수
        width: 8,
        height: 8,
        // 이미지 하나 당 공간
        cellWidth: 65,
        cellHeight: 64,
        // 이미지 시작 지점
        position: Phaser.Display.Align.TOP_LEFT,
        x: -180,
        y: -395
      });
      
      // slider value65b' });
      this.gameStatus = this.add.text(modalWidth/2 - 300, 0, "", { font: '30px Arial', fill: '#eec65b' });
      this.spinner = this.add.image(modalWidth/2, modalHeight/2 ,"spinner").setScale(0.2);
    }
    
  
    update() {
      // spinner
      if(this.boardStatus.isLoading === false){
        this.spinner.visible = false;
      } else{
        this.spinner.visible = true;
        this.spinner.rotation += 0.05;
      }
      // rotate the ships
      let children = this.pawn_1.getChildren();
      let children2 = this.pawn_2.getChildren();
      let children3 = this.look_1.getChildren();
      let children4 = this.look_2.getChildren();
      let children5 = this.king_1.getChildren();
      let children6 = this.king_2.getChildren();
      
      for (var i = 0; i < children.length; i++) {
        // // children[i].rotation += 0.1;
        children[i].setScale(0.081);
        children2[i].setScale(0.081);
        children3[i].setScale(0.081);
        children4[i].setScale(0.081);
        children5[i].setScale(0.081);
        children6[i].setScale(0.081);
        
        if(this.boardStatus.boardIdx <= this.boardStatus.idxLen){
          if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "0"){
            children[i].visible = false;
            children2[i].visible = false;
            children3[i].visible = false;
            children4[i].visible = false;
            children5[i].visible = false;
            children6[i].visible = false;
          }
          else if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "3"){
            children[i].visible = true;
            children2[i].visible = false;
            children3[i].visible = false;
            children4[i].visible = false;
            children5[i].visible = false;
            children6[i].visible = false;
          }
          else if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "-3"){
            children[i].visible = false;
            children2[i].visible = true;
            children3[i].visible = false;
            children4[i].visible = false;
            children5[i].visible = false;
            children6[i].visible = false;
          }
          else if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "2"){
            children[i].visible = false;
            children2[i].visible = false;
            children3[i].visible = true;
            children4[i].visible = false;
            children5[i].visible = false;
            children6[i].visible = false;
          }
          else if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "-2"){
            children[i].visible = false;
            children2[i].visible = false;
            children3[i].visible = false;
            children4[i].visible = true;
            children5[i].visible = false;
            children6[i].visible = false;
          }
          else if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "1"){
            children[i].visible = false;
            children2[i].visible = false;
            children3[i].visible = false;
            children4[i].visible = false;
            children5[i].visible = true;
            children6[i].visible = false;
          }
          else if(this.boardStatus.realChacksoo[this.boardStatus.boardIdx][i] === "-1"){
            children[i].visible = false;
            children2[i].visible = false;
            children3[i].visible = false;
            children4[i].visible = false;
            children5[i].visible = false;
            children6[i].visible = true;
          }
          else{
            children[i].visible = false;
            children2[i].visible = false;
            children3[i].visible = false;
            children4[i].visible = false;
            children5[i].visible = false;
            children6[i].visible = false;
          }
      }
        
      };

      // placement info
      if(this.boardStatus.boardIdx%3 === 1){
        if(this.boardStatus.challengerPlacement[parseInt((this.boardStatus.boardIdx-1)/3)] !== undefined){
          if(this.boardStatus.challengerPlacement[parseInt((this.boardStatus.boardIdx-1)/3)].length > 6){
            this.myChacksoo.setText(this.boardStatus.challengerPlacement[parseInt((this.boardStatus.boardIdx-1)/3)]);
          } else{
            let moveInfo = this.boardStatus.challengerPlacement[parseInt((this.boardStatus.boardIdx-1)/3)][2] + "," + this.boardStatus.challengerPlacement[parseInt((this.boardStatus.boardIdx-1)/3)][4];
            this.myChacksoo.setText(moveInfo);
          }
        } else{
          this.myChacksoo.setText("0,0");
        }
        this.yourChacksoo.setText("ready");
      } else if(this.boardStatus.boardIdx%3 === 0 && this.boardStatus.boardIdx > 0){
        if(this.boardStatus.oppositePlacement[parseInt((this.boardStatus.boardIdx-2)/3)] !== undefined){
          if(this.boardStatus.oppositePlacement[parseInt((this.boardStatus.boardIdx-2)/3)].length > 6){
            this.yourChacksoo.setText(this.boardStatus.oppositePlacement[parseInt((this.boardStatus.boardIdx-2)/3)]);
          } else{
            let moveInfo = this.boardStatus.oppositePlacement[parseInt((this.boardStatus.boardIdx-2)/3)][2] + "," + this.boardStatus.oppositePlacement[parseInt((this.boardStatus.boardIdx-2)/3)][4];
            this.yourChacksoo.setText(moveInfo);
          }
        } else{
          this.yourChacksoo.setText("0,0");
        }
        this.myChacksoo.setText("ready");
        // this.yourChacksoo.setText(this.boardStatus.oppositePlacement);
      } else if(this.boardStatus.boardIdx === 0){
        this.myChacksoo.setText("ready");
        this.yourChacksoo.setText("ready");
      } else{
        this.myChacksoo.setText("action");
        this.yourChacksoo.setText("action");
      }
      
      // game status
      if(this.boardStatus.gameStatus === "finish"){
        this.gameStatus.setText("winner is " + this.boardStatus.winner);
      } else if(this.boardStatus.gameStatus === "not finish"){
        this.gameStatus.setText("not finish");
      } else{
        this.gameStatus.setText(this.boardStatus.errMsg);
      }

      // increment the iteration
      this.iter += 0.001;
      this.sliderDot.visible = true;
      this.boardStatus.boardIdx = parseInt(this.sliderDot.slider.value * this.boardStatus.idxLen + 0.00001);
    };
  }
  
  export default Scene4;