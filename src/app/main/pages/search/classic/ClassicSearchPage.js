import React from 'react';
import { IonPhaser } from '@ion-phaser/react'
import Scene1 from './Scene1.js'
import Scene2 from './Scene2.js'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import pink from '@material-ui/core/colors/pink';

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

function ClassicSearchPage() {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	  
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	
	const game = {
		width: 896,
		height: 896,
		backgroundColor: 0x000000,
		scene: [Scene1, Scene2],
		pixelArt: true
	}

	return (
		<div>
			<IconButton onClick={handleOpen} component="span">
				<PlayCircleFilledWhiteIcon style={{ color: pink[500] }}/>
			</IconButton>
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
			>
				<div style={modalStyle} className={classes.paper}>
					<IonPhaser game={game} />
				</div>
			</Modal>
		</div>
	);
}

export default ClassicSearchPage;