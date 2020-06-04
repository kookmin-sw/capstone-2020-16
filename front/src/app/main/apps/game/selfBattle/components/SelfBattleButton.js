import React from 'react';
import { IonPhaser } from '@ion-phaser/react'
import Scene1 from './Scene1.js'
import Scene2 from './Scene2.js'
import Scene3 from './Scene3.js'
import Scene4 from './Scene4.js'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';



function getModalStyle() {
	const top = 50 ;
	const left = 50 ;
  
	return {
	  top: `${top}%`,
	  left: `${left}%`,
	  transform: `translate(-${top}%, -${left}%)`,
	};
}
const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		// width: 400,
		backgroundColor: theme.palette.background.paper,
		// border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function SelfBattleButton(props) {
	// temp game_id edit here!!!!!!!!!!!!!!!!!!!!!!!!!!
	window.localStorage.setItem('game_id', 1959);
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const [game, setGame] = React.useState({
		width: 1050,
		height: 700,
		backgroundColor: 0x192d3f,
		scene: [Scene1, Scene2],
		pixelArt: true,
	})
	
	const handleOpen = () => {
		console.log(props.gameId);
		if(props.gameId === 3){
			setGame({
				width: 1050,
				height: 700,
				backgroundColor: 0x192d3f,
				scene: [Scene3, Scene4],
				pixelArt: true,
			})
		} else{
			setGame({
				width: 1050,
				height: 700,
				backgroundColor: 0x192d3f,
				scene: [Scene1, Scene2],
				pixelArt: true,
			})
		}
		console.log(game)
		window.localStorage.setItem('game_id', 1959);
		setOpen(true);
	};
	
	const handleClose = () => {
		window.localStorage.removeItem('game_id')
		setOpen(false);
	};
	
	return (
		<div>
			<IconButton onClick={handleOpen} component="span">
				<h3>{"self battle"}</h3>
			</IconButton>
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
			>
				<div style={modalStyle} className={classes.paper}>
					<IonPhaser game={game}/>
				</div>
			</Modal>
		</div>
	);
}

export default SelfBattleButton;