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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




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

const useStyles2 = makeStyles({
	table: {
	  minWidth: 650,
	},
  });




function createData(name, calories, fat, carbs, protein, a, b, c) {
	return { name, calories, fat, carbs, protein, a, b, c };
}

const rows = [
	createData('첫번 째 돌', 159, 6.0, 24, 4.0, 4, 4, 4),
	createData('두번 째 돌', 237, 9.0, 37, 4.3, 4, 4, 4),
	createData('세번 째 돌', 262, 16.0, 24, 6.0, 4, 4, 4),
	createData('네번 째 돌', 262, 16.0, 24, 6.0, 4, 4, 4),
];


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
						 새로운 조합으로 다양한 게임을 만들 수 있습니다.
						 가이드에 맞춰 새로운 게임을 만들어 보세요!
		 				</span>
		 			</Typography>
		 		</FuseAnimate>
		
		 	</div>
			 
			 <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-8 sm:px-16 py-12">
			<Card>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="caption table">
							<caption>현재 설정한 돌의 정보를 볼 수 있습니다.</caption>
							<TableHead>
								<TableRow>
									<TableCell>돌</TableCell>
									<TableCell align="right">돌 종류</TableCell>
									<TableCell align="right">착수 방식</TableCell>
									<TableCell align="right">거리 설정</TableCell>
									<TableCell align="right">커스텀 거리 설정</TableCell>
									<TableCell align="right">액션 종류 설정</TableCell>
									<TableCell align="right">액션 조건 설정</TableCell>
									<TableCell align="right">액션 방향 설정</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.calories}</TableCell>
										<TableCell align="right">{row.fat}</TableCell>
										<TableCell align="right">{row.carbs}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
										<TableCell align="right">{row.a}</TableCell>
										<TableCell align="right">{row.b}</TableCell>
										<TableCell align="right">{row.c}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
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
