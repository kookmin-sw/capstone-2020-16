import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
// import _ from '@lodash';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';
// import CardContent from '@material-ui/core/CardContent';
// import FormControl from '@material-ui/core/FormControl';
// import Icon from '@material-ui/core/Icon';
// import InputLabel from '@material-ui/core/InputLabel';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import MenuItem from '@material-ui/core/MenuItem';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from 'app/store/actions';
// import reducer from 'app/store/reducers';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
// import getProblemId from '../store/reducers/getProblemId.reducer';

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
	// const add = '/apps/game/viewReplay/ViewReplayPage';
	
	const id = useSelector(({getProblemId}) => getProblemId.getId.count);
	const getId = function() {

		dispatch(Actions.getProblemId())
		
    }

	const classes = useStyles(props);



	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// 여기가 componentDidMount에 해당
		axios
		  .get('http://203.246.112.32:8000/api/v1/problem/')
		  .then(response => {
			// console.log(response.data);
			// console.log(response.headers);
			// console.log(response.status);
	
			setPosts(response.data.results);
			const fetchCount = () => {
				const countData = getId
				countData();
			}
			fetchCount()
  
			return () => {
			  
			  // 여기가 componentWillUnmount에 해당
			};
		  })
		  .catch(error => {
			console.log(error);
		  });
	
		}, []);
	


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
					Game List
					</Typography>
				</FuseAnimate>
				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
						<span className="opacity-75">
						Welcome to Single Mode. Choose a Game to Play!
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
										<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.title}>
											<Card elevation={1} className="flex flex-col h-256">
												<div
													className="flex flex-shrink-0 items-center justify-between px-24 h-64"
												>
													<Typography className="font-medium truncate" color="inherit">
														{course.title}
													</Typography>
													
				
												</div>
												<CardMedia className="flex items-center justify-center">
													<img src={course.thumbnail} width='200' alt='thumbnail'></img>
												</CardMedia>
											
												<Divider />
												<CardActions className="justify-center">
												<Link className="font-medium" to="/apps/game/viewProblem/ViewProblemPage">
													 <button onClick={getId}			
													> <h3>START</h3>
													 {console.log(id)}</button>
													 </Link>
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

// export default withReducer('academyApp', reducer)(Courses);
export default Courses;