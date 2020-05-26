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
import Tab from './components/Tab';
import Ending from './components/endingCheckbox';





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
							새로운 조합으로 다양한 게임을 만들 수 있습니다.
							가이드에 맞춰 새로운 게임을 만들어 보세요!
		 				</span>
					</Typography>
				</FuseAnimate>

			</div>
			 
			 <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-8 sm:px-16 py-12">
			<Card>

				<div>
				<Typography className="text-20 sm:text-40 font-light" color="textPrimary" gutterBottom>
				돌 정보 입력하기
				</Typography>
				<Divider/>
				{
						(() => {
							return <Tab></Tab>
						})()
				}

				</div>
				<div>
				<Typography className="text-20 sm:text-40 font-light" color="textPrimary" gutterBottom>
				엔딩 정보 입력하기
				</Typography>
				<Divider/>
				{
					<Ending/>
				}
				</div>
			</Card>


			</div>
			<div className="mx-auto sm:px-256">
			<Link className="font-medium"
				onClick={console.log('ok')}
				to={'/apps/game/addgame2/'}>
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
					NEXT
     			</Button>
			</Link>
			</div>
		</div>


	);
}

export default Courses;
