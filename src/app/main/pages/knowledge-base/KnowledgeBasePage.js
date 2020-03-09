import FuseAnimate from '@fuse/core/FuseAnimate';
// import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Icon from '@material-ui/core/Icon';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';

import {UnControlled as CodeMirror} from 'react-codemirror2'
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python.js');
require('codemirror/mode/javascript/javascript.js');

// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));



function KnowledgeBasePage() {
	const classes = useStyles();
	const [code, setCode] = useState(
		"var component = {\nname: \"react-codemirror\",\nauthor: \"Jed Watson\",\nrepo: \"https://github.com/JedWatson/react-codemirror\"}");
	
	
	const [option, setOption] = useState({
		mode: "javascript",
		theme: 'material',
		lineNumbers: true
	});

	// useEffect(() => {
	// 	axios.get('/api/knowledge-base').then(res => {
	// 		setData(res.data);
	// 	});
	// }, []);
	function changeMode(event) {
		console.log(`beforeMode>>>>>>${option.mode}`);
		console.log(`event.target.value>>>>>>${event.target.value}`);
		setOption({
			mode: event.target.value
		});
	};
	
	function changeCode(event) {
		console.log(`event.target.value>>>>>>${event}`);
		setCode(event);
	};

	return (
		<div className="w-full">
			<div
				className={clsx(
					classes.header,
					'flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-36 sm:text-56 font-light">
						Code Editor
					</Typography>
				</FuseAnimate>

				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="opacity-75 mt-16 mx-auto max-w-512">
						codemirror editor
					</Typography>
				</FuseAnimate>
			</div>

			<div>
			{/* <CodeMirror
				value={code}
				options={option}
				onBeforeChange={(editor, data, value) => {
					setCode({value});
				}}
				onChange={(editor, data, value) => {
					console.log(`option>>>>>>>>>>>>>>>${option.mode}`);
				}}
				/> */}
				<CodeMirror
					value= {code}
					options={{
						mode: option.mode,
						theme: 'material',
						lineNumbers: true
					}}
					onChange={(editor, data, value) => {
						changeCode(value);
					}}
				/>
				<div style={{ marginTop: 10 }}>
					<select onChange={changeMode}>
						<option value="javascript">JavaScript</option>
						<option value="python">Python</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default KnowledgeBasePage;
