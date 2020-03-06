import React from 'react';
import Phaser from 'phaser'

function ClassicSearchPage() {
	const config= {
		width: 896,
		height: 896,
		backgroundColor: 0x000000,
		scene: [Scene1, Scene2],
		pixelArt: true
	};
	const game = new Phaser.Game(config);
	function constructor() {
		super("bootGame");
	};
	function preload() {
		this.load.image("background", "assets/images/board.jpg");
		this.load.image("ship", "assets/images/ship.png");
		this.load.image("saitama", "assets/images/saitama2.png");
		this.load.image("garow", "assets/images/garow.png");
	};
	function create() {
		this.add.text(20, 20, "Loading game...");
		this.scene.start("playGame");

		this.iter = 0; // used for itarations

		// add the background in the center of the scene
		this.background = this.add.image(0, 0, "background").setScale(0.7);
		this.background.setOrigin(0.5, 0.5);
		this.background.x = config.width/2;
		this.background.y = config.height/2;

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
	};

	function update() {

		// rotate the ships
		var children = this.saitamaGroup.getChildren();
		var children2 = this.garowGroup.getChildren();
		for (var i = 0; i < children.length; i++) {
		  // children[i].rotation += 0.1;
		  children[i].setScale(0.18);
		  children2[i].setScale(0.18);
	
		  if(i%2 === 0){
			children[i].visible = true;
			children[i].x = children[i].x + Math.cos(this.iter * 10) * 10;
			children2[i].visible = false;
		  }
		  else {
			children[i].visible = false;
			children2[i].x = children2[i].x - Math.cos(this.iter * 10) * 10;
			children2[i].visible = true;
		  }
		}
	
		// increment the iteration
		this.iter += 0.01;
	
	}
	return (
		<div classname="webGL">
			<div>
				
			</div>
		</div>
	);
}

export default ClassicSearchPage;
