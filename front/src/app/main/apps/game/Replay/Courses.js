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
// import { Link } from 'react-router-dom';
// import * as Actions from 'app/store/actions';
// import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
import ViewReplayPage from '../viewReplay/ViewReplayPage';


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

	const dispatch = useDispatch();
	

	const classes = useStyles(props);

	var header = {
		'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
	  }

	 const pk = window.localStorage.getItem('pk');
	//  console.log(pk);

	const [posts, setPosts] = useState([]);

	useEffect(() => {



		axios
		.get(`http://203.246.112.32:8000/api/v1/game/my`, { headers:header })
		  .then(response => {

			setPosts(response.data);
			//   console.log(response.data);
			  

			//    console.log(response.data.challenger_name);
		  })
		},[dispatch]);

	
	// function getProblemName(problemID){

	// 	if(problemID === 1){
	// 		return '세균전'
	// 	}
	// 	else if(problemID === 2){
	// 		return '세균전 추가모드'
	// 	}
	// 	else{
	// 		return '알 수 없음 '
	// 	}
		
	// }



	function getOppositeName(challenger_name, opposite_name){
		
		if(challenger_name === window.localStorage.getItem("username")){
			return opposite_name;
		}
		else if(opposite_name === window.localStorage.getItem("username")){
			return challenger_name;
		}
		else{
			return 'Unknown';
		}
		

	}

	function getGameTime(game_date){

		var date = game_date.split("."); 
		return date[0];
	}

	function getWinner(challenger, opposite, winner){
		
		if(challenger === parseInt(window.localStorage.getItem("pk")) && winner === "challenger"){
			return 'WIN!';
		}
		else if(opposite === parseInt(window.localStorage.getItem("pk")) && winner === "opposite"){
			return 'WIN!';
		}
		else if(challenger === parseInt(window.localStorage.getItem("pk")) && winner === "opposite"){
			return 'LOSE!';
		}
		else if(opposite === parseInt(window.localStorage.getItem("pk")) && winner === "challenger"){
			return 'LOSE!';
		}
		else{
			return 'Draw!';
		}
		

	}

	function getScoreFlu(challenger_name, opposite_name, challenger_score_flu, opposite_score_flu){
		
		if(challenger_name ===  parseInt(window.localStorage.getItem("pk"))){
			if(challenger_score_flu > 0){
				return '+' + challenger_score_flu;
			} else{
			return challenger_score_flu;
			}
		}
		else if(opposite_name ===  parseInt(window.localStorage.getItem("pk"))){
			if(opposite_score_flu > 0){
				return '+' + opposite_score_flu;
			} else{
			return opposite_score_flu;
			}
		}
		else{
			return '변동없음';
		}
		

	}
	
		

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">
			
			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-24 sm:text-40 font-light">
					Replay List
					</Typography>
				</FuseAnimate>
				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
						<span className="opacity-75">
						You can see your battle record with replay display
						</span>
					</Typography>
				</FuseAnimate>
		
			</div>
			<div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
		
							<FuseAnimateGroup
								enter={{
									animation: 'transition.slideUpBigIn'
								}}
								className="flex flex-wrap py-24"
							>
								{posts.map(course => {
									// const category = posts.find(_cat => _cat.value === course.title);
									return (
										<div className="w-full pb-24 sm:w-1/9 sm:p-16" key={course.id}>
											<Card elevation={1} className="flex flex-col h-128">
												<div
													className="flex flex-shrink-0 items-center justify-between px-24 h-64"
												>
													<Typography className="font-medium truncate" color="primary">
														<h2>{`${course.title} 대전기록 vs ${getOppositeName(course.challenger_name, course.opposite_name)}`}</h2>
														<h3>{`게임시각 : ${getGameTime(course.date)}`}</h3>
														{/* {console.log(course.problem)} */}
													</Typography>
													<Typography className="font-medium truncate" color="inherit">
														<h2>{ `대전결과 : ${getWinner(course.challenger, course.opposite, course.winner)}`}</h2>
														<h3>{`점수변동 : ${getScoreFlu(course.challenger, course.opposite, course.challenger_score_flu, course.opposite_score_flu)}`}</h3>
													</Typography>
													
				
												</div>

												<Divider />
												<CardActions className="justify-center">
													{/* <h3>{"리플레이 보기"}</h3> */}
													<ViewReplayPage tmp_id={course.id}/>
													{/* <td align="left"><span className="prop-name required">children&nbsp;*</span></td> */}
												</CardActions>
												
											</Card>
										</div>
									);
								})}
							</FuseAnimateGroup>
						  
			</div>
		</div>
	);
}

export default Courses;
