import FuseAnimate from '@fuse/core/FuseAnimate';
	import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SetPieceTab from './components/SetPieceTab';



function problemPost(userId, problemTitle, problemDescription, limitTime, limitMemory, problemImg, boardInfo, rule){
	var header = {
	  'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token')
	}



	
	var data = {
	  editor: userId,
	  title: problemTitle,
	  description: problemDescription,
	  limit_time: limitTime,
	  limit_memory: limitMemory,
	  thumbnail: problemImg,
	  board_info: boardInfo,
	  rule: rule

	}
  
	axios.post("https://cors-anywhere.herokuapp.com/http://203.246.112.32:8000/api/v1/problem/", data, {
	  headers: header
	})
	.then( response => {
		alert(response);
	  	console.log(response);
	})
	.catch(error => {
		alert(error);
	  	console.log(error);
	})
  }



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


	const [title, setTitle] = useState("");
	// const [discription, setDiscription] = useState();
	// const [img, setImg] = useState();
	const [board, setBoard] = useState("");
	const [limitTime, setLimitTime] = useState(0);
	const [limitMemory, setLimitMemory] = useState(0);

	const titleChange = (event) => {
		setTitle(event.target.value);
	};

	// const discriptionChange = (event) => {
	// 	setDiscription(event.target.value);
	// };
	
	const limitTimeChange = (event) => {
		setLimitTime(event.target.value);
	};
	
	const limitMemoryChange = (event) => {
		setLimitMemory(event.target.value);
	};

	const boardChange = (event) => {
		setBoard(event.target.value);
	};

	const [state,setState] = useState(null);
	const [state2,setState2] = useState(null);
	
	const handleFileInput = (event) => {
		setState(event.target.value);
	}
	
	 const handleFileInput2 = (event) => {
		setState2(event.target.value);
	}
	
	const handlePost = (event) => {
		const formData = new FormData();
		formData.append('file', event.selectedFile);
	}

	const handlePost2 = (event) => {
		const formData2 = new FormData();
		formData2.append('file', event.selectedFile);
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
			<Typography className="text-20 sm:text-40 font-light" color="textPrimary" gutterBottom>
			문제 정보 입력하기
			</Typography>
			<Divider/>
			<div>　</div>
				<div>
				{
			          <Typography className="text-18 sm:text-30 font-light" color="textPrimary" gutterBottom>
						게임 제목　　
						
									<TextField
										id="outlined-multiline-flexible"
										label="게임 제목"
										multiline
										rowsMax={4}
										value={title}
										onChange={titleChange}
										variant="outlined"
									/>
					  </Typography>



				}
				<Divider/>
				{
					<Typography className="text-18 sm:text-30 font-light" color="textPrimary" gutterBottom>
					게임 이미지 　
					  
								<input type="file" name="file" onChange={(event) => handleFileInput2} />
								<button type="button" onClick={handlePost} />

					</Typography>
				}
				<Divider/>
				{
					<Typography className="text-18 sm:text-30 font-light" color="textPrimary" gutterBottom>
					게임 설명 　　
					  
								<input type="file" name="file" onChange={(event) => handleFileInput} />
								<button type="button" onClick={handlePost2} />

					</Typography>
				}
				<Divider/>
				{
					<Typography className="text-18 sm:text-30 font-light" color="textPrimary" gutterBottom>
					제한 시간　　
					  
									<TextField
										  id="outlined-multiline-flexible"
										  label="제한 시간(ms)"
										  multiline
										  rowsMax={4}
										  value={limitTime}
										  onChange={limitTimeChange}
										  variant="outlined"
									/>
					</Typography>
				}
								<Divider/>
				{
					<Typography className="text-18 sm:text-30 font-light" color="textPrimary" gutterBottom>
					제한 메모리　
					  
									<TextField
										  id="outlined-multiline-flexible"
										  label="제한 메모리"
										  multiline
										  rowsMax={4}
										  value={limitMemory}
										  onChange={limitMemoryChange}
										  variant="outlined"
									/>
					</Typography>
				}
				<Divider/>
				{
					<Typography className="text-18 sm:text-30 font-light" color="textPrimary" gutterBottom>
					보드 시작정보　
					  
									<TextField
										  id="outlined-multiline-flexible"
										  label="보드 시작정보"
										  multiline
										  rowsMax={10}
										  value={board}
										  onChange={boardChange}
										  variant="outlined"
									/>
					</Typography>
				}


				</div>
			<Divider/>	
			</Card>
			<Card>
			<Typography className="text-20 sm:text-40 font-light" color="textPrimary" gutterBottom>
			규칙 확인하기
			</Typography>
			<Divider/>
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
