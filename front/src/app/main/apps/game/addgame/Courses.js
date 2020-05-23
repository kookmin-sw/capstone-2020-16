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

sessionStorage.setItem("pieceType1", "-");
sessionStorage.setItem("startType1", "-");
sessionStorage.setItem("distance1", "-");
sessionStorage.setItem("customDistance1", "-");
sessionStorage.setItem("actionType1", "-");
sessionStorage.setItem("actionCondition1", "-");
sessionStorage.setItem("actionDirection1", "-");

sessionStorage.setItem("pieceType2", "-");
sessionStorage.setItem("startType2", "-");
sessionStorage.setItem("distance2", "-");
sessionStorage.setItem("customDistance2", "-");
sessionStorage.setItem("actionType2", "-");
sessionStorage.setItem("actionCondition2", "-");
sessionStorage.setItem("actionDirection2", "-");

sessionStorage.setItem("pieceType3", "-");
sessionStorage.setItem("startType3", "-");
sessionStorage.setItem("distance3", "-");
sessionStorage.setItem("customDistance3", "-");
sessionStorage.setItem("actionType3", "-");
sessionStorage.setItem("actionCondition3", "-");
sessionStorage.setItem("actionDirection3", "-");

sessionStorage.setItem("pieceType4", "-");
sessionStorage.setItem("startType4", "-");
sessionStorage.setItem("distance4", "-");
sessionStorage.setItem("customDistance4", "-");
sessionStorage.setItem("actionType4", "-");
sessionStorage.setItem("actionCondition4", "-");
sessionStorage.setItem("actionDirection4", "-");


function createData( piece, pieceType, startType, distance,customDistance, actionType, actionCondition, actionDirection) {
	return { piece, pieceType, startType, distance, customDistance, actionType, actionCondition, actionDirection };
}

const rows = [
	createData('첫번 째 돌',
		sessionStorage.getItem("pieceType1", "-"),
		sessionStorage.getItem("startType1", "-"),
		sessionStorage.getItem("distance1", "-"),
		sessionStorage.getItem("customDistance1", "-"),
		sessionStorage.getItem("actionType1", "-"),
		sessionStorage.getItem("actionCondition1", "-"),
		sessionStorage.getItem("actionDirection1", "-")
		),
	createData('두번 째 돌', 				
		sessionStorage.getItem("pieceType2", "-"),
		sessionStorage.getItem("startType2", "-"),
		sessionStorage.getItem("distance2", "-"),
		sessionStorage.getItem("customDistance2", "-"),
		sessionStorage.getItem("actionType2", "-"),
		sessionStorage.getItem("actionCondition2", "-"),
		sessionStorage.getItem("actionDirection2", "-")
	),
	createData('세번 째 돌', 		
		sessionStorage.getItem("pieceType3", "-"),
		sessionStorage.getItem("startType3", "-"),
		sessionStorage.getItem("distance3", "-"),
		sessionStorage.getItem("customDistance3", "-"),
		sessionStorage.getItem("actionType3", "-"),
		sessionStorage.getItem("actionCondition3", "-"),
		sessionStorage.getItem("actionDirection3", "-")
	),
	createData('네번 째 돌', 		
		sessionStorage.getItem("pieceType4", "-"),
		sessionStorage.getItem("startType4", "-"),
		sessionStorage.getItem("distance4", "-"),
		sessionStorage.getItem("customDistance4", "-"),
		sessionStorage.getItem("actionType4", "-"),
		sessionStorage.getItem("actionCondition4", "-"),
		sessionStorage.getItem("actionDirection4", "-")
	),
];


function Courses(props) {

	const [flag,setFlag] = useState(0);

	const classes = useStyles(props);
	var header = {
		'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
	}


	const classes2 = useStyles2();

	
		
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
						<Table className={classes2.table} aria-label="caption table">
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
									<TableRow key={row.piece}>
										<TableCell component="th" scope="row">
											{row.piece}
										</TableCell>
										<TableCell align="right">{row.pieceType}</TableCell>
										<TableCell align="right">{row.startType}</TableCell>
										<TableCell align="right">{row.distance}</TableCell>
										<TableCell align="right">{row.customDistance}</TableCell>
										<TableCell align="right">{row.actionType}</TableCell>
										<TableCell align="right">{row.actionCondition}</TableCell>
										<TableCell align="right">{row.actionDirection}</TableCell>
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
