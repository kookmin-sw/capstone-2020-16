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

	const [flag,setFlag] = useState(0);

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
		 				Add Game Page
		 				</span>
		 			</Typography>
		 		</FuseAnimate>
		
		 	</div>
			 
			 <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-8 sm:px-16 py-12">
			<Card>
				{/* <div>
					<Button variant="contained" color="primary"
					onClick={()=>{
						setFlag(1);
					}}
					>
					돌 1개
					</Button>
			　
					<Button variant="contained" color="primary"
					onClick={()=>{
						setFlag(2);
					}}
					>
					돌 2개
					</Button>
			　
					<Button variant="contained" color="primary"
					onClick={()=>{
						setFlag(3);
					}}
					>
					돌 3개
					</Button>
				　
					<Button variant="contained" color="primary"
					onClick={()=>{
						setFlag(4);
					}}
					>
					돌 4개
					</Button>
					</div> */}
				<Divider/>
				<div>
				{
						(() => {
							return <Tab></Tab>
						})()
				}

				</div>	
			</Card>


			</div>
		
		</div>


	);
}

export default Courses;
