import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';// import Tabs from '@material-ui/core/Tabs';
import { Slide } from "react-slideshow-image";

const useStyles = makeStyles((theme) => ({

	paper: {
		position: "absolute",
		width: 980,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const slideImages = [
	"assets/images/profile/1.jpg",
	"assets/images/profile/2-1.jpg",
	"assets/images/profile/3.jpg",
	"assets/images/profile/4.jpg",
	"assets/images/profile/5.jpg",
	"assets/images/profile/6.jpg",
	"assets/images/profile/7.jpg",
	"assets/images/profile/8.jpg",
	"assets/images/profile/9.jpg",
];

const properties = {
	duration: 5000,
	transitionDuration: 500,
	infinite: true,
	indicators: true,
	arrows: true,
	pauseOnHover: true,
	onChange: (oldIndex, newIndex) => {
		console.log(`slide transition from ${oldIndex} to ${newIndex}`);
	},
};

function getModalStyle() {
	const top = 38
	const left = 37
  
	return {
	  top: `${top}%`,
	  left: `${left}%`,
	  transform: `translate(-${top}%, -${left}%)`,
	};
  }

export default function Widget5(props) {

	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	return (

		<div>

			<div style={modalStyle}  className={classes.paper}>

				<div className="slide-container">
					<Slide {...properties}>
						<div className="each-slide">
							<div
								style={{ backgroundImage: `url(${slideImages[0]})` }}
							></div>
						</div>
						<div className="each-slide">
							<div
								style={{ backgroundImage: `url(${slideImages[1]})` }}
							></div>
						</div>
						<div className="each-slide">
							<div
								style={{ backgroundImage: `url(${slideImages[2]})` }}
							></div>
						</div>
						<div className="each-slide">
							<div
								style={{ backgroundImage: `url(${slideImages[3]})` }}
							></div>
						</div>
						<div className="each-slide">
							<div
								style={{ backgroundImage: `url(${slideImages[4]})` }}
							></div>
						</div>
						<div className="each-slide">
							<div
								style={{ backgroundImage: `url(${slideImages[5]})` }}
							></div>
						</div>
						<div className="each-slide">
							<div
								style={{ backgroundImage: `url(${slideImages[6]})` }}
							></div>
						</div>
						<div className="each-slide">
							<div
								style={{ backgroundImage: `url(${slideImages[7]})` }}
							></div>
						</div>
						<div className="each-slide">
							<div
								style={{ backgroundImage: `url(${slideImages[8]})` }}
							></div>
						</div>
					</Slide>
				</div>
			</div>


		</div>
	);
}


