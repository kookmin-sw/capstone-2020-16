import React from 'react';
import { IonPhaser } from '@ion-phaser/react'
import Scene1 from './Scene1.js'
import Scene2 from './Scene2.js'

function ClassicSearchPage() {
	const game = {
		width: 896,
		height: 896,
		backgroundColor: 0x000000,
		scene: [Scene1, Scene2],
		pixelArt: true
	}

	return (
		<IonPhaser game={game} />
	);
}

export default ClassicSearchPage;