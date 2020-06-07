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
	var objNum = null;
	var rule = null;
	// const [rule,setRule] = useState("");
	// const [objNum,setObjNum] = useState(null);
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
		setState(event.target.files[0]);
	}
	
	 const handleFileInput2 = (event) => {
		setState2(event.target.files[0]);
	}
	
	// const handlePost = (event) => {
	// 	formData.append('file', event.selectedFile);
	// }

	// const handlePost2 = (event) => {
	// 	formData2.append('file', event.selectedFile);
	// }

	function placeGenerator(objNum){

		var option1, option2, option3, option4;
	
		if(sessionStorage.getItem(`startType${objNum}`) === "이동"){
			option1 = 0;
			if(sessionStorage.getItem(`distance${objNum}`) === "+방향")
			{option2 = 0; option3 = sessionStorage.getItem(`customDistanceMin${objNum}`); option4= sessionStorage.getItem(`customDistanceMax${objNum}`)}
			else if(sessionStorage.getItem(`distance${objNum}`) === "X방향")
			{option2 = 1; option3 = sessionStorage.getItem(`customDistanceMin${objNum}`); option4= sessionStorage.getItem(`customDistanceMax${objNum}`)}
			else if(sessionStorage.getItem(`distance${objNum}`) === "8방향")
			{option2 = 2; option3 = sessionStorage.getItem(`customDistanceMin${objNum}`); option4= sessionStorage.getItem(`customDistanceMax${objNum}`)}
			else if(sessionStorage.getItem(`distance${objNum}`) === "커스텀")
			{option2 = 3; option3 = sessionStorage.getItem(`customDistanceX${objNum}`); option4= sessionStorage.getItem(`customDistanceY${objNum}`)}
			else{ }
	
			return `"${objNum}":[${option1}, [[${option2}, ${option3}, ${option4}]],[1]]`
		}
		
		else if(sessionStorage.getItem(`startType${objNum}`) === "둘 다"){
			option1 = 2;
			if(sessionStorage.getItem(`distance${objNum}`) === "+방향")
			{option2 = 0; option3 = sessionStorage.getItem(`customDistanceMin${objNum}`); option4= sessionStorage.getItem(`customDistanceMax${objNum}`)}
			else if(sessionStorage.getItem(`distance${objNum}`) === "X방향")
			{option2 = 1; option3 = sessionStorage.getItem(`customDistanceMin${objNum}`); option4= sessionStorage.getItem(`customDistanceMax${objNum}`)}
			else if(sessionStorage.getItem(`distance${objNum}`) === "8방향")
			{option2 = 2; option3 = sessionStorage.getItem(`customDistanceMin${objNum}`); option4= sessionStorage.getItem(`customDistanceMax${objNum}`)}
			else if(sessionStorage.getItem(`distance${objNum}`) === "커스텀")
			{option2 = 3; option3 = sessionStorage.getItem(`customDistanceX${objNum}`); option4= sessionStorage.getItem(`customDistanceY${objNum}`)}
			else{ }
	
			return `"${objNum}":[${option1}, [[${option2}, ${option3}, ${option4}]],[1]]`
		}
	
		else{
			option1 = 1;
			return `"${objNum}":[${option1}, [[0, 0, 0]], [1]]`
		}
	
	}
	
	function actionGenerator(objNum){
	
		var option1, option2;
	
		if(sessionStorage.getItem(`actionType${objNum}`) === "없음")
		{option1 = 0;}
		else if(sessionStorage.getItem(`actionType${objNum}`) === "내 돌")
		{option1 = 1;}
		else{}
		
		if(sessionStorage.getItem(`actionCondition${objNum}`) === "없음")
		{option2 = 0; return `"${objNum}":[${option1},0,0]`}
		// else if(sessionStorage.getItem(`actionCondition${objNum}`) === "인접할 때")
		// {option2 = 2;
		// 	if(sessionStorage.getItem(`actionDirection${objNum}` === "양 옆"))
		//	{}
		// }
		else{}
	}
	
	
	function endingGenerator(objNum){
	
		return `"${objNum} : [[1]]"`
	
	}
	
	{
		(() => {
			if (sessionStorage.getItem("startType1") !== null && sessionStorage.getItem("distance1") !== null
				&& (sessionStorage.getItem("actionType1") !== null)
			) {
				// setObjNum(1);
				objNum=1;
			}
			if (sessionStorage.getItem("startType2") !== null && sessionStorage.getItem("distance2") !== null
				&& (sessionStorage.getItem("actionType2") !== null)
			) {
				// setObjNum(2);
				objNum=2;
			}

			if (sessionStorage.getItem("startType3") !== null && sessionStorage.getItem("distance3") !== null
				&& (sessionStorage.getItem("actionType3") !== null)
			) {
				// setObjNum(3);
				objNum=3;
			}
			if (sessionStorage.getItem("startType4") !== null && sessionStorage.getItem("distance4") !== null
				&& (sessionStorage.getItem("actionType4") !== null)
			) {
				// setObjNum(4);
				objNum=4;
			}
			
		})()
	}
	
		{
		(() => {
			var placement1, action1, ending1, placement2, action2, ending2, placement3, action3, ending3, placement4, action4, ending4;

				if(objNum === 1 ){
					placement1 = placeGenerator(1); action1 = actionGenerator(1); ending1 = endingGenerator(1);
				}
				else if(objNum === 2 ){
					placement1 = placeGenerator(1); action1 = actionGenerator(1); ending1 = endingGenerator(1);
					placement2 = placeGenerator(2); action2 = actionGenerator(2); ending2 = endingGenerator(2);
				}
				else if(objNum === 3 ){
					placement1 = placeGenerator(1); action1 = actionGenerator(1); ending1 = endingGenerator(1);
					placement2 = placeGenerator(2); action2 = actionGenerator(2); ending2 = endingGenerator(2);
					placement3 = placeGenerator(3); action3 = actionGenerator(3); ending3 = endingGenerator(3);
				}
				else if(objNum === 4 ){
					placement1 = placeGenerator(1); action1 = actionGenerator(1); ending1 = endingGenerator(1);
					placement2 = placeGenerator(2); action2 = actionGenerator(2); ending2 = endingGenerator(2);
					placement3 = placeGenerator(3); action3 = actionGenerator(3); ending3 = endingGenerator(3);
					placement4 = placeGenerator(4); action4 = actionGenerator(4); ending4 = endingGenerator(4);

				}
				else{}
			

			if(objNum === 1){
				rule = `{"obj_num: ${objNum}", "placement" : {${placement1}}, "action" : {${action1}}, "ending" : {${ending1}}}`;
			}
			else if(objNum === 2){
				rule = `{"obj_num: ${objNum}", "placement" : {${placement1},${placement2}}, "action" : {${action1}, ${action2}}, "ending" : {${ending1}, ${ending2}}}`;
			}
			else if(objNum === 3){
				rule = `{"obj_num: ${objNum}", "placement" : {${placement1},${placement2},${placement3}}, "action" : {${action1}, ${action2}, ${action3}}, "ending" : {${ending1}, ${ending2}, ${ending3}}}`;
			}
			else if(objNum === 4){
				rule = `{"obj_num: ${objNum}", "placement" : {${placement1},${placement2},${placement3},${placement4}}, "action" : {${action1}, ${action2}, ${action3}, ${action4}}, "ending" : {${ending1}, ${ending2}, ${ending3}, ${ending4}}}`;
			}
			else{}


		})()
	}



	function problemPost(userId, problemTitle, limitTime, limitMemory, boardInfo, rule){
		var header = {
		  'Authorization' : 'jwt ' + window.localStorage.getItem('jwt_access_token'),
		  'Content-Type': 'multipart/form-data'
		}
		var frm = new FormData();
		var inFile = document.getElementsByName("file");
		frm.append("editor", userId);
		frm.append("title", problemTitle);
		frm.append("description", inFile[1].files[0]);
		frm.append("limit_time", limitTime);
		frm.append("limit_memory", limitMemory);
		frm.append("thumbnail", inFile[0].files[0]);
		frm.append("board_info", boardInfo);
		frm.append("rule",rule);
		
		for (var pair of frm.entries()){
			console.log(pair[0] + ',' + pair[1]);
		}

		//console.log(inFile[0].files[0])
		
	  
		axios.post("https://cors-anywhere.herokuapp.com/http://203.246.112.32:8000/api/v1/problem/", frm, {
		  headers: header
		  
		})
		.then( response => {
			alert("문제가 생성되었습니다.");
			//console.log(response);
			sessionStorage.clear();
		})
		.catch(error => {
			alert(error);
			  console.log(error);
		})
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
					<form>
					<Typography className="text-18 sm:text-30 font-light" color="textPrimary" gutterBottom>
					게임 이미지 　
					  			
								<input type="file" name="file" id="file" onChange={(event) => handleFileInput} />
								<button type="button"/>
					</Typography>
					</form>
				}
				<Divider/>
				{
					<form>
					<Typography className="text-18 sm:text-30 font-light" color="textPrimary" gutterBottom>
					게임 설명 　　
					  
								<input type="file" name="file" id="file" onChange={(event) => handleFileInput2} />
								<button type="button" />

					</Typography>
					</form>
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
				<div>

				</div>
				{/* {console.log(objNum)} */}
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
				to={'/apps/game/problem'}>
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
					color="primary"
					onClick={()=>{problemPost(parseInt(window.localStorage.getItem('pk')), title, limitTime, limitMemory, board, rule)}}
					>
					POST
     			</Button>
			</Link>
			</div>
		</div>


	);
}

export default Courses;
