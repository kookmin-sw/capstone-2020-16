import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from 'app/store/actions';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import SetPieceTab from './components/SetPieceTab';





const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	}
}));

// const useStyles2 = makeStyles({
// 	table: {
// 	  minWidth: 650,
// 	},
//   });





function Courses(props) {


	const classes = useStyles(props);
	var header = {
		'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
	}


	

	
		
	return(
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">

			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-24 sm:text-40 font-light">
						Add Game
		 			</Typography>
				</FuseAnimate>
				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
						<span className="opacity-75">
							게임 설정 값을 확인하시고, 게임 정보를 입력 후 제출해주세요!
		 				</span>
					</Typography>
				</FuseAnimate>

			</div>
			 
			 <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-8 sm:px-16 py-12">
			<Card>

				<div>
				{
						(() => {
							return <SetPieceTab/>
						})()
				}

				</div>	
			</Card>


			</div>
			<div className="mx-auto sm:px-256">
			<Link className="font-medium"
				to={'/apps/game/addgame'}>
				<Button
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						paddingLeft: 30,
						paddingRight: 30,
						marginBottom: 24,
						height: 40
					}}
					variant="contained"
					color="primary">
					PREVIOUS
     			</Button>
			</Link>
			　
			<Link className="font-medium"
				to={'/apps/game/addgame'}>
				<Button
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						paddingLeft: 40,
						paddingRight: 40,
						marginBottom: 24,
						height: 40
					}}
					variant="contained"
					color="primary">
					POST
     			</Button>
			</Link>
			</div>
		</div>


	);
}

export default Courses;
