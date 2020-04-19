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
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from 'app/store/actions';
// import reducer from 'app/store/reducers';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
// import getProblemId from '../store/reducers/getProblemId.reducer';
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
	
	// const count = useSelector(({getProblemId}) => getProblemId.getId.results);
	// const getId = (param) => {

	// 	dispatch(Actions.getProblemId(param))
		

	// const count = useSelector(({getProblemId}) => getProblemId.getId.results[0]);
	// console.log(count)

	const classes = useStyles(props);

	var header = {
		'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
	  }

	 const pk = window.localStorage.getItem('pk');
	 console.log(pk);

	const [posts, setPosts] = useState([]);

	useEffect(() => {

		axios
		.get(`/api/v1/game/my`, { headers:header })
		  .then(response => {

			   setPosts(response.data);
			//    console.log(response.data);
		  })
		},[dispatch]);
	
		

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
					Replay Mode
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
										<div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.title}>
											<Card elevation={1} className="flex flex-col h-256">
												<div
													className="flex flex-shrink-0 items-center justify-between px-24 h-64"
												>
													<Typography className="font-medium truncate" color="inherit">
														{`Vs Anonymous User ${course.opposite}`}
													</Typography>
													
				
												</div>
												<CardMedia className="flex items-center justify-center">
												<img src={`assets/images/games/3.jpg`} width='150' alt='thumbnail'></img>
												</CardMedia>
												
												<Divider />
												<CardActions className="justify-center">
													<ViewReplayPage tmp_id={course.id}/>
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
